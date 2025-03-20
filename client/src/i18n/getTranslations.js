import { translations } from '../i18n/translations';

export const getTranslation = (key, language = 'ru') => {
    return translations[language][key] || key;
};