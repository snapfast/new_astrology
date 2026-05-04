'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Consultation, Portion } from '@/lib/consultations';
import { sendGAEvent } from '@next/third-parties/google';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Consultation | null;
  onPortionClick: (portion: Portion) => void;
  onBookNow: () => void;
}

const ServiceDetailModal: FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
  onPortionClick,
  onBookNow
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 border border-white/20 flex flex-col md:flex-row max-h-[90vh]">

        {/* Image Section */}
        <div className="relative w-full md:w-2/5 min-h-[300px] md:h-auto bg-surface-bright">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>

          <button
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white md:hidden"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 md:p-14 overflow-y-auto custom-scrollbar bg-white">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-3 block font-label">Service Detail</span>
              <h2 className="text-4xl md:text-5xl font-normal text-on-surface font-headline tracking-tight">
                {service.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-on-surface">close</span>
            </button>
          </div>

          <p className="text-secondary text-lg leading-relaxed font-body mb-12 max-w-2xl">
            {service.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {service.portions.map((portion, index) => (
              <button
                key={index}
                onClick={() => {
                  sendGAEvent({ event: 'action_click', action_name: `portion_click_${portion.title.toLowerCase().replace(/\s+/g, '_')}` });
                  onPortionClick(portion);
                }}
                className="group flex items-start gap-4 p-6 bg-surface-bright border border-outline/10 rounded-[2rem] text-left hover:border-accent/30 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl font-variation-fill">{portion.icon}</span>
                </div>
                <div>
                  <h4 className="text-base font-medium text-on-surface font-headline mb-1">{portion.title}</h4>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-accent/60 group-hover:text-accent transition-colors">Learn More</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-8 border-t border-outline/10">
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'detail_modal_book_now' });
                onBookNow();
              }}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-medium text-xs tracking-[0.1em] uppercase shadow-xl shadow-primary/10 hover:opacity-90 transition-opacity"
            >
              Book Consultation
            </button>
            <p className="text-[10px] text-secondary/60 font-body text-center sm:text-left">
              Bespoke analysis merging ancient Vedic <br className="hidden sm:block" /> scriptures with precision analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
