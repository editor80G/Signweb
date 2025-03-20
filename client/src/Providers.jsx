import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageContext } from './context/LanguageContext';

const Providers = ({ children }) => {
    const [language, setLanguage] = useState('ru');
    return (
        <AuthProvider>
            <LanguageContext.Provider value={{ language, setLanguage }}>
                {children}
            </LanguageContext.Provider>
        </AuthProvider>
    );
};

export default Providers;