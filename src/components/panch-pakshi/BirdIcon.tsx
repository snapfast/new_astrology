import React from 'react';

interface BirdIconProps {
  bird: string;
  className?: string;
  size?: number;
}

export const BirdIcon: React.FC<BirdIconProps> = ({ bird, className = "w-12 h-12", size }) => {
  const style = size ? { width: size, height: size } : undefined;

  switch (bird.toLowerCase()) {
    case 'vulture':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Vulture"
          role="img"
        >
          {/* Vulture Icon: Strong curved beak, noble posture, golden brown theme */}
          <circle cx="32" cy="32" r="30" className="fill-amber-500/10 stroke-amber-600/30" strokeWidth="1.5" />
          {/* Wings & Body */}
          <path
            d="M 18 48 C 20 34 32 26 44 28 C 48 36 44 48 36 50 C 28 52 20 52 18 48 Z"
            className="fill-amber-800 dark:fill-amber-700"
          />
          <path
            d="M 14 38 C 18 28 28 22 40 22 C 34 30 26 38 14 38 Z"
            className="fill-amber-900/60"
          />
          {/* Feather Collar */}
          <path
            d="M 28 26 C 26 22 28 18 32 18 C 34 22 32 26 28 26 Z"
            className="fill-stone-200"
          />
          {/* Bare Head & Neck */}
          <path
            d="M 32 20 C 30 14 34 10 38 11 C 42 12 44 16 42 20 Z"
            className="fill-rose-300"
          />
          {/* Sharp Beak */}
          <path
            d="M 40 14 C 46 14 50 18 48 22 C 45 22 42 18 40 14 Z"
            className="fill-amber-500"
          />
          {/* Eye */}
          <circle cx="38" cy="14" r="1.5" className="fill-stone-900" />
        </svg>
      );

    case 'owl':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Owl"
          role="img"
        >
          {/* Owl Icon: Big wise eyes, night owl feather crest, deep blue/indigo theme */}
          <circle cx="32" cy="32" r="30" className="fill-indigo-500/10 stroke-indigo-600/30" strokeWidth="1.5" />
          {/* Body & Ear Tufts */}
          <path
            d="M 20 20 L 24 28 C 24 28 28 24 32 24 C 36 24 40 28 40 28 L 44 20 C 48 30 46 48 32 50 C 18 48 16 30 20 20 Z"
            className="fill-indigo-900 dark:fill-indigo-800"
          />
          {/* Chest Pattern */}
          <path
            d="M 26 34 C 28 32 36 32 38 34 C 40 42 36 48 32 48 C 28 48 24 42 26 34 Z"
            className="fill-indigo-100/20"
          />
          {/* Eye Rings & Large Eyes */}
          <circle cx="25" cy="28" r="8" className="fill-amber-400" />
          <circle cx="39" cy="28" r="8" className="fill-amber-400" />
          <circle cx="25" cy="28" r="4.5" className="fill-slate-950" />
          <circle cx="39" cy="28" r="4.5" className="fill-slate-950" />
          <circle cx="23.5" cy="26.5" r="1.5" className="fill-white" />
          <circle cx="37.5" cy="26.5" r="1.5" className="fill-white" />
          {/* Beak */}
          <path
            d="M 30 31 L 34 31 L 32 37 Z"
            className="fill-amber-600"
          />
        </svg>
      );

    case 'crow':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Crow"
          role="img"
        >
          {/* Crow Icon: Sleek black plumage, sharp beak, intelligent stance, charcoal/slate theme */}
          <circle cx="32" cy="32" r="30" className="fill-slate-500/10 stroke-slate-600/30" strokeWidth="1.5" />
          {/* Body & Tail */}
          <path
            d="M 16 48 C 20 32 32 24 44 26 C 46 36 40 48 30 50 C 22 52 16 48 16 48 Z"
            className="fill-slate-800 dark:fill-slate-700"
          />
          {/* Head & Neck */}
          <path
            d="M 32 26 C 30 18 36 12 42 14 C 46 18 44 26 38 28 Z"
            className="fill-slate-900"
          />
          {/* Wing Feather Line */}
          <path
            d="M 22 42 C 28 32 38 28 42 30 C 38 40 30 46 22 42 Z"
            className="fill-slate-950"
          />
          {/* Sharp Straight Beak */}
          <path
            d="M 42 16 L 54 20 L 42 22 Z"
            className="fill-stone-700"
          />
          {/* Eye */}
          <circle cx="40" cy="18" r="2" className="fill-amber-400" />
          <circle cx="40" cy="18" r="1" className="fill-black" />
        </svg>
      );

    case 'rooster':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Rooster"
          role="img"
        >
          {/* Rooster Icon: Bright red crown/comb, proud posture, crimson/gold theme */}
          <circle cx="32" cy="32" r="30" className="fill-red-500/10 stroke-red-600/30" strokeWidth="1.5" />
          {/* Tail Feathers */}
          <path
            d="M 12 36 C 10 24 20 18 26 24 C 20 28 18 34 16 42 Z"
            className="fill-emerald-700"
          />
          <path
            d="M 16 32 C 16 20 24 16 28 22 C 24 26 22 34 20 42 Z"
            className="fill-teal-600"
          />
          {/* Body */}
          <path
            d="M 22 44 C 22 32 30 26 40 28 C 44 34 42 46 32 48 C 26 48 22 44 22 44 Z"
            className="fill-amber-600"
          />
          {/* Head & Neck */}
          <path
            d="M 32 28 C 32 20 38 14 42 16 C 46 20 44 28 38 30 Z"
            className="fill-orange-500"
          />
          {/* Red Comb */}
          <path
            d="M 38 14 C 36 8 40 6 42 10 C 44 6 48 8 46 14 Z"
            className="fill-red-600"
          />
          {/* Waddle */}
          <path
            d="M 44 22 C 46 24 46 28 42 26 Z"
            className="fill-red-600"
          />
          {/* Beak */}
          <path
            d="M 44 18 L 50 20 L 44 22 Z"
            className="fill-amber-300"
          />
          {/* Eye */}
          <circle cx="41" cy="18" r="1.5" className="fill-slate-900" />
        </svg>
      );

    case 'peacock':
      return (
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Peacock"
          role="img"
        >
          {/* Peacock Icon: Royal fan feathers with spots, elegant neck, cyan/teal/emerald theme */}
          <circle cx="32" cy="32" r="30" className="fill-cyan-500/10 stroke-cyan-600/30" strokeWidth="1.5" />
          {/* Feather Fan Background */}
          <path
            d="M 14 40 C 12 20 26 12 34 16 C 44 12 52 22 48 40 Z"
            className="fill-emerald-600/30"
          />
          {/* Peacock Feather Eyes */}
          <circle cx="20" cy="24" r="3" className="fill-cyan-500 stroke-amber-400" strokeWidth="1" />
          <circle cx="32" cy="18" r="3" className="fill-cyan-500 stroke-amber-400" strokeWidth="1" />
          <circle cx="44" cy="24" r="3" className="fill-cyan-500 stroke-amber-400" strokeWidth="1" />
          {/* Body */}
          <path
            d="M 26 48 C 24 38 30 30 38 32 C 42 38 40 48 32 50 Z"
            className="fill-teal-700"
          />
          {/* Elegant S-Neck & Head */}
          <path
            d="M 32 36 C 30 28 34 20 38 20 C 40 20 42 22 40 26 C 38 28 36 32 34 36 Z"
            className="fill-sky-600"
          />
          {/* Head Crest */}
          <path
            d="M 38 18 C 36 12 40 12 39 16 Z"
            className="stroke-amber-400"
            strokeWidth="1.5"
          />
          <circle cx="37" cy="13" r="1.5" className="fill-amber-400" />
          {/* Beak */}
          <path
            d="M 40 21 L 45 22 L 40 24 Z"
            className="fill-amber-300"
          />
          {/* Eye */}
          <circle cx="38.5" cy="21" r="1" className="fill-slate-900" />
        </svg>
      );

    default:
      return null;
  }
};
