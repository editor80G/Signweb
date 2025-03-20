import { createContext, useContext } from 'react';

export const LanguageContext = createContext();
// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

