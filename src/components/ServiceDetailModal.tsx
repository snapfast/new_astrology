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
  }};

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
  const t = TRANSLATIONS.en;
  if (!service) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      zIndex={110}
      maxWidth="max-w-2xl md:max-w-3xl"
      containerClassName="p-3 md:p-4"
      wrapperClassName="rounded-2xl md:rounded-3xl border-white/20 duration-500 overflow-hidden bg-white max-h-[85vh] md:max-h-[90vh]"
      ariaLabelledBy="service-detail-title"
      ariaDescribedBy="service-detail-desc"
    >
      <div className="p-4 md:p-5 bg-white w-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div>
            <span className={`font-medium text-accent mb-0.5 block font-label ${
              lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider uppercase'
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

        {/* Description */}
        <p id="service-detail-desc" className={`text-on-surface/80 leading-relaxed font-body mb-3.5 max-w-xl ${
          lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'
        }`}>
          {service.description}
        </p>

        {/* Portions Grid (with material icons/logos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
          {service.portions.map((portion, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-2.5 bg-surface-bright border border-outline/10 rounded-xl text-left"
            >
              <div className="w-7 h-7 shrink-0 rounded-lg bg-white border border-outline/5 flex items-center justify-center text-accent shadow-sm">
                <span className="material-symbols-outlined text-base font-variation-fill">{portion.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-on-surface font-headline mb-0.5">{portion.title}</h4>
                <p className="text-xs md:text-sm text-on-surface/70 font-body leading-relaxed">{portion.expandedDetail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3 pt-3 border-t border-outline/10">
          <ScheduleButton
            href="https://calendly.com/rahulbaliastrology/kundli/"
            onClick={() => sendGAEvent({ event: 'action_click', action_name: 'detail_modal_google_meet' })}
            className={`w-full py-2 bg-primary text-white border border-accent/30 rounded-full font-bold uppercase text-center shadow-sm shadow-primary/10 ${
              lang === 'hi' ? 'text-xs md:text-sm' : 'text-xs md:text-sm tracking-wider'
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