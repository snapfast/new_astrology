'use client';

import { FC } from 'react';
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
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  if (!service) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      zIndex={110}
      maxWidth="max-w-md"
      containerClassName="p-1.5 md:p-3"
      wrapperClassName="rounded-2xl md:rounded-3xl border-white/20 duration-500 overflow-hidden bg-white max-h-[80vh] md:max-h-[90vh]"
      ariaLabelledBy="service-detail-title"
      ariaDescribedBy="service-detail-desc"
    >
      <div className="p-3.5 md:p-4 bg-white w-full">
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <div>
            <span className={`font-medium text-accent mb-0.5 block font-label ${
              lang === 'hi' ? 'text-[10px] tracking-normal' : 'text-[8px] tracking-wider uppercase'
            }`}>{t.serviceDetail}</span>
            <h2 id="service-detail-title" className={`font-normal text-on-surface font-headline tracking-tight ${
              lang === 'hi' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl lg:text-2xl'
            }`}>
              {service.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
            aria-label={t.close}
          >
            <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">close</span>
          </button>
        </div>

        <p id="service-detail-desc" className={`text-on-surface/80 leading-relaxed font-body mb-4 max-w-md ${
          lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'
        }`}>
          {service.description}
        </p>

        <div className="flex items-center gap-3 pt-3 border-t border-outline/10">
          <ScheduleButton
            href="https://calendly.com/rahulbaliastrology/kundli/"
            onClick={() => sendGAEvent({ event: 'action_click', action_name: 'detail_modal_google_meet' })}
            className={`w-full py-2 bg-primary text-white border border-accent/30 rounded-full font-bold uppercase text-center shadow-sm shadow-primary/10 ${
              lang === 'hi' ? 'text-xs md:text-sm' : 'text-[9px] tracking-wider'
            }`}
          >
            {t.schedule}
          </ScheduleButton>
        </div>
      </div>
    </BaseModal>
  );
};

export default ServiceDetailModal;
