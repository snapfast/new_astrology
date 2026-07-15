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
  },
  hi: {
    title: "परामर्श बुक करें",
    meetTitle: "गूगल मीट सत्र",
    durationBadge: "30 मिनट",
    videoBadge: "वीडियो वैकल्पिक है",
    meetDesc: "कुंडली विश्लेषण और उपायों के लिए 1-ऑन-1 सत्र।",
    suggestedPayments: "सत्र के बाद भुगतान करें। अग्रिम भुगतान की जरूरत नहीं।",
    meetBtn: "अभी शेड्यूल करें",
    viewPayments: "समर्थन और दान",
    closeModal: "मोडल बंद करें",
    highlights: [
      "जन्म कुंडली विश्लेषण",
      "करियर और धन मार्गदर्शन",
      "संबंध और अनुकूलता",
      "व्यक्तिगत उपाय और समाधान"
    ]
  }
};

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      ariaLabelledBy="book-consultation-title"
      ariaDescribedBy="book-consultation-desc"
    >
      <div className="p-3 md:p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 md:mb-3">
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
        <div className="space-y-3">
          {/* Service Details */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className={`font-normal text-on-surface font-headline tracking-tight ${lang === 'hi' ? 'text-lg' : 'text-base md:text-lg'}`}>{t.meetTitle}</h3>
              <div className="flex flex-wrap gap-1.5">
                <span className={`px-2 py-0.5 bg-accent/10 text-accent font-bold uppercase rounded-full ${
                  lang === 'hi' ? 'text-[8px] md:text-[9px] tracking-normal' : 'text-[8px] tracking-wider'
                }`}>{t.durationBadge}</span>
                <span className={`px-2 py-0.5 bg-accent/10 text-accent font-bold uppercase rounded-full ${
                  lang === 'hi' ? 'text-[8px] md:text-[9px] tracking-normal' : 'text-[8px] tracking-wider'
                }`}>{t.videoBadge}</span>
              </div>
            </div>
            <p id="book-consultation-desc" className={`text-on-surface/80 font-body leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'}`}>{t.meetDesc}</p>
          </div>

          {/* Pricing Disclaimer */}
          <div className="bg-accent/20 p-2.5 rounded-xl text-on-surface/90 font-body leading-relaxed text-xs">
            {t.suggestedPayments}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <ScheduleButton
              href="https://calendly.com/rahulbaliastrology/kundli/"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
              className={`flex items-center justify-center w-full py-2 bg-primary text-white border border-accent/30 rounded-full font-bold uppercase shadow-sm shadow-primary/10 ${
                lang === 'hi' ? 'text-[11px] md:text-xs tracking-normal' : 'text-[9px] tracking-[0.15em]'
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
                lang === 'hi' ? 'text-[11px] text-on-surface/70 hover:text-primary' : 'text-[9px] uppercase tracking-[0.15em] text-on-surface/60 hover:text-primary'
              }`}
            >
              {t.viewPayments}
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-2.5 border-t border-outline/10 flex justify-center items-center">
          <div className={`flex items-center gap-1.5 text-on-surface/40 font-body uppercase ${
             lang === 'hi' ? 'text-[9px] tracking-normal' : 'text-[8px] tracking-wider'
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
