'use client';

import React, { useState } from 'react';
import LearnMoreModal from './LearnMoreModal';
import BookConsultationModal from './BookConsultationModal';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Concentric Circles Background */}
      <div className="concentric-circles animate-slow-spin">
        <div className="circle-dashed w-[400px] h-[400px]"></div>
        <div className="circle-dashed w-[600px] h-[600px]"></div>
        <div className="circle-dashed w-[800px] h-[800px]">
           {/* Decorative dot on the outer circle */}
           <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-accent rounded-full border-4 border-background"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center mt-20">
        <div className="flex flex-col items-center mb-10">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-3 font-label">
            VEDIC ASTROLOGY · JYOTISH SHASTRA
          </span>
          <span className="text-xs text-secondary/60 italic font-body">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </span>
        </div>

        <h1 className="text-7xl md:text-8xl font-normal text-on-surface mb-8 font-headline tracking-tight leading-tight">
          Pandit <br />
          Rahul Bali Ji
        </h1>

        <div className="max-w-md mx-auto mb-12">
          <p className="text-base text-secondary font-body leading-relaxed mb-1">
            Personalized Vedic astrology readings and spiritual consultations rooted in classical Jyotishi tradition.
          </p>
          <p className="text-sm text-secondary/70 font-body">
            Gurugram, India.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="px-10 py-4 bg-primary text-white rounded-full font-medium text-xs tracking-wider transition-all hover:opacity-90 text-center"
          >
            Book a Consultation
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 bg-transparent text-on-surface border border-outline rounded-full font-medium text-xs tracking-wider transition-all hover:bg-surface-container-low font-label"
          >
            Learn More
          </button>
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

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <span className="material-symbols-outlined text-secondary/40 text-3xl font-light">
          keyboard_arrow_down
        </span>
      </div>
    </section>
  );
};

export default Hero;
