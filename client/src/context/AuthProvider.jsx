import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import api from '../utils/api';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // By default, the user is not authenticated

    // If the previous state is different from the new state, return the new state, 
    // otherwise return the previous state
    const handleAuthChange = (authStatus) => {
        setIsAuthenticated((prev) => {
            if (prev !== authStatus) {
                return authStatus;
            }
            return prev;
        });
    };

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await api.get('/auth/status');
            handleAuthChange(response.data.isAuthenticated);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            handleAuthChange(false);
        }
    }, []);

    // Check the authentication status when the provider mounts
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // LOGOUT 
    const handleLogout = async () => {
        try {
            const response = await api.post('/auth/logout', {});
            if (response.data.success === true) {
                handleAuthChange(false);
                return response.data.success;
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error.success?.data?.error || 'Unknown error');
        }
    };

    // REGISTER
    const handleRegister = async (values) => {
        const { email, password, confirmPassword, businessType, jobTitle, country } = values;

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        try {
            const response = await api.post('/auth/register', {
                email,
                password,
                confirmPassword,
                businessType,
                jobTitle,
                country,
            });

            if (response.data.token) {
                handleAuthChange(true);
                return response.data.success; // Return success message
            } else {
                throw new Error('Authentication failed'); // If no token, throw an error
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to connect to the server';
            throw new Error(errorMessage); // Pass the server's error message

        }
    };

    // LOGIN
    const handleLogin = async (values) => {
        const { email, password } = values;

        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                handleAuthChange(true);
                return response.data.success;
            } else {
                throw new Error('Authentication failed'); // Если токена нет, выбрасываем ошибку
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to connect to the server';
            throw new Error(errorMessage); // Pass the server's error message
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleAuthChange, handleLogout, checkAuthStatus, handleRegister, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
}; 