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
      <svg viewBox="0 0 500 500" className="w-12 h-12 md:w-14 md:h-14 shrink-0 overflow-visible animate-pulse" style={{ animationDuration: '4s' }}>
        <defs>
          <filter id="logoSunGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="60" result="blur1" />
            <feGaussianBlur stdDeviation="25" result="blur2" />
            <feGaussianBlur stdDeviation="10" result="blur3" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur3" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="logoSunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fff3b0" />
            <stop offset="45%" stopColor="#ff8800" />
            <stop offset="75%" stopColor="#ff3300" />
            <stop offset="100%" stopColor="#cc0000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="logoOuterGlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffbb00" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff5500" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#ff2200" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Wide Outer Glare Aura */}
        <circle cx="250" cy="250" r="240" fill="url(#logoOuterGlare)" filter="url(#logoSunGlow)" />
        {/* Core Glowing Sun */}
        <circle cx="250" cy="250" r="170" fill="url(#logoSunGrad)" filter="url(#logoSunGlow)" />
        {/* Orange Om Symbol (ॐ) Vector Path */}
        <g transform="translate(135, 125) scale(0.95)">
          <path
            d="M185.3 118.2c-5.8-10.3-15.1-17.6-26.7-20.9 14.1-8.1 21.6-21.8 19.8-37.3-2.6-22.1-23.7-38.3-46.7-35.8-19.1 2.1-34.1 16.5-37.2 35.4-1.2 7.4.3 14.7 4.1 21 2.9 4.8 1.4 11-3.4 13.9-4.8 2.9-11 1.4-13.9-3.4-6.3-10.4-8.8-22.6-6.8-35 5.1-31.2 29.9-55.1 61.4-58.5 38.1-4.2 72.8 22.5 77.2 60.5 3 25.7-9.4 48.3-32.8 61.7 19.2 5.5 34.6 17.6 44.2 34.6 2.8 4.9 1.1 11.1-3.8 13.9-4.9 2.8-11.1 1.1-13.9-3.8zM120 180c-25 0-45-20-45-45s20-45 45-45 45 20 45 45-20 45-45 45z"
            fill="#D82A00"
            className="hidden"
          />
          <text
            x="120"
            y="135"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#C82800"
            fontSize="190"
            fontWeight="900"
            style={{ fontFamily: "'Akshar', 'Noto Sans Devanagari', 'Segoe UI', sans-serif" }}
            filter="drop-shadow(0px 0px 4px rgba(255, 230, 0, 0.9))"
          >
            ॐ
          </text>
        </g>
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
