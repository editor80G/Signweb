import React, { useState } from "react";
import { LanguageContext } from "./LanguageContext";


export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        try {
            const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") : null;
            return storedLanguage ? JSON.parse(storedLanguage) : "en"; // Default to 'en'
        } catch (error) {
            console.error("Error reading language from localStorage:", error);
            return "en"; // Default to 'en' if there's an error
        }
    });

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        try {
            if (typeof window !== "undefined") {
                localStorage.setItem("language", JSON.stringify(newLanguage));
            }
        } catch (error) {
            console.error("Error saving language to localStorage:", error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

