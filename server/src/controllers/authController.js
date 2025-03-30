// This file defines the `authController`, which handles authentication-related routes for the application.
// It includes the following endpoints:
// 1. **GET /status**: Checks the authentication status of the user and returns whether they are authenticated.
// 2. **POST /register**: Handles user registration, creates a new user, generates a token, and sets it in a cookie.
// 3. **POST /login**: Handles user login, generates a token for the user, and sets it in a cookie.
// 4. **POST /logout**: Handles user logout, adds the token to a blacklist, clears the authentication cookie, and ends the session.
// Middleware such as `auth`, `isAuth`, and `isGuest` is used to enforce authentication and authorization rules.

import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../config.js';
import { auth, isAuth, isGuest } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import captureIpMiddleware from '../middlewares/captureIpMiddleware.js';
import { addToBlacklist } from '../utils/authUtils.js';
import jsonwebtoken from 'jsonwebtoken';

const authController = Router();

// Endpoint to check authentication status
authController.get('/status', auth, (req, res) => {
    if (req.user) {
        return res.json({ isAuthenticated: true });
    } else {
        return res.json({ isAuthenticated: false });
    }
});

// POST method (not authenticated users) - Register
authController.post('/register', isGuest, captureIpMiddleware, async (req, res) => {
    const userData = req.body;
    //console.log(userData);
    try {
        const token = await authService.register(userData);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, secure: false, maxAge: 3600000 });
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

// POST method (not authenticated users) - Login    
authController.post('/login', isGuest, async (req, res) => {
    const userData = req.body;
    try {
        const token = await authService.login(userData);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Set the cookie with the token
        res.status(200).json({ success: true, token }); // Return JSON response
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) }); // Return error as JSON
    }
});

// POST method (authenticated users) - Logout
authController.post('/logout', isAuth, (req, res) => {
    try {
        const token = req.cookies[AUTH_COOKIE_NAME];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decoded = jsonwebtoken.decode(token);
        const expiresAt = decoded.exp * 1000; // convert Unix timestamp (seconds) to milliseconds for JS Date
        addToBlacklist(token, expiresAt);

        res.clearCookie(AUTH_COOKIE_NAME);
        res.status(200).json({ success: true });
    } catch {
        res.status(500).json({ error: 'An error occurred during logout' });
    }
});

export default authController;