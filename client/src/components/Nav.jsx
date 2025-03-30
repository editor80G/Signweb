//import React, { useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';
import AuthGuard from '../components/Guards/AuthGuard';
import GuestGuard from '../components/Guards/GuestGuard';
import Logout from './Logout/Logout';
import Register from './Register/Register';

const Nav = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { language } = useLanguage();
    // console.log('Nav isAuthenticated:', isAuthenticated);

    // const checkAuthStatus = useCallback(async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
    //         if (response.data.isAuthenticated !== isAuthenticated) {
    //             handleAuthChange(response.data.isAuthenticated);
    //         } // Update the authentication status only if it has changed
    //     } catch (error) {
    //         console.error('Ошибка проверки статуса аутентификации:', error);
    //         handleAuthChange(false);
    //     }
    // }, [handleAuthChange, isAuthenticated]);

    // useEffect(() => {
    //     checkAuthStatus();
    // }, [checkAuthStatus]);

    return (
        <nav>
            <ul>
                <li><Link to="/">{getTranslation('NAV_HOME', language)}</Link></li>
                <li className="dropdown">
                    <span>{getTranslation('NAV_OUR_PUBLICATIONS', language)}</span>
                    <ul className="dropdown-content">
                        <li><Link to="/publications/magazines">{getTranslation('NAV_OUR_PUBLICATIONS_OUTDOOR', language)}</Link></li>
                        <li><Link to="/publications/catalogs">{getTranslation('NAV_OUR_PUBLICATIONS_CATALOG', language)}</Link></li>
                    </ul>
                </li>
                {/* Показываем ссылки в зависимости от состояния аутентификации */}
                {isAuthenticated ? (
                    <>
                        <li><Link to="/logout">{getTranslation('NAV_LOGOUT', language)}</Link></li>
                        <li><Link to="/publications/create">{getTranslation('NAV_CREATE_PUBLICATION', language)}</Link></li>
                    </>
                ) : (
                    <li><Link to="/auth/register">{getTranslation('NAV_REGISTER_LOGIN', language)}</Link></li>
                )}
                {/* {!isAuthenticated && <li><Link to="/register">Регистрация</Link></li>} */}
                {/* Add other navigation links here */}
                {/* <AuthGuard>
                    <li>
                        <Link to="/logout">{getTranslation('NAV_LOGOUT', language)}</Link>
                    </li>
                    <li>
                        <Link to="/publications/create">{getTranslation('NAV_CREATE_PUBLICATION', language)}</Link>
                    </li>
                </AuthGuard>
                <GuestGuard>
                    <li>
                        <Link to="auth/register">{getTranslation('NAV_REGISTER_LOGIN', language)}</Link>
                    </li>
                </GuestGuard> */}
            </ul>
        </nav >
    );
};

export default Nav;
