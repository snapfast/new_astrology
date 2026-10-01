'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import StarRating from './StarRating';
import { sendGAEvent } from '@next/third-parties/google';

const LearnMoreModal = dynamic(() => import('./LearnMoreModal'), { ssr: false });
const BookConsultationModal = dynamic(() => import('./BookConsultationModal'), { ssr: false });

const TRANSLATIONS = {
  en: {
    subtitle: 'SACRED VEDIC ASTROLOGY CONSULTATION · CLEAR GUIDANCE & PRACTICAL REMEDIES',
    title: 'Pandit Rahul Bali Ji',
    bookBtn: 'Book a Consultation',
    learnBtn: 'Learn More',
    charts: 'Charts',
    rating: '5 Star Google Rating'
  }};

const Hero = () => {
  const t = TRANSLATIONS.en;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Concentric Circles Background */}
      <div className="concentric-circles">
        {/* Inner Orbit: Mars (Red) */}
        <div className="circle-dashed w-[400px] h-[400px] animate-spin-20s">
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" title="Mars">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_4px_rgba(255,50,0,0.6)]">
              <defs>
                <radialGradient id="marsGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FF6B4A" />
                  <stop offset="50%" stopColor="#E63917" />
                  <stop offset="85%" stopColor="#991B00" />
                  <stop offset="100%" stopColor="#4A0000" />
                </radialGradient>
              </defs>
              <circle cx="6" cy="6" r="5" fill="url(#marsGrad)" />
            </svg>
          </div>
        </div>

        {/* Middle Orbit: Jupiter (Yellow Gas Giant) */}
        <div className="circle-dashed w-[600px] h-[600px] animate-spin-35s">
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center justify-center" title="Jupiter">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_5px_rgba(255,200,0,0.5)]">
              <defs>
                <radialGradient id="jupGrad" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFF1A8" />
                  <stop offset="40%" stopColor="#FFC900" />
                  <stop offset="75%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#78350F" />
                </radialGradient>
                <clipPath id="jupClip">
                  <circle cx="8" cy="8" r="6" />
                </clipPath>
              </defs>
              <circle cx="8" cy="8" r="6" fill="url(#jupGrad)" />
              <g clipPath="url(#jupClip)" opacity="0.35">
                <rect x="0" y="4" width="16" height="1.5" fill="#78350F" />
                <rect x="0" y="6.5" width="16" height="2" fill="#FFFFFF" />
                <rect x="0" y="9.5" width="16" height="1.5" fill="#92400E" />
                <ellipse cx="11" cy="10.5" rx="2" ry="1" fill="#DC2626" opacity="0.8" />
              </g>
            </svg>
          </div>
        </div>

        {/* Outer Orbit: Saturn (Black/Dark Ringed Planet) */}
        <div className="circle-dashed w-[800px] h-[800px] animate-spin-60s">
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center" title="Saturn">
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_5px_rgba(0,0,0,0.4)]">
              <defs>
                <radialGradient id="saturnBody" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#4B5563" />
                  <stop offset="50%" stopColor="#1F2937" />
                  <stop offset="85%" stopColor="#111827" />
                  <stop offset="100%" stopColor="#030712" />
                </radialGradient>
                <linearGradient id="saturnRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAB308" stopOpacity="0.8" />
                  <stop offset="30%" stopColor="#CA8A04" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#475569" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#A16207" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#CA8A04" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <ellipse cx="13" cy="8" rx="12" ry="4" fill="none" stroke="url(#saturnRing)" strokeWidth="1.8" transform="rotate(-12 13 8)" opacity="0.85" />
              <ellipse cx="13" cy="8" rx="9.5" ry="3.1" fill="none" stroke="#D97706" strokeWidth="0.8" transform="rotate(-12 13 8)" opacity="0.5" />
              <circle cx="13" cy="8" r="5" fill="url(#saturnBody)" stroke="#374151" strokeWidth="0.5" />
              <path d="M 1.8 10.4 A 12 4 0 0 0 24.2 5.6" fill="none" stroke="url(#saturnRing)" strokeWidth="1.8" transform="rotate(-12 13 8)" opacity="0.95" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center py-20 md:py-32 mt-20 md:mt-12">
        <div className="flex flex-col items-center mb-6">
          <span className="text-lg md:text-2xl text-accent font-hindi mb-3">
            ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
          </span>
          <h1 className="text-3xl md:text-5xl font-quicksand text-on-surface font-normal mb-3 tracking-tight">
            Pandit Rahul Bali Ji
          </h1>
          <span className="font-semibold text-accent font-label text-[10px] md:text-xs tracking-[0.25em] uppercase max-w-xl text-center">
            {t.subtitle}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              prefetch={true}
              href="/book-astrology-reading-online"
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'hero_book_consultation' });
              }}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white rounded-full font-medium uppercase font-label active:scale-95 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-[10px] md:text-xs tracking-[0.1em]"
            >
              {t.bookBtn}
            </Link>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'hero_learn_more' });
                setIsModalOpen(true);
              }}
              className="btn-secondary px-10 py-4 font-medium uppercase font-label text-[10px] md:text-xs tracking-[0.1em]"
            >
              {t.learnBtn}
            </button>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-12 max-w-2xl mx-auto pt-8 border-t border-outline/30">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xl md:text-2xl font-headline text-on-surface font-bold tabular-nums mb-1">200+</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.2em] font-label text-center">Consultations</span>
          </div>

          <div className="w-px h-8 bg-outline/20 shrink-0"></div>

          <div className="flex flex-col items-center flex-1">
            <StarRating className="mb-1" starClassName="text-[14px] md:text-[16px]" />
            <span className="text-xl md:text-2xl font-headline text-on-surface font-bold tabular-nums mb-1">5.0</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.15em] font-label text-center">5 Star Google Rating</span>
          </div>
        </div>
      </div>

      <LearnMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
