import React from 'react';
import localFont from 'next/font/local';

const qasrina = localFont({
  src: '../fonts/qasrina-arabic-demo.ttf',
  display: 'swap',
});

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-row items-center gap-2 leading-none ${qasrina.className} ${className}`}>
      <svg viewBox="0 0 500 500" className="w-7 h-7 md:w-8 md:h-8 shrink-0 animate-pulse" style={{ animationDuration: '4s' }}>
        <defs>
          <filter id="logoSunGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="25" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="logoSunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff4500" />
            <stop offset="35%" stopColor="#ff6600" />
            <stop offset="65%" stopColor="#ffaa00" />
            <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="180" fill="url(#logoSunGrad)" filter="url(#logoSunGlow)" />
      </svg>
      <div className="flex flex-row items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-bold tracking-wider text-accent whitespace-nowrap">
          Bali
        </span>
        <span className="text-2xl md:text-3xl font-bold tracking-wider text-on-surface whitespace-nowrap">
          Astrology
        </span>
      </div>
    </div>
  );
};

export default Logo;
