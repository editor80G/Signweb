import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export const useRegister = () => {
    const { handleAuthChange } = useContext(AuthContext);

    const register = async (values) => {
        const { email, password, confirmPassword, businessType, jobTitle, country } = values;

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        try {
            const response = await api.post('/auth/register', {
                email,
                password,
                confirmPassword,
                businessType,
                jobTitle,
                country,
            });

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

    return { register };
};