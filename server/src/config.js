

import dotenv from 'dotenv';
import process from 'process';

// Попробуем загрузить файл .env из нескольких мест
//const envPaths = ['./.env', 'server/.env', './.env.production', 'server/.env.production', './.env.development', 'server/.env.development',];
const envPaths = ['./.env', 'server/.env'];

let envLoaded = false;

for (const path of envPaths) {
    const result = dotenv.config({ path });
    if (!result.error) {
        console.log(`Environment variables loaded from: ${path}`);
        envLoaded = true;
        break;
    }
}

if (!envLoaded) {
    console.warn('No .env file found in the specified paths. Using default environment variables or system variables.');
}

// Check if required environment variables are set
const requiredEnvVars = ['JWT_SECRET', 'AUTH_COOKIE_NAME', 'DB_URI', 'SESSION_SECRET', 'RECAPTCHA_SECRET_KEY'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}. Please check your .env file.`);
    }
});

// Parse the allowed origins for CORS from environment variables
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',')
    : [];

// Export environment variables
export const config = {
    JWT_SECRET: process.env.JWT_SECRET, // JWT secret key
    AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME, // Name of the cookie that stores the JWT token
    PORT: process.env.PORT || 8080, // Port for the server to listen on
    DB_URI: process.env.DB_URI, // MongoDB connection URI
    SESSION_SECRET: process.env.SESSION_SECRET, // Secret for session management
    ALLOWED_ORIGINS: allowedOrigins, // allowed origins for CORS
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY, // Secret key for Google reCAPTCHA
};