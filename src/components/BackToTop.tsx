'use client';

import { useState, useEffect, useRef } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isThrottled = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isThrottled.current) {
        if (window.scrollY > 400) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }

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

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all duration-300 active:scale-95 border border-outline/50 shadow-lg z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label="Back to Top"
      title="Back to Top"
    >
      <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
    </button>
  );
};

export default BackToTop;
