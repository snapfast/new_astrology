'use client';

import { FC } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const directoryLinks = [
    { name: 'About Pandit Ji', href: '/about', icon: 'person', type: 'internal' },
    { name: 'Consultation Services', href: '/services', icon: 'layers', type: 'internal' },
    { name: 'Free Horoscope Chart', href: '/free-horoscope', icon: 'auto_awesome', type: 'internal' },
    { name: 'Sample Reports & Resources', href: 'https://drive.google.com/drive/folders/your-link', icon: 'folder_open', type: 'external' },
    { name: 'Client Testimonials', href: '/reviews', icon: 'star_rate', type: 'internal' },
    { name: 'Spiritual Insights', href: 'https://www.threads.net/@rahulbaliastro', icon: 'alternate_email', type: 'external' },
  ];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-sm"
    >
      <div className="p-0">
          <div className="flex justify-between items-center px-6 py-5 border-b border-outline/10">
            <h2 className="text-lg font-medium text-on-surface font-headline tracking-tight">Platform Directory</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
                onClose();
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-on-surface/5 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-secondary text-lg">close</span>
            </button>
          </div>

          <div className="py-2">
            {directoryLinks.map((link) => (
              link.type === 'internal' ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    sendGAEvent({ event: 'action_click', action_name: `modal_nav_${link.href.replace('/', '')}` });
                    onClose();
                  }}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-surface-bright transition-all group border-b last:border-0 border-outline/5"
                >
                  <span className="material-symbols-outlined text-secondary group-hover:text-accent text-xl transition-colors">{link.icon}</span>
                  <span className="text-sm font-medium text-on-surface flex-1">{link.name}</span>
                  <span className="material-symbols-outlined text-secondary/30 text-base group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: `modal_nav_${link.name.toLowerCase().replace(/\s+/g, '_')}` })}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-surface-bright transition-all group border-b last:border-0 border-outline/5"
                >
                  <span className="material-symbols-outlined text-secondary group-hover:text-accent text-xl transition-colors">{link.icon}</span>
                  <span className="text-sm font-medium text-on-surface flex-1">{link.name}</span>
                  <span className="material-symbols-outlined text-secondary/30 text-sm">open_in_new</span>
                </a>
              )
            ))}
          </div>

          <div className="px-6 py-4 bg-surface-container-low/30 border-t border-outline/5 text-center">
            <p className="text-[10px] text-secondary/40 font-body uppercase tracking-[0.2em]">
              Vedic Astrology · Gurugram
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;
