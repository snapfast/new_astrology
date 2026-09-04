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
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h2 id="book-consultation-title" className="text-xl md:text-2xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
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

          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 text-center sm:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-surface text-2xl" aria-hidden="true">videocam</span>
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 mb-1 justify-center sm:justify-start">
                  <h3 className={`font-normal text-on-surface font-headline ${lang === 'hi' ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>{t.meetTitle}</h3>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    <span className={`px-2 py-0.5 bg-surface-bright border border-outline/10 text-on-surface/80 uppercase rounded-full ${
                      lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                    }`}>{t.durationBadge}</span>
                    <span className={`px-2 py-0.5 bg-surface-bright border border-outline/10 text-on-surface/80 uppercase rounded-full ${
                      lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                    }`}>{t.videoBadge}</span>
                  </div>
                </div>
                <p id="book-consultation-desc" className={`text-on-surface/70 font-body mb-2 max-w-lg leading-relaxed ${lang === 'hi' ? 'text-xs md:text-sm' : 'text-xs md:text-sm'}`}>{t.meetDesc}</p>

                <div className="space-y-2 mb-3 text-left">
                  <div className="flex gap-2 items-start">
                    <span className="material-symbols-outlined text-on-surface/70 text-base shrink-0 mt-0.5" aria-hidden="true">explore</span>
                    <p className={`text-on-surface/70 font-body leading-relaxed ${lang === 'hi' ? 'text-xs md:text-sm' : 'text-xs md:text-sm'}`}>
                      <strong className="text-on-surface">{t.useOfService.split(':')[0]}:</strong>{t.useOfService.substring(t.useOfService.indexOf(':') + 1)}
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="material-symbols-outlined text-on-surface/70 text-base shrink-0 mt-0.5" aria-hidden="true">sentiment_satisfied</span>
                    <p className={`text-on-surface/70 font-body leading-relaxed ${lang === 'hi' ? 'text-xs md:text-sm' : 'text-xs md:text-sm'}`}>
                      <strong className="text-on-surface">{t.howItBenefits.split(':')[0]}:</strong>{t.howItBenefits.substring(t.howItBenefits.indexOf(':') + 1)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <ScheduleButton
                    href="https://calendly.com/rahulbaliastrology/kundli/"
                    onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
                    className={`inline-flex items-center gap-1.5 px-4.5 py-1.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                      lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider'
                    }`}
                  >
                    {t.meetBtn}
                    <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
                  </ScheduleButton>
                  <div className={`flex items-center gap-1.5 text-on-surface/40 font-body uppercase ${
                    lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}>
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    <span>Secure via Calendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </BaseModal>
  );
};

export default BookConsultationModal;