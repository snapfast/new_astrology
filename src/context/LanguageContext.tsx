'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const lang: Language = 'en';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('preferred_lang');
      document.documentElement.lang = 'en';
      document.body.classList.add('font-body');
      document.body.classList.remove('font-hindi');
    }
  }, []);

  const setLang = (newLang: Language) => {
    if (newLang) {
      // No-op, single-language mode
    }
  };
  const toggleLang = () => {};

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
