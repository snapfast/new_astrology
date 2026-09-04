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
      maxWidth="max-w-md md:max-w-2xl"
      ariaLabelledBy="learn-more-title"
      ariaDescribedBy="learn-more-desc"
    >
      <div className="p-4 md:p-5">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h2 id="learn-more-title" className="text-xl md:text-2xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
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

          <div className="space-y-3.5">
            {/* Sample Reports */}
            <div className="p-3 md:p-3.5 bg-surface-bright border border-outline/20 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 text-center sm:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-xl border border-outline/20 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">folder_open</span>
              </div>
              <div className="flex-1 w-full">
                <h3 className={`font-normal text-on-surface font-headline mb-1 ${lang === 'hi' ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>{t.sampleTitle}</h3>
                <p id="learn-more-desc" className={`text-on-surface/70 font-body mb-2.5 max-w-lg leading-relaxed ${lang === 'hi' ? 'text-xs md:text-sm' : 'text-xs md:text-sm'}`}>{t.sampleDesc}</p>

                <a
                  href="https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_samples_redirect' })}
                  className={`inline-flex items-center gap-1.5 px-4.5 py-1.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                    lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider'
                  }`}
                >
                  {t.sampleBtn}
                  <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Spiritual Insights */}
            <div className="p-3 md:p-3.5 bg-surface-bright border border-outline/20 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 text-center sm:text-left">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-xl border border-outline/20 flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">alternate_email</span>
              </div>
              <div className="flex-1 w-full">
                <h3 className={`font-normal text-on-surface font-headline mb-1 ${lang === 'hi' ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>{t.socialTitle}</h3>
                <p className={`text-on-surface/70 font-body mb-2.5 max-w-lg leading-relaxed ${lang === 'hi' ? 'text-xs md:text-sm' : 'text-xs md:text-sm'}`}>{t.socialDesc}</p>

                <a
                  href="https://www.threads.net/@rahulbaliastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads_redirect' })}
                  className={`inline-flex items-center gap-1.5 px-4.5 py-1.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                    lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider'
                  }`}
                >
                  {t.socialBtn}
                  <span className="material-symbols-outlined text-xs" aria-hidden="true">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;