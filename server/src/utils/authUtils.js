// This file provides utility functions for managing JWT tokens, 
// including generating tokens, adding tokens to a blacklist, 
// checking if a token is blacklisted, and cleaning up expired tokens 
// from the blacklist to ensure security and efficiency.

import { JWT_SECRET } from '../config.js';
import jsonwebtoken from '../lib/jsonwebtoken.js'; //own library to promisify jwt

export const generateToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };
    const token = await jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '30m' });
    return token;
}

const blacklistedTokens = {};

export const addToBlacklist = (token, expiresAt) => {
    blacklistedTokens[token] = expiresAt;
};

export const isTokenBlacklisted = (token) => {
    return Object.prototype.hasOwnProperty.call(blacklistedTokens, token);
}; //returns true if the token is blacklisted

export const cleanupBlacklist = () => {
    const now = Date.now();
    for (const [token, expiresAt] of Object.entries(blacklistedTokens)) {
        if (expiresAt < now) {
            delete blacklistedTokens[token];
        }
    }
};

