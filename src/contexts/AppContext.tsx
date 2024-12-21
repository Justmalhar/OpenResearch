import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface AppContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    language: Language;
    toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true';
        }
        return false;
    });

    const [language, setLanguage] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('language') as Language) || 'ar';
        }
        return 'ar';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkMode', String(isDarkMode));
    }, [isDarkMode]);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', language);
    }, [language]);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);
    const toggleLanguage = () => setLanguage(prev => prev === 'ar' ? 'en' : 'ar');

    return (
        <AppContext.Provider value={{ isDarkMode, toggleDarkMode, language, toggleLanguage }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};