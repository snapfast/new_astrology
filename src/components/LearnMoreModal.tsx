'use client';

import { FC } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose, onBookNow }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg md:max-w-3xl"
    >
      <div className="p-4 md:p-8">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-normal text-on-surface font-headline tracking-tight mb-2">Consultation & Guidance</h2>
              <p className="text-xs md:text-sm text-secondary font-body">Ancient Vedic wisdom tailored for the modern world.</p>
            </div>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'learn_modal_close' });
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 hover:bg-on-surface/5 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          {/* Primary Consultation Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919306057150"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_whatsapp' })}
              className="p-4 md:p-6 bg-surface-bright border border-outline/20 rounded-[2rem] hover:border-accent/40 transition-colors group"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] px-3 py-1 bg-[#25D366] text-white rounded-full uppercase tracking-widest font-label font-bold shrink-0">Direct Chat</span>
                </div>
                <h3 className="text-xl font-medium text-on-surface font-headline mb-2">WhatsApp</h3>
                <p className="text-xs text-secondary font-body leading-relaxed mb-4">Quick queries and rapid response for urgent astrological needs.</p>
                <div className="mt-auto flex items-center text-[#25D366] font-label text-[10px] font-bold tracking-widest uppercase gap-2 group-hover:gap-3 transition-all">
                  Start Conversation <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </a>

            {/* Google Meet */}
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'modal_schedule' });
                onBookNow();
              }}
              className="p-4 md:p-6 bg-surface-bright border border-outline/20 rounded-[2rem] hover:border-accent/40 transition-colors group text-left"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-accent/5 flex items-center justify-center text-accent">
                    <svg viewBox="0 0 512 421" className="w-5 h-5">
                      <path fill="#00832d" d="M362.4 121.7l71.2-58.4c17.5-13.6 42.7-1.1 42.7 21v252.1c0 22.1-25.2 34.5-42.7 21l-71.2-58.4V121.7z"/>
                      <path fill="#00ac47" d="M0 311.6V109.1c0-26.6 21.5-48.1 48.1-48.1h266.3c26.6 0 48.1 21.5 48.1 48.1v202.5c0 26.6-21.5 48.1-48.1 48.1H48.1c-26.6 0-48.1-21.5-48.1-48.1z"/>
                      <path fill="#ffba00" d="M0 109.1L82.1 0h242c26.6 0 48.1 21.5 48.1 48.1v61h-372.2z"/>
                      <path fill="#ea4335" d="M362.4 299l114 93.4c17.5 13.6 42.7 1.1 42.7-21v-88.7L362.4 186.2V299z"/>
                      <path fill="#4285f4" d="M0 311.6l82.1 109.1h242c26.6 0 48.1-21.5 48.1-48.1v-61H0z"/>
                    </svg>
                  </div>
                  <span className="text-[10px] px-3 py-1 bg-accent/10 text-accent rounded-full uppercase tracking-widest font-label font-bold shrink-0">Audio/Video</span>
                </div>
                <h3 className="text-xl font-medium text-on-surface font-headline mb-2">Live Session</h3>
                <p className="text-xs text-secondary font-body leading-relaxed mb-4">Deep 1-on-1 chart analysis and personalized remedial planning.</p>
                <div className="mt-auto flex items-center text-accent font-label text-[10px] font-bold tracking-widest uppercase gap-2 group-hover:gap-3 transition-all">
                  Schedule Call <span className="material-symbols-outlined text-sm">event</span>
                </div>
              </div>
            </button>
          </div>

          {/* The Vedic Approach Section */}
          <div className="mb-8 p-6 bg-surface-container-low rounded-[2rem] border border-outline/10">
            <h4 className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 font-label">The Vedic Approach</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-lg text-accent">biotech</span>
                  <span className="text-xs font-bold uppercase tracking-wider font-label">Precise Data</span>
                </div>
                <p className="text-[11px] text-secondary font-body leading-relaxed">High-precision astronomical calculations using Lahiri Ayanamsa.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-lg text-accent">history_edu</span>
                  <span className="text-xs font-bold uppercase tracking-wider font-label">Traditional Roots</span>
                </div>
                <p className="text-[11px] text-secondary font-body leading-relaxed">Authentic analysis based on Parashara and Jaimini systems.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-lg text-accent">spa</span>
                  <span className="text-xs font-bold uppercase tracking-wider font-label">Sattvic Remedies</span>
                </div>
                <p className="text-[11px] text-secondary font-body leading-relaxed">Simple, effective lifestyle adjustments without complex rituals.</p>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mb-8">
             <h4 className="text-[10px] font-medium tracking-[0.2em] uppercase text-secondary/60 mb-4 font-label px-2">Explore the Platform</h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Link
                  href="/free-horoscope"
                  onClick={() => {
                    sendGAEvent({ event: 'action_click', action_name: 'modal_nav_horoscope' });
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 bg-white border border-outline/10 rounded-2xl hover:bg-surface-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-accent text-lg">auto_awesome</span>
                  <span className="text-xs font-medium text-on-surface">Free Horoscope</span>
                </Link>
                <Link
                  href="/services"
                  onClick={() => {
                    sendGAEvent({ event: 'action_click', action_name: 'modal_nav_services' });
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 bg-white border border-outline/10 rounded-2xl hover:bg-surface-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-accent text-lg">layers</span>
                  <span className="text-xs font-medium text-on-surface">Services</span>
                </Link>
                <Link
                  href="/reviews"
                  onClick={() => {
                    sendGAEvent({ event: 'action_click', action_name: 'modal_nav_reviews' });
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 bg-white border border-outline/10 rounded-2xl hover:bg-surface-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-accent text-lg">star_rate</span>
                  <span className="text-xs font-medium text-on-surface">Reviews</span>
                </Link>
                <a
                  href="https://www.threads.net/@rahulbaliastro"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_nav_threads' })}
                  className="flex items-center gap-3 p-3 bg-white border border-outline/10 rounded-2xl hover:bg-surface-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-accent text-lg">alternate_email</span>
                  <span className="text-xs font-medium text-on-surface">Threads</span>
                </a>
             </div>
          </div>

          {/* Footer Navigation Link */}
          <div className="pt-6 border-t border-outline/10 text-center">
            <Link
              href="/about"
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'modal_nav_about' });
                onClose();
              }}
              className="inline-flex items-center gap-2 text-sm text-on-surface font-medium hover:text-accent transition-colors group"
            >
              Explore Pandit Ji&apos;s Philosophy & Journey
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            <p className="mt-4 text-[10px] text-secondary/40 font-body uppercase tracking-[0.1em]">
              Serving seekers in India · USA · UK · Canada · Australia
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default LearnMoreModal;
