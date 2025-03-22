import React, { useState } from 'react';
import { AuthProvider } from './context/AuthProvider';
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
// Simple logic of LanguageContext is implemented in Providers.jsx
// The logic of AuthContext is implemented in AuthProvider.jsx 
export default Providers;