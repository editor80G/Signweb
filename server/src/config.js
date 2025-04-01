

import dotenv from 'dotenv';
import process from 'process';

// Попробуем загрузить файл .env из нескольких мест
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

// Проверяем наличие обязательных переменных окружения
const requiredEnvVars = ['JWT_SECRET', 'AUTH_COOKIE_NAME', 'DB_URI', 'SESSION_SECRET'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}. Please check your .env file.`);
    }
});

// Экспортируем переменные окружения
export const config = {
    JWT_SECRET: process.env.JWT_SECRET, // JWT secret key
    AUTH_COOKIE_NAME: process.env.AUTH_COOKIE_NAME, // Name of the cookie that stores the JWT token
    PORT: process.env.PORT || 3000, // Port for the server to listen on
    DB_URI: process.env.DB_URI, // MongoDB connection URI
    SESSION_SECRET: process.env.SESSION_SECRET, // Secret for session management
};