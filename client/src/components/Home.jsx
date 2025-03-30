import React from 'react';
import magazinesImage from '../assets/images/sign-magazines.jpg';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { language } = useLanguage();

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
                {/* <div className="home-profile">
                    {!isAuthenticated ? (
                        <AuthPage />
                    ) : (
                        <CreatePublication />
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Home;