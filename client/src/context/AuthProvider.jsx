import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import api from '../utils/api';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // By default, the user is not authenticated

    // If the previous state is different from the new state, return the new state, 
    // otherwise return the previous state
    const handleAuthChange = (authStatus) => {
        setIsAuthenticated((prev) => (prev !== authStatus ? authStatus : prev));
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleAuthChange, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
}; 