'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CONSULTATIONS, Consultation, Portion } from '@/lib/consultations';
import ServiceDetailModal from './ServiceDetailModal';
import PortionDetailModal from './PortionDetailModal';
import BookConsultationModal from './BookConsultationModal';
import { sendGAEvent } from '@next/third-parties/google';

const ExpertConsultations = () => {
  const [selectedService, setSelectedService] = useState<Consultation | null>(null);
  const [selectedPortion, setSelectedPortion] = useState<Portion | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleServiceClick = (service: Consultation) => {
    sendGAEvent({ event: 'action_click', action_name: `service_card_click_${service.id}` });
    setSelectedService(service);
  };

  const handlePortionClick = (portion: Portion) => {
    setSelectedPortion(portion);
  };

  const handleBookNow = () => {
    setSelectedService(null);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-24">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">Services</span>
          <h2 className="text-5xl font-normal mb-6 font-headline text-on-surface">Expert Consultations</h2>
          <p className="text-secondary max-w-2xl mx-auto text-base font-body leading-relaxed">Bespoke services merging ancient Vedic scriptures with precision analysis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {CONSULTATIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleServiceClick(item)}
              className="group text-left bg-transparent block"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-10 border border-outline/30 relative bg-surface-bright transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  alt={item.alt}
                  className="w-full h-full object-cover opacity-90 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                  src={item.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                />
                <div className="absolute inset-0 bg-on-surface/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="px-1">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-2xl font-normal tracking-tight font-headline text-on-surface group-hover:text-accent transition-colors">{item.title}</h4>
                  <span className="material-symbols-outlined text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
                </div>
                <p className="text-secondary text-sm leading-relaxed font-body">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ServiceDetailModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        onPortionClick={handlePortionClick}
        onBookNow={handleBookNow}
      />

      <PortionDetailModal
        isOpen={!!selectedPortion}
        onClose={() => setSelectedPortion(null)}
        portion={selectedPortion}
      />

      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
};

export default ExpertConsultations;
