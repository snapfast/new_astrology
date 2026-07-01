'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Consultation } from '@/lib/consultations';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';
import AnimatedScheduleButton from './AnimatedScheduleButton';

const TRANSLATIONS = {
  en: {
    serviceDetail: 'Service Detail',
    close: 'Close',
    guided: 'Guided by the stars',
    grounded: 'Grounded in Truth',
    schedule: 'Schedule Consultation'
  },
  hi: {
    serviceDetail: 'सेवा विवरण',
    close: 'बंद करें',
    guided: 'सितारों द्वारा निर्देशित',
    grounded: 'सत्य में निहित',
    schedule: 'परामर्श शेड्यूल करें'
  }
};

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Consultation | null;
}

const ServiceDetailModal: FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service
}) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  if (!service) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      zIndex={110}
      maxWidth="max-w-5xl"
      containerClassName="p-4 md:p-6"
      wrapperClassName="rounded-[2.5rem] md:rounded-[3.5rem] border-white/20 duration-500 overflow-hidden flex flex-col md:flex-row max-h-[80vh] md:max-h-[90vh]"
    >
      {/* Image Section */}
        <div className="relative w-full md:w-2/5 min-h-[300px] md:h-auto bg-surface-bright">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            quality={90}
            className="object-cover"
            sizes="(max-width: 768px) calc(100vw - 32px), 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>

          <button
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10  border border-white/20 text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 active:scale-95"
            aria-label={t.close}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 md:p-8 overflow-y-auto custom-scrollbar bg-white">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <div>
              <span className={`font-medium text-accent mb-3 block font-label ${
                lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[10px] tracking-[0.3em] uppercase'
              }`}>{t.serviceDetail}</span>
              <h2 className={`font-normal text-on-surface font-headline tracking-tight ${
                lang === 'hi' ? 'text-3xl md:text-5xl' : 'text-4xl md:text-5xl'
              }`}>
                {service.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
              aria-label={t.close}
            >
              <span className="material-symbols-outlined text-on-surface">close</span>
            </button>
          </div>

          <p className={`text-on-surface/80 leading-relaxed font-body mb-12 max-w-2xl ${
            lang === 'hi' ? 'text-lg md:text-xl' : 'text-base md:text-lg'
          }`}>
            {service.description}
          </p>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {service.portions.map((portion, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 md:p-6 bg-surface-bright border border-outline/10 rounded-3xl text-left"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-outline/5 flex items-center justify-center text-accent shadow-sm">
                  <span className="material-symbols-outlined text-xl font-variation-fill">{portion.icon}</span>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-on-surface font-headline mb-2">{portion.title}</h4>
                  <p className="text-sm md:text-base text-on-surface/70 font-body leading-relaxed">{portion.expandedDetail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-outline/10">
            <AnimatedScheduleButton
              href="https://calendly.com/rahulbaliastrology/kundli/"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'detail_modal_google_meet' })}
              className={`w-full sm:w-auto px-12 py-6 md:py-8 bg-gradient-to-r from-primary via-[#4A3B2C] to-primary text-white rounded-full font-bold uppercase text-center shadow-lg shadow-primary/10 transition-all ${
                lang === 'hi' ? 'text-lg md:text-xl tracking-normal' : 'text-base md:text-lg tracking-wider'
              }`}
            >
              {t.schedule}
            </AnimatedScheduleButton>

            <div className="flex flex-col items-end text-right">
              <p className={`text-on-surface/40 font-label uppercase mb-1 ${
                lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[8px] md:text-[10px] tracking-widest'
              }`}>
                {t.guided}
              </p>
              <p className={`text-on-surface/40 font-label uppercase ${
                lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[8px] md:text-[10px] tracking-widest'
              }`}>
                {t.grounded}
              </p>
            </div>
          </div>
        </div>
    </BaseModal>
  );
};

export default ServiceDetailModal;
