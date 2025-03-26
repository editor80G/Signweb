import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

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
            const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
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

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
            handleAuthChange(false); // Update authentication state
        } catch (error) {
            console.error('Error during logout:', error.response?.data?.error || 'Unknown error');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleAuthChange, handleLogout, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
}; 