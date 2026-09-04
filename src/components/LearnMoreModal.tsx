'use client';

import { FC } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';
import LotusSwastika from './LotusSwastika';

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
  }};

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md md:max-w-lg"
      ariaLabelledBy="learn-more-title"
      ariaDescribedBy="learn-more-desc"
    >
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 md:mb-4 border-b border-outline/10 pb-3">
          <div className="flex items-center gap-3">
            <LotusSwastika className="w-5 h-5 md:w-6 md:h-6 text-[#C62828] drop-shadow-sm" aria-hidden="true" />
            <h2 id="learn-more-title" className="text-xl md:text-2xl font-medium text-on-surface font-headline tracking-tight">{t.title}</h2>
            <LotusSwastika className="w-5 h-5 md:w-6 md:h-6 text-[#C62828] drop-shadow-sm" aria-hidden="true" />
          </div>
          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
              onClose();
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
            aria-label={t.closeModal}
          >
            <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Content Stack */}
        <div className="space-y-4">
          {/* Section 1: Sample Reports */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-on-surface text-2xl" aria-hidden="true">folder_open</span>
              </div>
              <div>
                <h3 className={`font-normal text-on-surface font-headline tracking-tight mb-1 ${lang === 'hi' ? 'text-lg' : 'text-base md:text-lg'}`}>{t.sampleTitle}</h3>
                <p id="learn-more-desc" className={`text-on-surface/80 font-body leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'}`}>{t.sampleDesc}</p>
              </div>
            </div>

            <a
              href="https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_samples_redirect' })}
              className={`flex items-center justify-center w-full py-2.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-[0.15em]'
              }`}
            >
              {t.sampleBtn}
            </a>
          </div>

          <hr className="border-outline/10" />

          {/* Section 2: Spiritual Insights */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-on-surface text-2xl" aria-hidden="true">alternate_email</span>
              </div>
              <div>
                <h3 className={`font-normal text-on-surface font-headline tracking-tight mb-1 ${lang === 'hi' ? 'text-lg' : 'text-base md:text-lg'}`}>{t.socialTitle}</h3>
                <p className={`text-on-surface/80 font-body leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'}`}>{t.socialDesc}</p>
              </div>
            </div>

            <a
              href="https://www.threads.net/@rahulbaliastro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads_redirect' })}
              className={`flex items-center justify-center w-full py-2.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-[0.15em]'
              }`}
            >
              {t.socialBtn}
            </a>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;