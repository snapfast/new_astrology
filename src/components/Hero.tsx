'use client';

import { useState } from 'react';
import LearnMoreModal from './LearnMoreModal';
import BookConsultationModal from './BookConsultationModal';
import StarRating from './StarRating';
import { sendGAEvent } from '@next/third-parties/google';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    subtitle: 'SACRED VEDIC ASTROLOGY · JYOTISH SHASTRA',
    title: 'Pandit Rahul Bali Ji',
    bookBtn: 'Book a Consultation',
    learnBtn: 'Learn More',
    charts: 'Charts',
    rating: 'Rating'
  }};

const Hero = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Concentric Circles Background */}
      <div className="concentric-circles">
        {/* Ring 1: Moon (Fastest) */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '280px',
            height: '280px',
            animation: 'spin 12s linear infinite'
          }}
        >
          <div
            className="absolute"
            style={{
              top: '-10px',
              animation: 'spin-reverse 12s linear infinite'
            }}
          >
            {/* Moon SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(226,232,240,0.6)]">
              <defs>
                <linearGradient id="moon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="8" fill="url(#moon-grad)" />
              <circle cx="9" cy="9" r="1.5" fill="#64748B" opacity="0.4" />
              <circle cx="15" cy="11" r="1.2" fill="#64748B" opacity="0.3" />
              <circle cx="11" cy="15" r="1.8" fill="#64748B" opacity="0.35" />
            </svg>
          </div>
        </div>

        {/* Ring 2: Mercury */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '350px',
            height: '350px',
            animation: 'spin 20s linear infinite'
          }}
        >
          <div
            className="absolute"
            style={{
              top: '-9px',
              animation: 'spin-reverse 20s linear infinite'
            }}
          >
            {/* Mercury SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="mercury-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="50%" stopColor="#64748B" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="7" fill="url(#mercury-grad)" />
              <circle cx="10" cy="10" r="1" fill="#334155" opacity="0.5" />
              <circle cx="14" cy="13" r="1" fill="#334155" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Ring 3: Venus */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '420px',
            height: '420px',
            animation: 'spin 28s linear infinite'
          }}
        >
          <div
            className="absolute"
            style={{
              top: '-10px',
              animation: 'spin-reverse 28s linear infinite'
            }}
          >
            {/* Venus SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_5px_rgba(253,224,71,0.5)]">
              <defs>
                <linearGradient id="venus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="40%" stopColor="#FDE047" />
                  <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="8" fill="url(#venus-grad)" />
              <path d="M5 10 C 8 8, 16 8, 19 10" stroke="#EAB308" strokeWidth="1" opacity="0.6" />
              <path d="M4 14 C 8 12, 16 12, 20 14" stroke="#EAB308" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Ring 4: Sun */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '490px',
            height: '490px',
            animation: 'spin 36s linear infinite'
          }}
        >
          <div
            className="absolute"
            style={{
              top: '-12px',
              animation: 'spin-reverse 36s linear infinite'
            }}
          >
            {/* Sun SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
              <defs>
                <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="40%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EA580C" />
                </radialGradient>
              </defs>
              <circle cx="12" cy="12" r="10" stroke="#F97316" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '6s' }} />
              <circle cx="12" cy="12" r="8" fill="url(#sun-grad)" />
            </svg>
          </div>
        </div>

        {/* Ring 5: Mars */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '560px',
            height: '560px',
            animation: 'spin 48s linear infinite'
          }}
        >
          <div
            className="absolute"
            style={{
              top: '-9px',
              animation: 'spin-reverse 48s linear infinite'
            }}
          >
            {/* Mars SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]">
              <defs>
                <linearGradient id="mars-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCA5A5" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="7.5" fill="url(#mars-grad)" />
              <ellipse cx="12" cy="5" rx="2" ry="0.8" fill="#FEE2E2" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Ring 6: Jupiter */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '630px',
            height: '630px',
            animation: 'spin 80s linear infinite'
          }}
        >
          <div
            className="absolute"
            style={{
              top: '-13px',
              animation: 'spin-reverse 80s linear infinite'
            }}
          >
            {/* Jupiter SVG */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(194,120,3,0.4)]">
              <defs>
                <linearGradient id="jupiter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDBA74" />
                  <stop offset="50%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#7C2D12" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="10" fill="url(#jupiter-grad)" />
              <path d="M2.5 9 C 6 8, 18 8, 21.5 9" stroke="#9A3412" strokeWidth="1" opacity="0.7" />
              <path d="M2 12 C 6 11, 18 11, 22 12" stroke="#FFFBEB" strokeWidth="1" opacity="0.4" />
              <path d="M2.5 15 C 6 14, 18 14, 21.5 15" stroke="#7C2D12" strokeWidth="1" opacity="0.8" />
              <ellipse cx="15" cy="14" rx="1.5" ry="1" fill="#B91C1C" />
            </svg>
          </div>
        </div>

        {/* Ring 7: Saturn */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '700px',
            height: '700px',
            animation: 'spin 140s linear infinite'
          }}
        >
          <div
            className="absolute"
            style={{
              top: '-12px',
              animation: 'spin-reverse 140s linear infinite'
            }}
          >
            {/* Saturn SVG */}
            <svg width="34" height="24" viewBox="0 0 34 24" fill="none" className="drop-shadow-[0_0_6px_rgba(250,204,21,0.3)]">
              <defs>
                <linearGradient id="saturn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="60%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#854D0E" />
                </linearGradient>
              </defs>
              <path d="M 3 12 C 3 8, 31 8, 31 12" stroke="#D97706" strokeWidth="2" opacity="0.6" />
              <circle cx="17" cy="12" r="7" fill="url(#saturn-grad)" />
              <path d="M 3 12 C 3 16, 31 16, 31 12" stroke="#F59E0B" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Ring 8: Rahu & Ketu (Shadow nodes, retrograde rotation!) */}
        <div
          className="absolute rounded-full border border-dashed border-accent/15 flex items-center justify-center"
          style={{
            width: '770px',
            height: '770px',
            animation: 'spin-reverse 110s linear infinite'
          }}
        >
          {/* Rahu at the top */}
          <div
            className="absolute"
            style={{
              top: '-9px',
              animation: 'spin 110s linear infinite'
            }}
          >
            {/* Rahu SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(109,40,217,0.6)]">
              <defs>
                <radialGradient id="rahu-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="60%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#1E1B4B" />
                </radialGradient>
              </defs>
              <circle cx="12" cy="12" r="8" fill="url(#rahu-grad)" />
              <path d="M 6 12 C 8 8, 16 16, 18 12" stroke="#C084FC" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Ketu at the bottom (exactly 180 degrees apart) */}
          <div
            className="absolute"
            style={{
              bottom: '-9px',
              animation: 'spin 110s linear infinite'
            }}
          >
            {/* Ketu SVG */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]">
              <defs>
                <radialGradient id="ketu-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#99F6E4" />
                  <stop offset="60%" stopColor="#0D9488" />
                  <stop offset="100%" stopColor="#115E59" />
                </radialGradient>
              </defs>
              <circle cx="12" cy="12" r="8" fill="url(#ketu-grad)" />
              <path d="M 12 6 C 16 8, 8 16, 12 18" stroke="#2DD4BF" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center py-20 md:py-32 mt-20 md:mt-12">
        <div className="flex flex-col items-center mb-6">
          <span className={`font-medium text-accent mb-3 font-label ${lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[10px] tracking-[0.3em] uppercase'}`}>
            {t.subtitle}
          </span>
          <span className="text-lg md:text-2xl text-accent font-hindi">
            ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'hero_book_consultation' });
              setIsBookingModalOpen(true);
            }}
            className={`flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white rounded-full font-medium uppercase font-label active:scale-95 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              lang === 'hi'
                ? 'text-[13px] md:text-[15px] tracking-normal'
                : 'text-[10px] md:text-xs tracking-[0.1em]'
            }`}
          >
            {t.bookBtn}
          </button>
          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'hero_learn_more' });
              setIsModalOpen(true);
            }}
            className={`btn-secondary px-10 py-4 font-medium uppercase font-label ${
              lang === 'hi'
                ? 'text-[13px] md:text-[15px] tracking-normal'
                : 'text-[10px] md:text-xs tracking-[0.1em]'
            }`}
          >
            {t.learnBtn}
          </button>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-12 max-w-2xl mx-auto pt-8 border-t border-accent/30">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xl md:text-2xl font-headline text-accent tabular-nums mb-1">200+</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.2em] font-label text-center">Consultations</span>
          </div>

          <div className="w-px h-8 bg-outline/20 shrink-0"></div>

          <div className="flex flex-col items-center flex-1">
            <StarRating className="mb-1" starClassName="text-[14px] md:text-[16px]" />
            <span className="text-xl md:text-2xl font-headline text-accent tabular-nums mb-1">5.0</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.2em] font-label text-center">Google Rating</span>
          </div>

          <div className="w-px h-8 bg-outline/20 shrink-0"></div>

          <div className="flex flex-col items-center flex-1">
            <span className="text-xl md:text-2xl font-headline text-accent tabular-nums mb-1">10+</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.2em] font-label text-center">Countries Reach</span>
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
