import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import process from 'process';
import { AUTH_COOKIE_NAME } from "./config.js";

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import { auth } from './middlewares/authMiddleware.js';
import routes from './routes.js';
import { tempData } from './middlewares/tempDataMiddleware.js';
import { cleanupBlacklist } from './utils/authUtils.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import publicationsController from './controllers/pubController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

// Cleanup the blacklist every 30 minutes
setInterval(() => {
    cleanupBlacklist();
    console.log('Blacklist cleaned up');
}, 30 * 60 * 1000);

// Db setup
(async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
})();

// Express setup
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your client's origin
    credentials: true // Allow credentials (cookies) to be sent
})); // ensure that the CORS middleware is applied before any other middleware that handles requests

app.use(express.json()); // Middleware to parse JSON bodies
// app.use(express.static('src/public'));

app.use(express.urlencoded({ extended: false }));

// Middleware для парсинга cookies (должен быть до auth)
app.use(cookieParser());

// Middleware для сессий (если используется)
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));

// Middleware для аутентификации (использует req.cookies)
app.use(auth);

// Настройка маршрутов API
app.use('/publications', publicationsController);

// Другие middleware и маршруты
app.use(tempData);
app.use(routes);

// Serve files from the public directory with restricted access
app.use('/files/magazines', (req, res, next) => {
    if (!req.cookies[AUTH_COOKIE_NAME]) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in.' });
    }
    next();
}, (req, res, next) => {
    res.set('X-Robots-Tag', 'noindex, nofollow');
    next();
}, express.static(path.join(__dirname, 'public/files/magazines')));

app.use('/files/catalogs', (req, res, next) => {
    if (!req.cookies[AUTH_COOKIE_NAME]) {
        return res.status(401).json({ error: 'Unauthorized access. Please log in.' });
    }
    next();
}, (req, res, next) => {
    res.set('X-Robots-Tag', 'noindex, nofollow');
    next();
}, express.static(path.join(__dirname, 'public/files/catalogs')));

app.use('/images/covers', express.static(path.join(__dirname, 'public/images/covers')));

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

console.log('PORT:', process.env.PORT);
// Start the server should be the last line of the file
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}



// Serve Vite build files (apply after CORS middleware)
// app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

// Handle all other routes (React)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
// });