'use client';
import { useState, ReactNode, MouseEvent, useEffect } from 'react';

interface Props {
  href: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export default function AnimatedScheduleButton({ href, onClick, className, children }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    if (onClick) onClick();
    setTimeout(() => {
      window.open(href, '_blank', 'noopener,noreferrer');
      setIsAnimating(false);
    }, 2000);
  };

  useEffect(() => {
    if (isAnimating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAnimating]);

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={`relative overflow-hidden group btn-magical-hover ${className || ''}`}
      >
        <span className="relative z-10">{children}</span>
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
      </a>
      {isAnimating && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Expanding cosmic background */}
          <div className="absolute w-10 h-10 bg-primary rounded-full animate-[expandToScreen_1.5s_ease-in-out_forwards]"></div>

          {/* Constellation lines & particles container */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 animate-[fadeInOut_2s_ease-in-out_forwards]">
            {/* Spinning inner aura */}
            <div className="absolute w-[60vmin] h-[60vmin] rounded-full border border-accent/20 border-dashed animate-[spinSlow_10s_linear_infinite]"></div>
            <div className="absolute w-[40vmin] h-[40vmin] rounded-full border border-accent/30 animate-[spinSlow_7s_linear_infinite_reverse]"></div>

            {/* Floating particles (stars) */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `floatParticle ${2 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              ></div>
            ))}
          </div>

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center justify-center opacity-0 animate-[fadeInOut_2s_ease-in-out_forwards]">
             {/* Main spinning star */}
            <span className="material-symbols-outlined text-accent font-variation-fill text-7xl md:text-9xl mb-8 animate-[spinSlow_4s_linear_infinite]">
              auto_awesome
            </span>
            <p className="text-white font-headline text-2xl md:text-4xl tracking-[0.2em] uppercase opacity-90 drop-shadow-[0_0_15px_rgba(255,174,66,0.5)]">
              Awakening Stars...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
