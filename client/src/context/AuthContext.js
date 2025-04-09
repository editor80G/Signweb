// import React, { createContext } from 'react';

// export const AuthContext = createContext();



import React, { createContext } from 'react';

const initialAuthState = {
    isAuthenticated: false,
    userRole: null, // Ensure userRole is initialized
    user: null,
};

export const AuthContext = createContext(initialAuthState);

