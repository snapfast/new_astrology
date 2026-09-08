import React from 'react';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-row items-baseline gap-2 leading-none ${greatVibes.className} ${className}`}>
      <span className="text-xl md:text-3xl font-normal tracking-tight text-on-surface whitespace-nowrap">
        Rahul
      </span>
      <span className="text-xl md:text-3xl font-normal tracking-tight text-accent whitespace-nowrap">
        Bali
      </span>
      <span className="text-xl md:text-3xl font-normal tracking-tight text-on-surface whitespace-nowrap">
        Astrology
      </span>
    </div>
  );
};

export default Logo;
