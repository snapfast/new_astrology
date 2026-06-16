'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: { label: 'Back to Top' },
  hi: { label: 'ऊपर जाएँ' }
};

const BackToTop = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [isVisible, setIsVisible] = useState(false);
  const isThrottled = useRef(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    checkScroll();

    const handleScroll = () => {
      if (!isThrottled.current) {
        checkScroll();
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, 200); // Throttle scroll checks to every 200ms
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest active:scale-95 border border-outline/50 shadow-lg z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-[opacity,transform] duration-500 ease-in-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-10 scale-95 pointer-events-none'
      }`}
      aria-label={t.label}
      title={t.label}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
    >
      <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
    </button>
  );
};

export default BackToTop;
