import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import magazinesImage from '../assets/images/sign-magazines.jpg';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Registration from './Registration';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';
import '../App.css';

const Home = () => {

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
                        {/* <div className="home-links">
                            <Link to="/issues" className="home-link">Архив журнала «Наружка»</Link>
                            <Link to="/catalogs" className="home-link">Архив каталога «Реклама и дизайн в Украине»</Link>
                        </div> */}
                    </div>
                </div>
                <div className="home-outlet">
                    {!isAuthenticated ? <Registration /> : <Outlet />}
                </div>
            </div>

        </div>
    );
};

export default Home;