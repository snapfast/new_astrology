'use client';

import { FC } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import LotusSwastika from './LotusSwastika';

const TRANSLATIONS = {
  en: {
    title: 'Explore More',
    subtitle: 'RESOURCES & GUIDANCE',
    sampleTitle: 'Sample Reports & Resources',
    sampleDesc: 'Explore sample birth chart reports and educational guides to understand our authentic Vedic astrology approach.',
    sampleBtn: 'View Resources',
    sampleHighlights: [
      'In-depth Birth Chart (Kundli) Sample',
      'Comprehensive Compatibility Analysis',
      'Vedic Remedies Reference Sheet'
    ],
    socialTitle: 'Spiritual Insights',
    socialDesc: 'Follow daily astrological guidance, sacred mantras, and remedial chants shared regularly on social media.',
    socialBtn: 'Follow on Threads',
    socialHighlights: [
      'Daily Astrological Guidance & Tips',
      'Sacred Mantras & Remedial Chants',
      'Interactive Q&A and Community Posts'
    ],
    motto: 'Guided by the stars, Grounded in Truth',
    closeModal: 'Close modal'
  }
};

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const t = TRANSLATIONS.en;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md md:max-w-lg"
      ariaLabelledBy="learn-more-title"
      ariaDescribedBy="learn-more-desc"
    >
      <div className="p-5 md:p-6 relative">
        {/* Top Header Row with Close Button */}
        <div className="flex justify-between items-start mb-4 pb-3 border-b border-outline/15">
          <div className="flex items-center gap-3">
            {/* Single Large Swastika Icon inside Orbit Badge */}
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0 rounded-full bg-surface-bright border border-outline/20 shadow-sm">
              <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-spin-35s pointer-events-none" />
              <LotusSwastika className="w-7 h-7 text-[#C62828] drop-shadow-sm" aria-hidden="true" />
            </div>
            <div>
              <h2 id="learn-more-title" className="text-xl md:text-2xl font-normal text-on-surface font-sen tracking-tight">
                {t.title}
              </h2>
              <span className="font-semibold text-accent font-label text-[10px] md:text-xs tracking-[0.2em] uppercase">
                {t.subtitle}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
              onClose();
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 shrink-0"
            aria-label={t.closeModal}
          >
            <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">close</span>
          </button>
        </div>

        {/* Content Stack */}
        <div className="space-y-4 pt-1">
          {/* Section 1: Sample Reports */}
          <div className="p-4 rounded-2xl bg-surface-bright border border-outline/15 hover:border-primary/30 transition-all space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5 bg-primary/10 rounded-full">
                <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">folder_open</span>
              </div>
              <div>
                <h3 className="font-medium text-on-surface font-headline tracking-tight mb-1 text-base md:text-lg">
                  {t.sampleTitle}
                </h3>
                <p id="learn-more-desc" className="text-on-surface font-body leading-relaxed text-xs md:text-sm">
                  {t.sampleDesc}
                </p>
              </div>
            </div>

            <ul className="space-y-1.5 pl-12 text-xs md:text-sm text-on-surface font-body">
              {t.sampleHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_samples_redirect' })}
              className="btn-primary flex items-center justify-center gap-2 w-full py-2.5 text-xs md:text-sm tracking-wide mt-2"
            >
              <span>{t.sampleBtn}</span>
              <span className="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
            </a>
          </div>

          {/* Section 2: Spiritual Insights */}
          <div className="p-4 rounded-2xl bg-surface-bright border border-outline/15 hover:border-primary/30 transition-all space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5 bg-primary/10 rounded-full">
                <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">alternate_email</span>
              </div>
              <div>
                <h3 className="font-medium text-on-surface font-headline tracking-tight mb-1 text-base md:text-lg">
                  {t.socialTitle}
                </h3>
                <p className="text-on-surface font-body leading-relaxed text-xs md:text-sm">
                  {t.socialDesc}
                </p>
              </div>
            </div>

            <ul className="space-y-1.5 pl-12 text-xs md:text-sm text-on-surface font-body">
              {t.socialHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://www.threads.net/@rahulbaliastro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads_redirect' })}
              className="btn-primary flex items-center justify-center gap-2 w-full py-2.5 text-xs md:text-sm tracking-wide mt-2"
            >
              <span>{t.socialBtn}</span>
              <span className="material-symbols-outlined text-base" aria-hidden="true">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Footer Motto */}
        <div className="mt-4 pt-3 border-t border-outline/15 text-center">
          <p className="text-[11px] md:text-xs text-accent font-medium tracking-wider uppercase font-label">
            {t.motto}
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;
