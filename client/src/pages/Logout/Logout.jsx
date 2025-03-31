import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

const Logout = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                const success = await logout();
                if (success) {
                    console.log('Logout success:', success);
                    navigate('/auth/login');
                } else {
                    console.error('Logout failed');
                }
            } catch (err) {
                console.error('Error during logout:', err.message);
            }
        };

        performLogout();
    }, [logout, navigate]);
    return null; // No UI needed
};

export default Logout;
