'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Consultation } from '@/lib/consultations';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';
import ScheduleButton from './ScheduleButton';

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
      containerClassName="p-2 md:p-6"
      wrapperClassName="rounded-2xl md:rounded-3xl border-white/20 duration-500 overflow-hidden flex flex-col md:flex-row max-h-[80vh] md:max-h-[90vh]"
      ariaLabelledBy="service-detail-title"
      ariaDescribedBy="service-detail-desc"
    >
      {/* Image Section */}
        <div className="relative w-full md:w-1/3 h-40 md:h-auto bg-surface-bright">
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
            className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10  border border-white/20 text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 active:scale-95"
            aria-label={t.close}
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar bg-white w-full md:w-2/3">
          <div className="flex justify-between items-start mb-3 md:mb-5">
            <div>
              <span className={`font-medium text-accent mb-1 block font-label ${
                lang === 'hi' ? 'text-xs tracking-normal' : 'text-[9px] tracking-[0.3em] uppercase'
              }`}>{t.serviceDetail}</span>
              <h2 id="service-detail-title" className={`font-normal text-on-surface font-headline tracking-tight ${
                lang === 'hi' ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl lg:text-4xl'
              }`}>
                {service.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
              aria-label={t.close}
            >
              <span className="material-symbols-outlined text-on-surface text-xl" aria-hidden="true">close</span>
            </button>
          </div>

          <p id="service-detail-desc" className={`text-on-surface/80 leading-relaxed font-body mb-4 md:mb-6 max-w-2xl ${
            lang === 'hi' ? 'text-base' : 'text-xs md:text-sm'
          }`}>
            {service.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 md:mb-5">
            {service.portions.map((portion, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 p-3.5 bg-surface-bright border border-outline/10 rounded-2xl text-left"
              >
                <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-outline/5 flex items-center justify-center text-accent shadow-sm">
                  <span className="material-symbols-outlined text-lg font-variation-fill">{portion.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-medium text-on-surface font-headline mb-1">{portion.title}</h4>
                  <p className="text-xs md:text-sm text-on-surface/70 font-body leading-relaxed">{portion.expandedDetail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-outline/10">
            <ScheduleButton
              href="https://calendly.com/rahulbaliastrology/kundli/"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'detail_modal_google_meet' })}
              className={`w-full sm:w-auto px-6 py-3 bg-primary text-white border border-accent/30 rounded-full font-bold uppercase text-center shadow-md shadow-primary/10 ${
                lang === 'hi' ? 'text-sm md:text-base' : 'text-xs md:text-sm tracking-wider'
              }`}
            >
              {t.schedule}
            </ScheduleButton>

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
