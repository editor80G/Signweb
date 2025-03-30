import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export const useLogout = () => {
    const { handleAuthChange } = useContext(AuthContext);

    const logout = async () => {
        try {
            const response = await api.post('/auth/logout', {});
            if (response.data.success === true) {
                handleAuthChange(false);
                return response.data.success;
            } else {
                throw new Error('Logout failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to connect to the server';
            throw new Error(errorMessage);
        }
    };

    return { logout };
};