'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import StarRating from './StarRating';
import { sendGAEvent } from '@next/third-parties/google';

const LearnMoreModal = dynamic(() => import('./LearnMoreModal'), { ssr: false });

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

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background">
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center py-20 md:py-32 mt-20 md:mt-12">
        <div className="flex flex-col items-center mb-6">
          <span className="text-lg md:text-2xl text-accent font-hindi mb-3">
            ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
          </span>
          <h1 className="text-3xl md:text-5xl font-sen text-on-surface font-normal mb-3 tracking-tight">
            Pandit Rahul Bali Ji
          </h1>
          <span className="font-normal text-accent font-label text-[10px] md:text-xs tracking-[0.25em] uppercase max-w-xl text-center">
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
              className="btn-primary flex items-center justify-center gap-2 px-10 py-4 text-center text-[10px] md:text-xs tracking-[0.1em]"
            >
              {t.bookBtn}
            </Link>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'hero_learn_more' });
                setIsModalOpen(true);
              }}
              className="btn-secondary px-10 py-4 text-[10px] md:text-xs tracking-[0.1em]"
            >
              {t.learnBtn}
            </button>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-12 max-w-2xl mx-auto pt-8 border-t border-outline/30">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xl md:text-2xl font-headline text-on-surface tabular-nums mb-1">200+</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.2em] font-label text-center">Consultations</span>
          </div>

          <div className="w-px h-8 bg-outline/20 shrink-0"></div>

          <div className="flex flex-col items-center flex-1">
            <StarRating className="mb-1" starClassName="text-[14px] md:text-[16px]" />
            <span className="text-xl md:text-2xl font-headline text-on-surface tabular-nums mb-1">5.0</span>
            <span className="text-[8px] md:text-[10px] font-medium text-on-surface uppercase tracking-[0.15em] font-label text-center">5 Star Google Rating</span>
          </div>
        </div>
      </div>

      <LearnMoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Hero;
