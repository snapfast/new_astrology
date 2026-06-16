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
    socialTitle: 'Spiritual Insights',
    socialDesc: 'Daily astrological wisdom, mantras, and spiritual guidance on social media.',
    socialBtn: 'Follow on Threads',
    motto: 'Guided by the stars, Grounded in Truth'
  },
  hi: {
    title: 'और खोजें',
    sampleTitle: 'नमूना रिपोर्ट और संसाधन',
    sampleDesc: 'हमारे दृष्टिकोण को समझने के लिए नमूना ज्योतिष रिपोर्ट और शैक्षिक संसाधन देखें।',
    sampleBtn: 'संसाधन देखें',
    socialTitle: 'आध्यात्मिक अंतर्दृष्टि',
    socialDesc: 'सोशल मीडिया पर दैनिक ज्योतिषीय ज्ञान, मंत्र और आध्यात्मिक मार्गदर्शन।',
    socialBtn: 'थ्रेड्स पर फॉलो करें',
    motto: 'सितारों द्वारा निर्देशित, सत्य में निहित'
  }
};

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
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
                sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Sample Reports */}
            <div className="p-6 md:p-8 bg-surface-bright border border-outline/10 rounded-[2.5rem] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl border border-outline/10 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-surface text-2xl md:text-3xl">folder_open</span>
              </div>
              <div className="flex-1">
                <h3 className={`font-normal text-on-surface font-headline mb-2 ${lang === 'hi' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{t.sampleTitle}</h3>
                <p className={`text-on-surface/70 font-body mb-6 max-w-lg leading-relaxed ${lang === 'hi' ? 'text-base' : 'text-sm'}`}>{t.sampleDesc}</p>
                <a
                  href="https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_samples_redirect' })}
                  className={`inline-flex items-center gap-2 px-8 py-3 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                    lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}
                >
                  {t.sampleBtn}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Spiritual Insights */}
            <div className="p-6 md:p-8 bg-surface-bright border border-outline/10 rounded-[2.5rem] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl border border-outline/10 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-surface text-2xl md:text-3xl">alternate_email</span>
              </div>
              <div className="flex-1">
                <h3 className={`font-normal text-on-surface font-headline mb-2 ${lang === 'hi' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{t.socialTitle}</h3>
                <p className={`text-on-surface/70 font-body mb-6 max-w-lg leading-relaxed ${lang === 'hi' ? 'text-base' : 'text-sm'}`}>{t.socialDesc}</p>
                <a
                  href="https://www.threads.net/@rahulbaliastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads_redirect' })}
                  className={`inline-flex items-center gap-2 px-8 py-3 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                    lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}
                >
                  {t.socialBtn}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-outline/10">
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
