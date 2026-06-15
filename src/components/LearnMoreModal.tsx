'use client';

import { FC } from 'react';
import Link from 'next/link';
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
    supportWork: "Support Our Work",
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
    supportWork: "हमारे काम का समर्थन करें",
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
      <div className="p-3 md:p-6">
          <div className="flex justify-center items-center mb-4 md:mb-6 relative">
            <h2 className="text-xl md:text-4xl font-normal text-on-surface font-headline tracking-tight text-center">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
                onClose();
              }}
              className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-4 md:space-y-8">
            {/* Sample Reports */}
            <div className="p-4 md:p-6 bg-surface-container-low/20 rounded-[2rem] border border-outline/10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl border border-outline/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-surface text-2xl md:text-4xl">folder_open</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className={`font-normal text-on-surface font-headline mb-1 ${lang === 'hi' ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>{t.sampleTitle}</h3>
                <p className={`text-on-surface font-body mb-3 ${lang === 'hi' ? 'text-xs md:text-base' : 'text-[10px] md:text-sm'}`}>{t.sampleDesc}</p>
                <a
                  href="https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_samples_redirect' })}
                  className={`inline-flex items-center gap-2 px-6 py-2 bg-on-surface text-white rounded-full font-medium uppercase transition-all ${
                    lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}
                >
                  {t.sampleBtn}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Spiritual Insights */}
            <div className="p-4 md:p-6 bg-surface-container-low/20 rounded-[2rem] border border-outline/10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl border border-outline/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-surface text-2xl md:text-4xl">alternate_email</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className={`font-normal text-on-surface font-headline mb-1 ${lang === 'hi' ? 'text-xl md:text-3xl' : 'text-lg md:text-2xl'}`}>{t.socialTitle}</h3>
                <p className={`text-on-surface font-body mb-3 ${lang === 'hi' ? 'text-xs md:text-base' : 'text-[10px] md:text-sm'}`}>{t.socialDesc}</p>
                <a
                  href="https://www.threads.net/@rahulbaliastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads_redirect' })}
                  className={`inline-flex items-center gap-2 px-6 py-2 bg-on-surface text-white rounded-full font-medium uppercase transition-all ${
                    lang === 'hi' ? 'text-[12px] md:text-[14px] tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                  }`}
                >
                  {t.socialBtn}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                href="/about#support"
                onClick={() => {
                  sendGAEvent({ event: 'action_click', action_name: 'learn_modal_support' });
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

export default LearnMoreModal;
