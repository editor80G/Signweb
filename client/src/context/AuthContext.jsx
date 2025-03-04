import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

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