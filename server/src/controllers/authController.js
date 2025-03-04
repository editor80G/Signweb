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
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.render('auth/login', { title: 'Login Page', error: getErrorMessage(error) }); // Pass the error message only for security, otherwise the email is exposed and users can see if the email is registered and it hbs consider user as logged in

    }
});
// LOGOUT page (authenticated users)
authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

export default authController;