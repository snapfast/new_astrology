import React from 'react';
import { Quintessential } from 'next/font/google';

const quintessential = Quintessential({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-row items-baseline gap-2 leading-none ${quintessential.className} ${className}`}>
      <span className="text-2xl md:text-4xl font-bold tracking-tight text-accent whitespace-nowrap">
        Bali
      </span>
      <span className="text-2xl md:text-4xl font-bold tracking-tight text-on-surface whitespace-nowrap">
        Astrology
      </span>
    </div>
  );
};

export default Logo;
