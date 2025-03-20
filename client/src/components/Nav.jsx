import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
    const { isAuthenticated, handleAuthChange } = useContext(AuthContext);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
            handleAuthChange(response.data.isAuthenticated);
        } catch (error) {
            console.error('Ошибка проверки статуса аутентификации:', error);
            handleAuthChange(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li className="dropdown">
                    <span>Наши издания</span>
                    <ul className="dropdown-content">
                        <li><Link to="/magazines">Журнал "Наружка"</Link></li>
                        <li><Link to="/catalogs">Каталог "Реклама и дизайн в Украине"</Link></li>
                    </ul>
                </li>
                {/* {!isAuthenticated && <li><Link to="/register">Регистрация</Link></li>} */}
                {/* Add other navigation links here */}
            </ul>
        </nav>
    );
};

export default Nav;
