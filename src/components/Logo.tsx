import React from 'react';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-start leading-none ${className}`}>
      <span className={`text-3xl md:text-4xl tracking-tight text-accent whitespace-nowrap ${greatVibes.className}`}>
        Bali
      </span>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[10px] md:text-[12px] font-medium tracking-[0.4em] uppercase text-on-surface font-body whitespace-nowrap">
          Astrology
        </span>
        <div className="h-[1px] w-6 md:w-8 bg-on-surface/30"></div>
      </div>
    </div>
  );
};

export default Logo;
