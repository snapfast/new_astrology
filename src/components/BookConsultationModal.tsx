'use client';

import { FC } from 'react';
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
    viewPayments: "View Payment Methods",
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
    viewPayments: "भुगतान के तरीके देखें",
    motto: "सितारों द्वारा निर्देशित, सत्य में निहित"
  }
};

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPayment: () => void;
}

const BookConsultationModal: FC<BookConsultationModalProps> = ({ isOpen, onClose, onOpenPayment }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg md:max-w-2xl"
    >
      <div className="p-4 md:p-10">
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-5xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'book_modal_close' });
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-8 md:space-y-12">
            {/* Private Google Meet Consultation */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
              <div className="w-14 h-14 md:w-20 md:h-20 bg-surface-bright rounded-3xl border border-outline/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 622 512" className="w-8 h-8 md:w-10 md:h-10">
                  <path d="M351.419 255.568L411.978 324.79L493.418 376.827L507.584 256.005L493.418 137.908L410.418 183.621L351.419 255.568Z" fill="#00832D"/>
                  <path d="M0.00283051 365.583V468.541C0.00283051 492.049 19.0851 511.136 42.5983 511.136H145.556L166.876 433.344L145.556 365.583L74.9198 344.263L0.00283051 365.583Z" fill="#0066DA"/>
                  <path d="M145.556 -7.62939e-06L0.00283051 145.554L74.9247 166.822L145.556 145.554L166.488 78.7145L145.556 -7.62939e-06Z" fill="#E94235"/>
                  <path d="M0.00526047 365.629H145.556V145.551H0.00526047V365.629Z" fill="#2684FC"/>
                  <path d="M586.398 61.6293L493.416 137.91V376.827L586.782 453.404C600.758 464.352 621.204 454.374 621.204 436.607V78.0861C621.204 60.1224 600.271 50.193 586.396 61.6317" fill="#00AC47"/>
                  <path d="M351.419 255.568V365.583H145.556V511.136H450.825C474.338 511.136 493.418 492.049 493.418 468.541V376.827L351.419 255.568Z" fill="#00AC47"/>
                  <path d="M450.825 -7.62939e-06H145.556V145.554H351.419V255.568L493.42 137.905V42.5979C493.42 19.0847 474.338 0.00241891 450.825 0.00241891" fill="#FFBA00"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className={`font-normal text-on-surface font-headline ${lang === 'hi' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{t.meetTitle}</h3>
                  <span className={`px-2 py-0.5 bg-accent/10 text-accent font-bold uppercase rounded-full ${
                    lang === 'hi' ? 'text-[10px] md:text-[11px] tracking-normal' : 'text-[8px] md:text-[9px] tracking-widest'
                  }`}>{t.meetBadge}</span>
                </div>
                <p className={`text-on-surface font-body mb-6 max-w-xl leading-relaxed ${lang === 'hi' ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>{t.meetDesc}</p>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-4">
                  <div className="space-y-1">
                    <p className={`text-on-surface font-headline font-semibold tabular-nums ${lang === 'hi' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>{t.meetPricing}</p>
                    <p className={`text-accent font-body italic ${lang === 'hi' ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs'}`}>{t.meetInstruction}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href="https://calendly.com/rahulbaliastrology/kundli/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
                      className={`inline-flex items-center justify-center px-10 py-4 bg-primary text-white rounded-full font-medium uppercase shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all ${
                        lang === 'hi' ? 'text-[13px] md:text-[15px] tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                      }`}
                    >
                      {t.meetBtn}
                    </a>
                    <button
                      onClick={() => {
                        sendGAEvent({ event: 'action_click', action_name: 'modal_view_payments' });
                        onOpenPayment();
                      }}
                      className={`text-on-surface/60 hover:text-primary transition-colors font-medium border-b border-on-surface/20 hover:border-primary/40 pb-0.5 ${
                        lang === 'hi' ? 'text-xs md:text-sm' : 'text-[10px] md:text-xs uppercase tracking-wider'
                      }`}
                    >
                      {t.viewPayments}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-outline/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-on-surface/40 font-label uppercase transition-all ${
              lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[8px] md:text-[10px] tracking-widest'
            }`}>
              {t.motto}
            </p>
            <div className="flex items-center gap-2 text-on-surface/40 font-body text-[10px] md:text-xs">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Secure Booking via Calendly</span>
            </div>
          </div>
      </div>
    </BaseModal>
  );
};

export default BookConsultationModal;
