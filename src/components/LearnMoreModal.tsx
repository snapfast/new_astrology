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
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
    >
      <div className="p-6 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-normal text-on-surface font-headline tracking-tight">Practice Information</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
                onClose();
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-outline/20 hover:bg-on-surface/5 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-lg">close</span>
            </button>
          </div>

          <div className="space-y-8">
            {/* Methodology */}
            <section>
              <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-4 font-label">Vedic Methodology</h3>
              <ul className="space-y-3 text-sm text-secondary font-body">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Precise astronomical data (Lahiri Ayanamsa)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Traditional analysis (Parashara & Jaimini)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Sattvic remedial measures</span>
                </li>
              </ul>
            </section>

            {/* Quick Links */}
            <section>
              <h3 className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-4 font-label">Quick Links</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: 'Free Horoscope', href: '/free-horoscope', icon: 'auto_awesome' },
                  { name: 'Consultation Services', href: '/services', icon: 'layers' },
                  { name: 'Client Reviews', href: '/reviews', icon: 'star_rate' },
                  { name: 'About Pandit Ji', href: '/about', icon: 'person' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      sendGAEvent({ event: 'action_click', action_name: `modal_nav_${link.href.replace('/', '')}` });
                      onClose();
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-bright border border-transparent hover:border-outline/10 transition-all group"
                  >
                    <span className="material-symbols-outlined text-secondary group-hover:text-accent text-lg">{link.icon}</span>
                    <span className="text-sm font-medium text-on-surface">{link.name}</span>
                  </Link>
                ))}

                <a
                  href="https://www.threads.net/@rahulbaliastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_nav_threads' })}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-bright border border-transparent hover:border-outline/10 transition-all group"
                >
                  <span className="material-symbols-outlined text-secondary group-hover:text-accent text-lg">alternate_email</span>
                  <span className="text-sm font-medium text-on-surface">Insights on Threads</span>
                  <span className="material-symbols-outlined text-[10px] text-secondary/40 ml-auto">open_in_new</span>
                </a>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-outline/10">
            <p className="text-[9px] text-secondary/40 font-body uppercase tracking-widest text-center">
              Gurugram · India
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;
