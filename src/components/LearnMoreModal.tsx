'use client';

import { FC } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: 'Explore More',
    links: [
      { name: 'Daily Panchang', href: '/panchang', icon: 'calendar_month', type: 'internal' },
      { name: 'Consultation Services', href: '/services', icon: 'layers', type: 'internal' },
      { name: 'Free Horoscope Chart', href: '/free-horoscope', icon: 'auto_awesome', type: 'internal' },
      { name: 'Sample Reports & Resources', href: 'https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ', icon: 'folder_open', type: 'external' },
      { name: 'Client Testimonials', href: '/reviews', icon: 'star_rate', type: 'internal' },
      { name: 'Spiritual Insights', href: 'https://www.threads.net/@rahulbaliastro', icon: 'alternate_email', type: 'external' },
      { name: 'About Pandit Ji', href: '/about', icon: 'person', type: 'internal' },
      { name: 'Support Our Work', href: '/about#support', icon: 'volunteer_activism', type: 'internal' },
    ],
    motto: 'Guided by the stars, Grounded in Truth'
  },
  hi: {
    title: 'और खोजें',
    links: [
      { name: 'दैनिक पंचांग', href: '/panchang', icon: 'calendar_month', type: 'internal' },
      { name: 'परामर्श सेवाएं', href: '/services', icon: 'layers', type: 'internal' },
      { name: 'मुफ्त कुंडली चार्ट', href: '/free-horoscope', icon: 'auto_awesome', type: 'internal' },
      { name: 'नमूना रिपोर्ट और संसाधन', href: 'https://drive.google.com/drive/u/0/folders/1xlyzqP8CEUx11Lh3U14UmBa2Os600SHQ', icon: 'folder_open', type: 'external' },
      { name: 'ग्राहक समीक्षाएं', href: '/reviews', icon: 'star_rate', type: 'internal' },
      { name: 'आध्यात्मिक अंतर्दृष्टि', href: 'https://www.threads.net/@rahulbaliastro', icon: 'alternate_email', type: 'external' },
      { name: 'पंडित जी के बारे में', href: '/about', icon: 'person', type: 'internal' },
      { name: 'हमारे काम का समर्थन करें', href: '/about#support', icon: 'volunteer_activism', type: 'internal' },
    ],
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
      <div className="p-4 md:p-8">
          <div className="flex justify-center items-center mb-6 md:mb-8 relative">
            <h2 className="text-xl md:text-4xl font-normal text-on-surface font-headline tracking-tight text-center">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
                onClose();
              }}
              className="absolute right-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-outline/20 shrink-0 hover:bg-on-surface/5 transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-lg md:text-xl">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {t.links.map((link) => {
              const content = (
                <>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl border border-outline/10 flex items-center justify-center shrink-0 group-hover:border-accent/30 transition-colors">
                    <span className="material-symbols-outlined text-on-surface group-hover:text-accent text-xl md:text-2xl transition-colors">{link.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-lg font-normal text-on-surface font-headline truncate group-hover:text-accent transition-colors">{link.name}</h3>
                  </div>
                  <span className="material-symbols-outlined text-on-surface text-base md:text-xl group-hover:translate-x-0.5 group-hover:text-accent transition-all">
                    {link.type === 'internal' ? 'chevron_right' : 'open_in_new'}
                  </span>
                </>
              );

              return link.type === 'internal' ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    sendGAEvent({ event: 'action_click', action_name: `modal_nav_${link.href.replace('/', '')}` });
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 md:p-4 bg-surface-container-low/20 rounded-2xl md:rounded-[2rem] border border-outline/10 hover:border-accent/20 hover:bg-surface-bright transition-all group"
                >
                  {content}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: `modal_nav_${link.name.toLowerCase().replace(/\s+/g, '_')}` })}
                  className="flex items-center gap-3 p-3 md:p-4 bg-surface-container-low/20 rounded-2xl md:rounded-[2rem] border border-outline/10 hover:border-accent/20 hover:bg-surface-bright transition-all group"
                >
                  {content}
                </a>
              );
            })}
          </div>

          <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-outline/10 text-center">
            <p className={`text-[8px] md:text-[10px] text-on-surface font-label uppercase ${lang === 'en' ? 'tracking-widest' : ''}`}>
              {t.motto}
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;
