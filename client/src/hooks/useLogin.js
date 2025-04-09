import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export const useLogin = () => {
    const { handleAuthChange } = useContext(AuthContext);

    const login = async (values) => {
        const { email, password, captchaToken } = values;
        const captchaVerificationToken = captchaToken || null;
        if (!captchaVerificationToken) {
            throw new Error('useLogin: Captcha verification failed');
        }

        try {
            const response = await api.post('/auth/login', { email, password, captchaVerificationToken });
            if (response.data.token) {
                // After successful registration, call /auth/status to get user role
                const statusResponse = await api.get('/auth/status');
                const { isAuthenticated, userRole } = statusResponse.data;

                // Update authState with the latest information
                handleAuthChange(isAuthenticated, userRole);

                // handleAuthChange(true);
                return response.data.success;
            } else {
                throw new Error('Authentication failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error
            if (!errorMessage) {
                console.error('Unexpected error structure:', err.response);
                throw new Error('Unexpected error from server'); // Если структура ответа неожиданная
            }
            throw new Error(errorMessage);
        }
    };

    return { login };
};