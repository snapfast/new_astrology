'use client';

import { useState } from 'react';
import LearnMoreModal from './LearnMoreModal';
import BookConsultationModal from './BookConsultationModal';
import StarRating from './StarRating';
import { sendGAEvent } from '@next/third-parties/google';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    subtitle: 'VEDIC ASTROLOGY · JYOTISH SHASTRA',
    title: 'Pandit Rahul Bali Ji',
    desc1: 'Personalized Vedic astrology readings and spiritual consultations rooted in classical Astrology tradition.',
    desc2: 'Gurugram, India.',
    bookBtn: 'Book a Consultation',
    learnBtn: 'Learn More',
    charts: 'Charts',
    rating: 'Rating'
  },
  hi: {
    subtitle: 'वैदिक ज्योतिष · ज्योतिष शास्त्र',
    title: 'पंडित राहुल बाली जी',
    desc1: 'शास्त्रीय ज्योतिष परंपरा में निहित व्यक्तिगत वैदिक ज्योतिष रीडिंग और आध्यात्मिक परामर्श।',
    desc2: 'गुरुग्राम, भारत।',
    bookBtn: 'परामर्श बुक करें',
    learnBtn: 'और जानें',
    charts: 'कुंडलियां',
    rating: 'रेटिंग'
  }
};

const Hero = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Concentric Circles Background */}
      <div className="concentric-circles animate-slow-spin">
        <div className="circle-dashed w-[400px] h-[400px]"></div>
        <div className="circle-dashed w-[600px] h-[600px]"></div>
        <div className="circle-dashed w-[800px] h-[800px]">
           {/* Decorative dot on the outer circle */}
           <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-accent rounded-full border-4 border-background"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center py-20 md:py-32 mt-20 md:mt-12">
        <div className="flex flex-col items-center mb-6">
          <span className={`font-medium text-accent mb-3 font-label ${lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[10px] tracking-[0.3em] uppercase'}`}>
            {t.subtitle}
          </span>
          <span className="text-lg md:text-2xl text-accent font-hindi">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </span>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <p className={`text-on-surface font-body leading-relaxed mb-1 ${lang === 'hi' ? 'text-lg' : 'text-base'}`}>
            {t.desc1}
          </p>
          <p className={`text-on-surface font-body ${lang === 'hi' ? 'text-base' : 'text-sm'}`}>
            {t.desc2}
          </p>
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
            className={`px-10 py-4 bg-transparent text-on-surface border border-outline/60 rounded-full font-medium uppercase font-label transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              lang === 'hi'
                ? 'text-[13px] md:text-[15px] tracking-normal'
                : 'text-[10px] md:text-xs tracking-[0.1em]'
            }`}
          >
            {t.learnBtn}
          </button>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-12 max-w-2xl mx-auto pt-8 border-t border-outline/20">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xl md:text-2xl font-headline text-on-surface tabular-nums mb-1">200+</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.2em] font-label text-center">Consultations</span>
          </div>

          <div className="w-px h-8 bg-outline/20 shrink-0"></div>

          <div className="flex flex-col items-center flex-1">
            <StarRating className="mb-1" starClassName="text-[14px] md:text-[16px]" />
            <span className="text-xl md:text-2xl font-headline text-on-surface tabular-nums mb-1">5.0</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.2em] font-label text-center">Google Rating</span>
          </div>

          <div className="w-px h-8 bg-outline/20 shrink-0"></div>

          <div className="flex flex-col items-center flex-1">
            <span className="text-xl md:text-2xl font-headline text-on-surface tabular-nums mb-1">10+</span>
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
