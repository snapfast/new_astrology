import React from 'react';
import localFont from 'next/font/local';

const mustopha = localFont({
  src: '../fonts/mustopha.ttf',
  display: 'swap',
});

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-row items-baseline gap-2 leading-none ${mustopha.className} ${className}`}>
      <span className="text-3xl md:text-5xl font-bold tracking-tight text-accent whitespace-nowrap">
        Bali
      </span>
      <span className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface whitespace-nowrap">
        Astrology
      </span>
    </div>
  );
};

export default Logo;
