import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import process from 'process';

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import { auth } from './middlewares/authMiddleware.js';
import routes from './routes.js';
import { tempData } from './middlewares/tempDataMiddleware.js';
//import handlebars from 'express-handlebars';
// React related imports
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

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
app.use(express.json());
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));
app.use(auth);
app.use(tempData);
app.use(routes);

// Serve Vite build files (apply after CORS middleware)
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
});

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