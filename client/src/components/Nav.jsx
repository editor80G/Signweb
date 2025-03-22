import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';

const Nav = () => {
    const { isAuthenticated, handleAuthChange, handleLogout } = useContext(AuthContext);
    const { language } = useLanguage();
    console.log('Nav isAuthenticated:', isAuthenticated);

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
            if (response.data.isAuthenticated !== isAuthenticated) {
                handleAuthChange(response.data.isAuthenticated);
            } // Update the authentication status only if it has changed
        } catch (error) {
            console.error('Ошибка проверки статуса аутентификации:', error);
            handleAuthChange(false);
        }
    }, [handleAuthChange, isAuthenticated]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

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
                {!isAuthenticated ? (
                    <li>
                        <Link to="/">{getTranslation('NAV_REGISTER_LOGIN', language)}</Link>
                    </li>
                ) : (
                    <li>
                        <button onClick={handleLogout}>
                            {getTranslation('NAV_LOGOUT', language)}
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
