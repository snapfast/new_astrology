'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    label: "5 out of 5 stars"
  },
  hi: {
    label: "5 में से 5 सितारे"
  }
};

interface StarRatingProps {
  className?: string;
  starClassName?: string;
}

const StarRating = ({ className, starClassName }: StarRatingProps) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={t.label}
    >
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={cn(
            "material-symbols-outlined font-variation-fill text-accent",
            starClassName
          )}
          aria-hidden="true"
        >
          star
        </span>
      ))}
    </div>
  );
};

export default StarRating;
