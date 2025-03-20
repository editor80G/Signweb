import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';

const Nav = () => {
    const { isAuthenticated, handleAuthChange } = useContext(AuthContext);
    const { language } = useLanguage();

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
                <li><Link to="/">{getTranslation('NAV_HOME', language)}</Link></li>
                <li className="dropdown">
                    <span>{getTranslation('NAV_OUR_PUBLICATIONS', language)}</span>
                    <ul className="dropdown-content">
                        <li><Link to="/magazines">{getTranslation('NAV_OUR_PUBLICATIONS_OUTDOOR', language)}</Link></li>
                        <li><Link to="/catalogs">{getTranslation('NAV_OUR_PUBLICATIONS_CATALOG', language)}</Link></li>
                    </ul>
                </li>
                {/* {!isAuthenticated && <li><Link to="/register">Регистрация</Link></li>} */}
                {/* Add other navigation links here */}
            </ul>
        </nav>
    );
};

export default Nav;
