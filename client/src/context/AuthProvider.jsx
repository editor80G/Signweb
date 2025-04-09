// import React, { useState, useEffect, useCallback } from 'react';
// import { AuthContext } from './AuthContext';
// import api from '../utils/api';

// export const AuthProvider = ({ children }) => {
//     //const [isAuthenticated, setIsAuthenticated] = useState(false); // By default, the user is not authenticated
//     //const [userRole, setUserRole] = useState(null); // By default, the user role is null
//     const [authState, setAuthState] = useState({ isAuthenticated: false, userRole: null });
//     // If the previous state is different from the new state, return the new state, 
//     // otherwise return the previous state
//     // const handleAuthChange = (authStatus) => {
//     //     setIsAuthenticated((prev) => (prev !== authStatus ? authStatus : prev));
//     // };
//     const handleAuthChange = (isAuthenticated, userRole) => {
//         setAuthState((prev) => {
//             if (prev.isAuthenticated !== isAuthenticated || prev.userRole !== userRole) {
//                 return { isAuthenticated, userRole };
//             }
//             return prev;
//         };



//         const checkAuthStatus = useCallback(async () => {
//             try {
//                 const response = await api.get('/auth/status');
//                 handleAuthChange(response.data.isAuthenticated, response.data.userRole);
//             } catch (error) {
//                 console.error('Error checking authentication status:', error);
//                 handleAuthChange(false);
//             }
//         }, [handleAuthChange]);

//         // Check the authentication status when the provider mounts
//         useEffect(() => {
//             checkAuthStatus();
//         }, [checkAuthStatus]);

//         return (
//             <AuthContext.Provider value={{ authState, handleAuthChange, checkAuthStatus }}>
//                 {children}
//             </AuthContext.Provider>
//         );
//     }; 

import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import api from '../utils/api';

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false, userRole: null });

    const handleAuthChange = useCallback((isAuthenticated, userRole) => {
        setAuthState((prev) => {
            if (prev.isAuthenticated !== isAuthenticated || prev.userRole !== userRole) {
                return { isAuthenticated, userRole };
            }
            return prev;
        });
    }, []);

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await api.get('/auth/status');
            handleAuthChange(response.data.isAuthenticated, response.data.userRole);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            handleAuthChange(false, null);
        }
    }, [handleAuthChange]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return (
        <AuthContext.Provider value={{ authState, handleAuthChange, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};