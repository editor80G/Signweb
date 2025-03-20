import { translations } from '../i18n/translations';


export const getTranslation = (key, language = 'en') => {
    return translations[language][key] || key;
};