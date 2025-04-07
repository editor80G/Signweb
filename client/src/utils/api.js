import axios from 'axios';
import config from '../../config.js'; // Import the config file

// const baseUrl =
//     typeof import.meta !== "undefined" && import.meta.env
//         ? config.baseUrl
//         : global.importMetaEnv.VITE_BASE_URL;

// Create an Axios instance
const api = axios.create({
    baseURL: config.baseUrl, // Your API base URL
    timeout: 5000, // Request timeout
    withCredentials: true, // Ensure cookies are sent with requests
});

// Add a response interceptor
api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login page if 401 Unauthorized
            window.location.href = '/'; // Login page
        }
        return Promise.reject(error); // Reject other errors
    }
);

export default api;