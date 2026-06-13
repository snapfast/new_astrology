'use client';

import { useState } from 'react';
import LearnMoreModal from './LearnMoreModal';
import BookConsultationModal from './BookConsultationModal';
import { sendGAEvent } from '@next/third-parties/google';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Concentric Circles Background */}
      <div className="concentric-circles animate-slow-spin">
        <div className="circle-dashed w-[400px] h-[400px]"></div>
        <div className="circle-dashed w-[600px] h-[600px]"></div>
        <div className="circle-dashed w-[800px] h-[800px]">
           {/* Decorative dot on the outer circle */}
           <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-accent rounded-full border-4 border-background"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center mt-20 md:mt-12">
        <div className="flex flex-col items-center mb-6">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-3 font-label">
            VEDIC ASTROLOGY · JYOTISH SHASTRA
          </span>
          <span className="text-lg md:text-2xl text-accent font-body">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-normal text-on-surface mb-8 font-headline tracking-tight leading-tight">
          Pandit <br />
          Rahul Bali Ji
        </h1>

        <div className="max-w-md mx-auto mb-12">
          <p className="text-base text-on-surface font-body leading-relaxed mb-1">
            Personalized Vedic astrology readings and spiritual consultations rooted in classical Astrology tradition.
          </p>
          <p className="text-sm text-on-surface font-body">
            Gurugram, India.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'hero_book_consultation' });
              setIsBookingModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase active:translate-y-0 text-center"
          >
            Book a Consultation
          </button>
          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'hero_learn_more' });
              setIsModalOpen(true);
            }}
            className="px-10 py-4 bg-transparent text-on-surface border border-outline/60 rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label"
          >
            Learn More
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
