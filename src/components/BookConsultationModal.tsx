'use client';

import { FC } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';
import ScheduleButton from './ScheduleButton';

const TRANSLATIONS = {
  en: {
    title: "Book Consultation",
    meetTitle: "Google Meet Session",
    durationBadge: "30 Mins",
    videoBadge: "Video is optional",
    meetDesc: "1-on-1 session for deep chart analysis and remedies.",
    meetBtn: "Schedule Now",
    optionalDonationBtn: "Optional Donation",
    closeModal: "Close modal",
    useOfService: "Compassionate Kundli Analysis: A safe, supportive space to explore your unique birth chart and understand the planetary influences shaping your current life path.",
    howItBenefits: "Clarity & Inner Peace: Gain deep comfort, absolute clarity, and practical, time-tested remedies to overcome anxieties and welcome positive changes.",
    highlights: [
      "Birth Chart (Kundli) Analysis",
      "Career & Wealth Guidance",
      "Relationships & Compatibility",
      "Custom Remedies & Solutions"
    ]
  }};

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md md:max-w-lg"
      ariaLabelledBy="book-consultation-title"
      ariaDescribedBy="book-consultation-desc"
    >
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 md:mb-4 border-b border-outline/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[#C62828] text-lg md:text-xl leading-none select-none drop-shadow-sm" aria-hidden="true">卐</span>
            <h2 id="book-consultation-title" className="text-xl md:text-2xl font-medium text-on-surface font-headline tracking-tight">{t.title}</h2>
            <span className="text-[#C62828] text-lg md:text-xl leading-none select-none drop-shadow-sm" aria-hidden="true">卐</span>
          </div>
          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'book_modal_close' });
              onClose();
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
            aria-label={t.closeModal}
          >
            <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Content Stack */}
        <div className="space-y-3.5">
          {/* Service Details with Logo */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-on-surface text-2xl" aria-hidden="true">videocam</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className={`font-normal text-on-surface font-headline tracking-tight ${lang === 'hi' ? 'text-lg' : 'text-base md:text-lg'}`}>{t.meetTitle}</h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 bg-surface-bright border border-outline/10 text-on-surface/80 font-medium uppercase rounded-full ${
                    lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}>{t.durationBadge}</span>
                  <span className={`px-2 py-0.5 bg-surface-bright border border-outline/10 text-on-surface/80 font-medium uppercase rounded-full ${
                    lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}>{t.videoBadge}</span>
                </div>
              </div>
              <p id="book-consultation-desc" className={`text-on-surface/80 font-body leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'}`}>{t.meetDesc}</p>
            </div>
          </div>

          {/* Service Details & Benefits (2 empathetic pointers) */}
          <div className="space-y-3">
            <div className="flex gap-2.5 items-start">
              <span className="material-symbols-outlined text-on-surface/70 text-lg shrink-0 mt-0.5" aria-hidden="true">explore</span>
              <p className="text-on-surface/90 font-body leading-relaxed text-xs md:text-sm">
                <strong>{t.useOfService.split(':')[0]}:</strong>{t.useOfService.substring(t.useOfService.indexOf(':') + 1)}
              </p>
            </div>
            <div className="flex gap-2.5 items-start">
              <span className="material-symbols-outlined text-on-surface/70 text-lg shrink-0 mt-0.5" aria-hidden="true">sentiment_satisfied</span>
              <p className="text-on-surface/90 font-body leading-relaxed text-xs md:text-sm">
                <strong>{t.howItBenefits.split(':')[0]}:</strong>{t.howItBenefits.substring(t.howItBenefits.indexOf(':') + 1)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <ScheduleButton
              href="https://calendly.com/rahulbaliastrology/kundli/"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
              className={`flex items-center justify-center w-full py-2.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-[0.15em]'
              }`}
            >
              {t.meetBtn}
            </ScheduleButton>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-outline/20 flex justify-center items-center">
          <div className={`flex items-center gap-1.5 text-on-surface/40 font-body uppercase ${
             lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider'
          }`}>
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span>Secure via Calendly</span>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default BookConsultationModal;