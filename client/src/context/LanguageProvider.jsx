import React, { useState } from 'react';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru'); // Set the default language to Russian

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};