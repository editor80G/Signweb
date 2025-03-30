import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export const useAuthStatus = () => {
    const { handleAuthChange } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Initialize loading state

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await api.get('/auth/status');
                handleAuthChange(response.data.isAuthenticated);
            } catch (error) {
                console.error('Error checking authentication status:', error);
                handleAuthChange(false);
            } finally {
                setLoading(false); // Stop loading when the check is complete
            }
        };

        checkAuthStatus();
    }, [handleAuthChange]);

    return { loading }; // Return loading state
};