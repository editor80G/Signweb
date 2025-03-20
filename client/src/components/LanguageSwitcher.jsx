
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="language-switcher">
            <button
                onClick={() => setLanguage('en')}
                style={{ fontWeight: language === 'en' ? 'bold' : 'normal' }}
            >
                English
            </button>
            <button
                onClick={() => setLanguage('ru')}
                style={{ fontWeight: language === 'ru' ? 'bold' : 'normal' }}
            >
                Русский
            </button>
        </div>
    );
};

export default LanguageSwitcher;