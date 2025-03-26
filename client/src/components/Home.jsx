import React, { useContext, useEffect, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import magazinesImage from '../assets/images/sign-magazines.jpg';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import AuthPage from './AuthPage';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';
import '../App.css';
import CreatePublication from './CreatePublication';


const Home = () => {

    const { isAuthenticated, handleAuthChange } = useContext(AuthContext);
    const { language } = useLanguage();

    const checkAuthStatus = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
            handleAuthChange(response.data.isAuthenticated);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            handleAuthChange(false);
        }
    }, [handleAuthChange]);
    // useCallback is used to prevent infinite loop of useEffect when handleAuthChange is passed as a dependency

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]); // checkAuthStatus is passed as a dependency

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-intro">
                    <div className="home-left">
                        <h2 className="home-title">
                            {getTranslation('HOME_TITLE', language)}
                        </h2>
                        <h3 className="home-subtitle">{getTranslation('HOME_SUBSCRIBE_CALL_TO_ACTION', language)}</h3>
                        <p>{getTranslation('HOME_INTRO', language)}</p>
                        <p>{getTranslation('HOME_SECTIONS_TITLE', language)}</p>
                        <ul>
                            {getTranslation('HOME_SECTIONS', language).map((section, index) => (
                                <li key={index}>{section}</li>
                            ))}
                        </ul>
                        <p>{getTranslation('HOME_MORE', language)}</p>
                        <p>{getTranslation('HOME_SUBSCRIPTION', language)}</p>
                    </div>
                    <div className="home-right">
                        <img className="home-image" src={magazinesImage} alt="Magazines" />
                    </div>
                </div>
                <div className="home-profile">
                    {!isAuthenticated ? (
                        <AuthPage />
                    ) : (
                        <CreatePublication />
                        // <div>
                        //     <h3>{getTranslation('HOME_PROFILE_TITLE', language)}</h3>
                        //     <p>{getTranslation('HOME_PROFILE_DESCRIPTION', language)}</p>
                        // </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;