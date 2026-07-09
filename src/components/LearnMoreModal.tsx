'use client';

import { FC } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: 'Explore More',
    sampleTitle: 'Sample Reports & Resources',
    sampleDesc: 'View sample astrology reports and educational resources to understand our approach.',
    sampleBtn: 'View Resources',
    sampleHighlights: [
      "In-depth Birth Chart (Kundli) Sample",
      "Comprehensive Compatibility Analysis",
      "Vedic Remedies Reference Sheet"
    ],
    socialTitle: 'Spiritual Insights',
    socialDesc: 'Daily astrological wisdom, mantras, and spiritual guidance on social media.',
    socialBtn: 'Follow on Threads',
    socialHighlights: [
      "Daily Astrological Guidance & Tips",
      "Sacred Mantras & Remedial Chants",
      "Interactive Q&A and Community Posts"
    ],
    motto: 'Guided by the stars, Grounded in Truth',
    closeModal: 'Close modal'
  },
  hi: {
    title: 'और खोजें',
    sampleTitle: 'नमूना रिपोर्ट और संसाधन',
    sampleDesc: 'हमारे दृष्टिकोण को समझने के लिए नमूना ज्योतिष रिपोर्ट और शैक्षिक संसाधन देखें।',
    sampleBtn: 'संसाधन देखें',
    sampleHighlights: [
      "विस्तृत जन्म कुंडली (कुंडली) नमूना",
      "व्यापक अनुकूलता विश्लेषण",
      "वैदिक उपाय संदर्भ पत्रक"
    ],
    socialTitle: 'आध्यात्मिक अंतर्दृष्टि',
    socialDesc: 'सोशल मीडिया पर दैनिक ज्योतिषीय ज्ञान, मंत्र और आध्यात्मिक मार्गदर्शन।',
    socialBtn: 'थ्रेड्स पर फॉलो करें',
    socialHighlights: [
      "दैनिक ज्योतिषीय मार्गदर्शन और सुझाव",
      "पवित्र मंत्र और उपचारात्मक पाठ",
      "इंटरैक्टिव प्रश्नोत्तर और समुदाय"
    ],
    motto: 'सितारों द्वारा निर्देशित, सत्य में निहित',
    closeModal: 'मोडल बंद करें'
  }
};

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg md:max-w-2xl"
    >
      <div className="p-4 md:p-5">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
              aria-label={t.closeModal}
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {/* Sample Reports */}
            <div className="p-3.5 md:p-4 bg-surface-bright border border-outline/10 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 text-center sm:text-left">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-xl border border-outline/10 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-surface text-xl">folder_open</span>
              </div>
              <div className="flex-1 w-full">
                <h3 className={`font-normal text-on-surface font-headline mb-1 ${lang === 'hi' ? 'text-lg md:text-xl' : 'text-base md:text-lg lg:text-xl'}`}>{t.sampleTitle}</h3>
                <p className={`text-on-surface/70 font-body mb-3 max-w-lg leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-[13px]'}`}>{t.sampleDesc}</p>

                {/* Highlights */}
                <ul className="mb-3.5 space-y-1 text-left">
                  {t.sampleHighlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-1.5 text-on-surface/80">
                      <span className="material-symbols-outlined text-accent text-sm" aria-hidden="true">done</span>
                      <span className="text-[11px] md:text-xs font-body">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_samples_redirect' })}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                    lang === 'hi' ? 'text-[11px] md:text-[12px] tracking-normal' : 'text-[9px] md:text-[10px] tracking-wider'
                  }`}
                >
                  {t.sampleBtn}
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Spiritual Insights */}
            <div className="p-3.5 md:p-4 bg-surface-bright border border-outline/10 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 text-center sm:text-left">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-xl border border-outline/10 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-surface text-xl">alternate_email</span>
              </div>
              <div className="flex-1 w-full">
                <h3 className={`font-normal text-on-surface font-headline mb-1 ${lang === 'hi' ? 'text-lg md:text-xl' : 'text-base md:text-lg lg:text-xl'}`}>{t.socialTitle}</h3>
                <p className={`text-on-surface/70 font-body mb-3 max-w-lg leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-[13px]'}`}>{t.socialDesc}</p>

                {/* Highlights */}
                <ul className="mb-3.5 space-y-1 text-left">
                  {t.socialHighlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-1.5 text-on-surface/80">
                      <span className="material-symbols-outlined text-accent text-sm" aria-hidden="true">done</span>
                      <span className="text-[11px] md:text-xs font-body">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://www.threads.net/@rahulbaliastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads_redirect' })}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                    lang === 'hi' ? 'text-[11px] md:text-[12px] tracking-normal' : 'text-[9px] md:text-[10px] tracking-wider'
                  }`}
                >
                  {t.socialBtn}
                  <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline/10">
            <p className={`text-on-surface/40 font-label uppercase transition-all ${
              lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[8px] md:text-[10px] tracking-widest'
            }`}>
              {t.motto}
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;
