'use client';

import { FC } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Book Consultation",
    meetTitle: "Private Google Meet Consultation",
    meetBadge: "No phone number required",
    meetDesc: "Live 1-on-1 audio/video session for deep chart analysis and personalized remedies.",
    meetPricing: "Fee: Rs 10,001 / $151",
    meetInstruction: "Confirm your booking slot after payment.",
    meetBtn: "Schedule Consultation",
    emailTitle: "Email for Consultations & Payment Issues",
    supportWork: "Support Our Work",
    motto: "Guided by the stars, Grounded in Truth"
  },
  hi: {
    title: "परामर्श बुक करें",
    meetTitle: "निजी गूगल मीट परामर्श",
    meetBadge: "फोन नंबर की आवश्यकता नहीं",
    meetDesc: "गहन कुंडली विश्लेषण और व्यक्तिगत उपायों के लिए लाइव 1-ऑन-1 ऑडियो/वीडियो सत्र।",
    meetPricing: "शुल्क: ₹10,001 / $151",
    meetInstruction: "भुगतान के बाद अपने बुकिंग स्लॉट की पुष्टि करें।",
    meetBtn: "परामर्श शेड्यूल करें",
    emailTitle: "परामर्श और भुगतान संबंधी समस्याओं के लिए ईमेल",
    supportWork: "हमारे काम का समर्थन करें",
    motto: "सितारों द्वारा निर्देशित, सत्य में निहित"
  }
};

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg md:max-w-2xl"
    >
      <div className="p-3 md:p-6">
          <div className="flex justify-center items-center mb-4 md:mb-6 relative">
            <h2 className="text-xl md:text-4xl font-normal text-on-surface font-headline tracking-tight text-center">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'book_modal_close' });
                onClose();
              }}
              className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-4 md:space-y-8">
            {/* Private Google Meet Consultation */}
            <div className="p-4 md:p-6 bg-surface-container-low/20 rounded-[2rem] border border-outline/10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl border border-outline/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 622 512" className="w-6 h-6 md:w-10 md:h-10">
                  <path d="M351.419 255.568L411.978 324.79L493.418 376.827L507.584 256.005L493.418 137.908L410.418 183.621L351.419 255.568Z" fill="#00832D"/>
                  <path d="M0.00283051 365.583V468.541C0.00283051 492.049 19.0851 511.136 42.5983 511.136H145.556L166.876 433.344L145.556 365.583L74.9198 344.263L0.00283051 365.583Z" fill="#0066DA"/>
                  <path d="M145.556 -7.62939e-06L0.00283051 145.554L74.9247 166.822L145.556 145.554L166.488 78.7145L145.556 -7.62939e-06Z" fill="#E94235"/>
                  <path d="M0.00526047 365.629H145.556V145.551H0.00526047V365.629Z" fill="#2684FC"/>
                  <path d="M586.398 61.6293L493.416 137.91V376.827L586.782 453.404C600.758 464.352 621.204 454.374 621.204 436.607V78.0861C621.204 60.1224 600.271 50.193 586.396 61.6317" fill="#00AC47"/>
                  <path d="M351.419 255.568V365.583H145.556V511.136H450.825C474.338 511.136 493.418 492.049 493.418 468.541V376.827L351.419 255.568Z" fill="#00AC47"/>
                  <path d="M450.825 -7.62939e-06H145.556V145.554H351.419V255.568L493.42 137.905V42.5979C493.42 19.0847 474.338 0.00241891 450.825 0.00241891" fill="#FFBA00"/>
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-1">
                  <h3 className={`font-normal text-on-surface font-headline ${lang === 'hi' ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>{t.meetTitle}</h3>
                  <span className={`inline-block px-2 py-0.5 bg-accent/10 text-accent font-bold uppercase rounded-full self-center transition-all ${
                    lang === 'hi' ? 'text-[10px] md:text-[11px] tracking-normal' : 'text-[8px] md:text-[9px] tracking-widest'
                  }`}>{t.meetBadge}</span>
                </div>
                <p className={`text-on-surface font-body mb-2 ${lang === 'hi' ? 'text-xs md:text-base' : 'text-[10px] md:text-sm'}`}>{t.meetDesc}</p>
                <p className={`text-on-surface font-headline font-semibold tabular-nums mb-1 ${lang === 'hi' ? 'text-base md:text-xl' : 'text-sm md:text-lg'}`}>{t.meetPricing}</p>
                <p className={`text-accent font-body mb-6 italic ${lang === 'hi' ? 'text-[10px] md:text-sm' : 'text-[9px] md:text-xs'}`}>{t.meetInstruction}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://calendly.com/rahulbaliastrology/kundli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
                    className={`inline-flex items-center justify-center gap-2 px-10 py-3 bg-primary text-white rounded-full font-medium uppercase shadow-lg shadow-primary/10 transition-all ${
                      lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                    }`}
                  >
                    {t.meetBtn}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <a
                href="mailto:rahulbaliastrology@gmail.com"
                className="flex items-center gap-2 text-on-surface/70 hover:text-on-surface transition-colors font-body text-sm"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                <span>{t.emailTitle}: rahulbaliastrology@gmail.com</span>
              </a>

              <Link
                href="/about#support"
                onClick={() => {
                  sendGAEvent({ event: 'action_click', action_name: 'book_modal_support' });
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-surface-bright border border-outline/10 rounded-full hover:bg-on-surface/5 transition-all group"
              >
                <span className="material-symbols-outlined text-accent text-lg group-hover:scale-110 transition-transform">volunteer_activism</span>
                <span className={`text-on-surface font-headline ${lang === 'hi' ? 'text-sm' : 'text-xs uppercase tracking-wider'}`}>{t.supportWork}</span>
                <span className="material-symbols-outlined text-on-surface/30 text-sm group-hover:translate-x-0.5 transition-transform">chevron_right</span>
              </Link>
            </div>
          </div>

          <div className="mt-4 md:mt-10 pt-4 md:pt-6 border-t border-outline/10 text-center">
            <p className={`text-on-surface font-label uppercase transition-all ${
              lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-[6px] md:text-[10px] tracking-widest'
            }`}>
              {t.motto}
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default BookConsultationModal;
