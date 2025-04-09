import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export const useAuthStatus = () => {
    const { authState, handleAuthChange } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // Track if the component is mounted
        const checkAuthStatus = async () => {
            try {
                const response = await api.get('/auth/status');
                if (isMounted) {
                    handleAuthChange(response.data.isAuthenticated, response.data.userRole);

                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                if (isMounted) {
                    handleAuthChange(false, null);
                    setError(error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false); // Set loading to false after the request completes
                }
            }
        };

        checkAuthStatus();
        return () => {
            isMounted = false; // Flag the component as unmounted
        };
    }, [handleAuthChange]);

    return {
        loading,
        error,
        isAuthenticated: authState.isAuthenticated,
        userRole: authState.userRole,
    };
};