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
      <svg viewBox="0 0 500 500" className="w-10 h-10 md:w-12 md:h-12 shrink-0 animate-pulse" style={{ animationDuration: '4s' }}>
        <defs>
          <filter id="logoSunGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="30" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="logoSunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#ffcc00" />
            <stop offset="55%" stopColor="#ff6600" />
            <stop offset="85%" stopColor="#ff3300" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="logoOuterGlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffaa00" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#ff5900" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="230" fill="url(#logoOuterGlare)" filter="url(#logoSunGlow)" />
        <circle cx="250" cy="250" r="180" fill="url(#logoSunGrad)" filter="url(#logoSunGlow)" />
        <text
          x="250"
          y="255"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#D93800"
          fontSize="200"
          fontWeight="bold"
          style={{ fontFamily: "'Akshar', 'Noto Sans Devanagari', sans-serif" }}
          className="drop-shadow-[0_0_8px_rgba(255,200,0,0.8)]"
        >
          ॐ
        </text>
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
