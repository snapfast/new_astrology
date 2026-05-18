import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-start leading-none ${className}`}>
      <span className="text-lg md:text-2xl font-normal tracking-tight font-headline text-on-surface whitespace-nowrap">
        Rahul Bali
      </span>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[8px] md:text-[10px] font-medium tracking-[0.4em] uppercase text-accent font-body whitespace-nowrap">
          Astrology
        </span>
        <div className="h-[1px] w-6 md:w-8 bg-accent/30"></div>
      </div>
    </div>
  );
};

export default Logo;
