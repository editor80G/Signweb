import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export const useLogin = () => {
    const { handleAuthChange } = useContext(AuthContext);

    const login = async (values) => {
        const { email, password } = values;

        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                handleAuthChange(true);
                return response.data.success;
            } else {
                throw new Error('Authentication failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to connect to the server';
            throw new Error(errorMessage);
        }
    };

    return { login };
};