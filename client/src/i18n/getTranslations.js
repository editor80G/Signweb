import { translations } from '../i18n/translations';

export const getTranslation = (key, language = 'en') => {
    const keys = Array.isArray(key) ? key : key.split('.'); // Support both arrays and dot-separated strings
    let translation = translations[language]; // Retrieve the translation object

    for (const k of keys) {
        if (translation[k] === undefined) {
            return key; // Return the key itself if translation is missing
        }
        translation = translation[k];
    }

    return translation;
};

// export const getTranslation = (key, language = 'en') => {
//     return translations[language][key] || key;
// };



// export function GET_TRANSLATION(key, language) {
//     const keys = key.split('.'); // Split the key by dots
//     let translation = translations[language]; // Retrieve the translation object

//     for (const k of keys) {
//         if (translation[k] === undefined) {
//             return key; // Return the key itself if translation is missing
//         }
//         translation = translation[k];
//     }

//     return translation;
// }