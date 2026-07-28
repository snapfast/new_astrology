'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred_lang') as Language;
      if (saved && (saved === 'en' || saved === 'hi')) {
        setLangState(saved);
        document.documentElement.lang = saved;
        if (saved === 'hi') {
          document.body.classList.add('font-hindi');
          document.body.classList.remove('font-body');
        } else {
          document.body.classList.add('font-body');
          document.body.classList.remove('font-hindi');
        }
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('preferred_lang', newLang);
    document.documentElement.lang = newLang;
    if (newLang === 'hi') {
      document.body.classList.add('font-hindi');
      document.body.classList.remove('font-body');
    } else {
      document.body.classList.add('font-body');
      document.body.classList.remove('font-hindi');
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
  };

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
