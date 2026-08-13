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
        <div className="circle-dashed w-[400px] h-[400px] animate-spin-20s">
          {/* Red dot on the inner circle at 9 o'clock */}
          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#FF0000] rounded-full border-4 border-background"></div>
        </div>
        <div className="circle-dashed w-[600px] h-[600px] animate-spin-30s">
          {/* Black dot on the middle circle at 6 o'clock */}
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-[#000000] rounded-full border-4 border-background"></div>
        </div>
        <div className="circle-dashed w-[800px] h-[800px] animate-spin-45s">
          {/* Golden/accent dot on the outer circle at 3 o'clock */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-accent rounded-full border-4 border-background"></div>
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
