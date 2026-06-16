'use client';

import { FC } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Book Consultation",
    whatsappTitle: "WhatsApp Consultation",
    whatsappDesc: "Quick and direct guidance via text/voice note.",
    whatsappBtn: "Chat on WhatsApp",
    meetTitle: "Private Google Meet Consultation",
    meetBadge: "No phone number required",
    meetDesc: "Live 1-on-1 audio/video session for deep chart analysis and personalized remedies. Schedule your consultation in the slots available.",
    meetBtn: "Schedule Consultation",
    supportWork: "Support Our Work",
    motto: "Guided by the stars, Grounded in Truth"
  },
  hi: {
    title: "परामर्श बुक करें",
    whatsappTitle: "व्हाट्सएप परामर्श",
    whatsappDesc: "टेक्स्ट/वॉयस नोट के माध्यम से त्वरित और सीधा मार्गदर्शन।",
    whatsappBtn: "व्हाट्सएप पर चैट करें",
    meetTitle: "निजी गूगल मीट परामर्श",
    meetBadge: "फोन नंबर की आवश्यकता नहीं",
    meetDesc: "गहन कुंडली विश्लेषण और व्यक्तिगत उपायों के लिए लाइव 1-ऑन-1 ऑडियो/वीडियो सत्र। उपलब्ध स्लॉट में अपना परामर्श शेड्यूल करें।",
    meetBtn: "परामर्श शेड्यूल करें",
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
            {/* WhatsApp Consultation */}
            <div className="p-4 md:p-6 bg-surface-container-low/20 rounded-[2rem] border border-outline/10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl border border-outline/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className={`font-normal text-on-surface font-headline mb-1 ${lang === 'hi' ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>{t.whatsappTitle}</h3>
                <p className={`text-on-surface font-body mb-3 ${lang === 'hi' ? 'text-xs md:text-base' : 'text-[10px] md:text-sm'}`}>{t.whatsappDesc}</p>
                <a
                  href="https://wa.me/919306057150"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_whatsapp_redirect' })}
                  className={`inline-flex items-center gap-2 px-6 py-2 bg-[#25D366] text-white rounded-full font-medium uppercase transition-all ${
                    lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}
                >
                  {t.whatsappBtn}
                </a>
              </div>
            </div>

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
                <p className={`text-on-surface font-body mb-4 ${lang === 'hi' ? 'text-xs md:text-base' : 'text-[10px] md:text-sm'}`}>{t.meetDesc}</p>
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

            <div className="flex justify-center">
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
