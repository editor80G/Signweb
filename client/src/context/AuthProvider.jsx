import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthChange = (authStatus) => {
        setIsAuthenticated(authStatus);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleAuthChange }}>
            {children}
        </AuthContext.Provider>
    );
}; 