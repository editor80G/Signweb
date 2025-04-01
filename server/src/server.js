import process from 'process';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import { auth } from './middlewares/authMiddleware.js';
import routes from './routes.js';
import { cleanupBlacklist } from './utils/authUtils.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { config } from "./config.js";

const AUTH_COOKIE_NAME = config.AUTH_COOKIE_NAME;
const DB_URI = config.DB_URI;
const PORT = config.PORT;
const SESSION_SECRET = config.SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));

// Middleware для аутентификации (использует req.cookies)
app.use(auth);

// Настройка маршрутов API
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

// Start the server should be the last line of the file
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Node.js version: ${process.version}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}

