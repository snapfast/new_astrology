'use client';

import { FC } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
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
    suggestedPayments: "Pay after the session. No upfront payment needed.",
    meetBtn: "Schedule Now",
    viewPayments: "Support & Donate",
    closeModal: "Close modal",
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
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 id="book-consultation-title" className="text-xl md:text-2xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'book_modal_close' });
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-outline/20 hover:bg-on-surface/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
            aria-label={t.closeModal}
          >
            <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Content Stack */}
        <div className="space-y-3.5">
          {/* Service Details with Logo */}
          <div className="flex items-start gap-3 bg-surface-bright/50 border border-outline/10 p-3 rounded-2xl">
            <div className="w-9 h-9 bg-white shadow-sm border border-outline/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <svg viewBox="0 0 622 512" className="w-5 h-5">
                <path d="M351.419 255.568L411.978 324.79L493.418 376.827L507.584 256.005L493.418 137.908L410.418 183.621L351.419 255.568Z" fill="#00832D"/>
                <path d="M0.00283051 365.583V468.541C0.00283051 492.049 19.0851 511.136 42.5983 511.136H145.556L166.876 433.344L145.556 365.583L74.9198 344.263L0.00283051 365.583Z" fill="#0066DA"/>
                <path d="M145.556 -7.62939e-06L0.00283051 145.554L74.9247 166.822L145.556 145.554L166.488 78.7145L145.556 -7.62939e-06Z" fill="#E94235"/>
                <path d="M0.00526047 365.629H145.556V145.551H0.00526047V365.629Z" fill="#2684FC"/>
                <path d="M586.398 61.6293L493.416 137.91V376.827L586.782 453.404C600.758 464.352 621.204 454.374 621.204 436.607V78.0861C621.204 60.1224 600.271 50.193 586.396 61.6317" fill="#00AC47"/>
                <path d="M351.419 255.568V365.583H145.556V511.136H450.825C474.338 511.136 493.418 492.049 493.418 468.541V376.827L351.419 255.568Z" fill="#00AC47"/>
                <path d="M450.825 -7.62939e-06H145.556V145.554H351.419V255.568L493.42 137.905V42.5979C493.42 19.0847 474.338 0.00241891 450.825 0.00241891" fill="#FFBA00"/>
              </svg>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className={`font-normal text-on-surface font-headline tracking-tight ${lang === 'hi' ? 'text-lg' : 'text-base md:text-lg'}`}>{t.meetTitle}</h3>
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 bg-accent/10 text-accent font-bold uppercase rounded-full ${
                    lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider'
                  }`}>{t.durationBadge}</span>
                  <span className={`px-2 py-0.5 bg-accent/10 text-accent font-bold uppercase rounded-full ${
                    lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider'
                  }`}>{t.videoBadge}</span>
                </div>
              </div>
              <p id="book-consultation-desc" className={`text-on-surface/80 font-body leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'}`}>{t.meetDesc}</p>
            </div>
          </div>

          {/* Pricing Disclaimer */}
          <div className="bg-accent/20 p-3 rounded-xl text-on-surface/90 font-body leading-relaxed text-xs">
            {t.suggestedPayments}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <ScheduleButton
              href="https://calendly.com/rahulbaliastrology/kundli/"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
              className={`flex items-center justify-center w-full py-2.5 bg-primary text-white border border-accent/30 rounded-full font-bold uppercase shadow-sm shadow-primary/10 ${
                lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-[0.15em]'
              }`}
            >
              {t.meetBtn}
            </ScheduleButton>

            <Link
              href="/donate"
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'modal_view_donate' });
                onClose();
              }}
              className={`block w-full text-center font-medium transition-colors ${
                lang === 'hi' ? 'text-xs text-on-surface/70 hover:text-primary' : 'text-xs uppercase tracking-[0.15em] text-on-surface/60 hover:text-primary'
              }`}
            >
              {t.viewPayments}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-outline/10 flex justify-center items-center">
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