//import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import jsonwebtoken from '../lib/jsonwebtoken.js'; //own library to promisify jwt



export const generateToken = async (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };
    //return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
    const token = await jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: '24h' });
    return token;
} // Generate a JWT token

