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
    durationBadge: "30 Mins Duration",
    meetDesc: "Live 1-on-1 audio/video session for deep chart analysis and personalized remedies.",
    price1: "₹1,100 / $21",
    price2: "₹5,100 / $71",
    price3: "₹11,001 / $151",
    suggestedPayments: "These are suggested payments. Please choose one as per your requirement. This is not an automated payment; you will have to make the payment manually.",
    meetInstruction: "Confirm your booking slot after payment.",
    meetBtn: "Schedule Consultation",
    viewPayments: "View Payment Methods",
    motto: "Guided by the stars, Grounded in Truth",
    closeModal: "Close modal"
  },
  hi: {
    title: "परामर्श बुक करें",
    meetTitle: "निजी गूगल मीट परामर्श",
    meetBadge: "फोन नंबर की आवश्यकता नहीं",
    durationBadge: "30 मिनट की अवधि",
    meetDesc: "गहन कुंडली विश्लेषण और व्यक्तिगत उपायों के लिए लाइव 1-ऑन-1 ऑडियो/वीडियो सत्र।",
    price1: "₹1,100 / $21",
    price2: "₹5,100 / $71",
    price3: "₹11,001 / $151",
    suggestedPayments: "ये सुझाए गए भुगतान हैं। अपनी आवश्यकता के अनुसार एक चुनें। यह एक स्वचालित भुगतान नहीं है; आपको भुगतान मैन्युअल रूप से करना होगा।",
    meetInstruction: "भुगतान के बाद अपने बुकिंग स्लॉट की पुष्टि करें।",
    meetBtn: "परामर्श शेड्यूल करें",
    viewPayments: "भुगतान के तरीके देखें",
    motto: "सितारों द्वारा निर्देशित, सत्य में निहित",
    closeModal: "मोडल बंद करें"
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
      maxWidth="max-w-lg lg:max-w-4xl"
    >
      <div className="p-6 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'book_modal_close' });
                onClose();
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-outline/20 hover:bg-on-surface/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
              aria-label={t.closeModal}
            >
              <span className="material-symbols-outlined text-on-surface text-2xl">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Service Details */}
            <div className="lg:col-span-7">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white shadow-sm border border-outline/10 rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10">
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

              <div className="space-y-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className={`font-normal text-on-surface font-headline tracking-tight ${lang === 'hi' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl lg:text-3xl'}`}>{t.meetTitle}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 bg-accent/10 text-accent font-bold uppercase rounded-full ${
                      lang === 'hi' ? 'text-[10px] md:text-[11px] tracking-normal' : 'text-[9px] md:text-[10px] tracking-widest'
                    }`}>{t.durationBadge}</span>
                    <span className={`px-3 py-1 bg-accent/10 text-accent font-bold uppercase rounded-full ${
                      lang === 'hi' ? 'text-[10px] md:text-[11px] tracking-normal' : 'text-[9px] md:text-[10px] tracking-widest'
                    }`}>{t.meetBadge}</span>
                  </div>
                </div>
                <p className={`text-on-surface/80 font-body leading-relaxed max-w-xl ${lang === 'hi' ? 'text-lg' : 'text-base md:text-lg'}`}>{t.meetDesc}</p>
              </div>

              <div className="hidden lg:block pt-8">
                 <p className={`text-on-surface/60 font-body italic ${lang === 'hi' ? 'text-sm' : 'text-xs'}`}>{t.meetInstruction}</p>
              </div>
            </div>

            {/* Right Column: Pricing & Action */}
            <div className="lg:col-span-5">
              <div className="bg-surface-bright/50 border border-outline/10 rounded-[2rem] p-8 md:p-10">
                <p className={`text-on-surface/90 font-body mb-8 leading-relaxed ${lang === 'hi' ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
                  {t.suggestedPayments}
                </p>

                <div className="flex flex-col gap-5 mb-10">
                  <p className="text-2xl md:text-3xl text-on-surface font-headline font-semibold tabular-nums whitespace-nowrap font-hindi tracking-tight">{t.price1}</p>
                  <p className="text-2xl md:text-3xl text-on-surface font-headline font-semibold tabular-nums whitespace-nowrap font-hindi tracking-tight">{t.price2}</p>
                  <p className="text-2xl md:text-3xl text-on-surface font-headline font-semibold tabular-nums whitespace-nowrap font-hindi tracking-tight">{t.price3}</p>
                </div>

                <div className="space-y-6">
                  <a
                    href="https://calendly.com/rahulbaliastrology/kundli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
                    className={`flex items-center justify-center w-full py-5 bg-primary text-white rounded-full font-bold uppercase shadow-xl shadow-primary/10 hover:translate-y-[-2px] active:scale-[0.98] transition-all ${
                      lang === 'hi' ? 'text-sm md:text-base tracking-normal' : 'text-[10px] md:text-xs tracking-[0.2em]'
                    }`}
                  >
                    {t.meetBtn}
                  </a>

                  <button
                    onClick={() => {
                      sendGAEvent({ event: 'action_click', action_name: 'modal_view_payments' });
                      onOpenPayment();
                    }}
                    className={`block w-full text-center font-medium transition-colors ${
                      lang === 'hi' ? 'text-sm text-on-surface/70 hover:text-primary' : 'text-[10px] uppercase tracking-[0.15em] text-on-surface/60 hover:text-primary'
                    }`}
                  >
                    {t.viewPayments}
                  </button>
                </div>
              </div>
              <div className="lg:hidden mt-6 text-center">
                 <p className={`text-on-surface/60 font-body italic ${lang === 'hi' ? 'text-sm' : 'text-xs'}`}>{t.meetInstruction}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 md:mt-24 pt-8 md:pt-10 border-t border-outline/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className={`text-on-surface/40 font-label uppercase text-center md:text-left ${
              lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[9px] md:text-[10px] tracking-[0.3em]'
            }`}>
              {t.motto}
            </p>
            <div className={`flex items-center gap-2 text-on-surface/40 font-body uppercase ${
               lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[9px] md:text-[10px] tracking-widest'
            }`}>
              <span className="material-symbols-outlined text-lg">verified_user</span>
              <span>Secure Booking via Calendly</span>
            </div>
          </div>
      </div>
    </BaseModal>
  );
};

export default BookConsultationModal;
