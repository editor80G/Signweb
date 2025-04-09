import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

export const useRegister = () => {
    const { handleAuthChange } = useContext(AuthContext);

    const register = async (values) => {
        const { email, password, confirmPassword, businessType, jobTitle, country, captchaToken } = values;
        const captchaVerificationToken = captchaToken || null;
        if (!captchaVerificationToken) {
            throw new Error('useRegister: Captcha verification failed');
        }

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
                captchaVerificationToken,
            });

            if (response.data.token) {
                // After successful registration, call /auth/status to get user role
                const statusResponse = await api.get('/auth/status');
                const { isAuthenticated, userRole } = statusResponse.data;

                // Update authState with the latest information
                handleAuthChange(isAuthenticated, userRole);

                console.log('useRegister: Registration successful');

                // handleAuthChange(true);
                // console.log('useRegister: response.data.error:', response.data.token);
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

    return { register };
};