import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../config.js';
import { auth, isAuth, isGuest } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import captureIpMiddleware from '../middlewares/captureIpMiddleware.js';

const authController = Router();

// Endpoint to check authentication status
authController.get('/status', auth, (req, res) => {
    if (req.user) {
        return res.json({ isAuthenticated: true });
    } else {
        return res.json({ isAuthenticated: false });
    }
});

// REGISTER page (all users)
// GET method
// authController.get('/register', isGuest, (req, res) => {
//     res.json({ title: 'Register Page' });
// });

// POST method
authController.post('/register', isGuest, captureIpMiddleware, async (req, res) => {
    const userData = req.body;
    console.log(userData);
    try {
        const token = await authService.register(userData);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, secure: false, maxAge: 3600000 });
        res.status(201).json({ message: 'Registration successful', token });
    } catch (error) {
        res.status(400).json({ title: 'Register Page', error: getErrorMessage(error), user: userData });
    }
});



// LOGIN page (not authenticated users)
// GET method
authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login', { title: 'Login Page' });
});

// POST method (not authenticated users)
authController.post('/login', isGuest, async (req, res) => {
    const userData = req.body;
    try {
        const token = await authService.login(userData);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Set the cookie with the token
        res.status(200).json({ message: 'Login successful', token }); // Return JSON response
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) }); // Return error as JSON
    }
});

authController.get('/logout', isAuth, (req, res) => {
    try {
        res.clearCookie(AUTH_COOKIE_NAME); // Clear the authentication cookie
        res.status(200).json({ message: 'Logout successful' }); // Return a JSON response
    } catch {
        res.status(500).json({ error: 'An error occurred during logout' }); // Return error as JSON
    }
});

export default authController;