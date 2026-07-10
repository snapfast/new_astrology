'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';

const TRANSLATIONS = {
  en: {
    title: 'Find Your Perfect Match',
    subtitle: 'Free Vedic Matchmaking',
    description: 'Discover your soulmate with Moonine, a free service for humanity based on ancient Vedic astrology principles.',
    button: 'Explore Moonine',
    close: 'Close',
  },
  hi: {
    title: 'अपना सही जीवनसाथी खोजें',
    subtitle: 'मुफ़्त वैदिक मैचमेकिंग',
    description: 'प्राचीन वैदिक ज्योतिष सिद्धांतों पर आधारित मानवता के लिए एक मुफ़्त सेवा, मुनिन के साथ अपने जीवनसाथी की खोज करें।',
    button: 'मूनिन देखें',
    close: 'बंद करें',
  }
};

export default function AdPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const containerRef = useFocusTrap(isVisible);

  useEffect(() => {
    // Check if we already showed it within the last 24 hours
    if (typeof window !== 'undefined') {
      const lastShown = localStorage.getItem('moonine_popup_last_shown');
      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (lastShown) {
        const parsed = parseInt(lastShown, 10);
        if (!isNaN(parsed) && now - parsed < ONE_DAY) {
          return;
        }
      }
    }

    // Show after a short delay to allow page load
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('moonine_popup_last_shown', Date.now().toString());
      }
    }, 2000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (timeLeft <= 0) {
      handleClose();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, timeLeft]);

  useEffect(() => {
    if (!isVisible) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
      ref={containerRef}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm pointer-events-auto transition-opacity"
        onClick={handleClose}
      />

      {/* Popup Content */}
      <div className="relative w-full max-w-md bg-surface border border-outline/10 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto animate-in fade-in zoom-in-95 duration-300">

        {/* Close Button & Timer */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-bright/80 backdrop-blur border border-outline/10 text-on-surface/70 text-xs font-medium">
            {timeLeft}s
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-bright/80 backdrop-blur border border-outline/10 hover:bg-surface-bright transition-colors text-on-surface focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label={t.close}
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 text-center flex flex-col items-center">
          {/* Icon/Decoration */}
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3 text-accent">
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">favorite</span>
          </div>

          <h3 className="text-lg md:text-xl font-headline text-on-surface mb-1">{t.title}</h3>
          <p className="text-accent text-xs md:text-sm font-medium mb-2">{t.subtitle}</p>
          <p className="text-on-surface/70 text-xs md:text-sm mb-4 leading-relaxed">
            {t.description}
          </p>

          <a
            href="https://moonine.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="w-full flex items-center justify-center gap-1.5 bg-on-surface text-white py-2.5 px-4 rounded-xl hover:bg-on-surface/90 transition-colors font-medium text-xs md:text-sm group"
          >
            {t.button}
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
