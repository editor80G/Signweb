import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // By default, the user is not authenticated

    const handleAuthChange = (authStatus) => {
        setIsAuthenticated((prev) => {
            if (prev !== authStatus) {
                return authStatus;
            }
            return prev;
        }); // If the previous state is different from the new state, return the new state, otherwise return the previous state
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/auth/logout', { withCredentials: true });
            handleAuthChange(false); // Update authentication state
        } catch (error) {
            console.error('Error during logout:', error.response?.data?.error || 'Unknown error');
        }
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, handleAuthChange, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}; 