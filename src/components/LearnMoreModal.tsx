'use client';

import { useEffect, FC } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose, onBookNow }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content Wrapper */}
      <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-lg md:max-w-3xl bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl animate-in fade-in zoom-in duration-500 border border-white/20 pointer-events-auto">
          <div className="p-3 md:p-6">
          <div className="flex justify-center items-center mb-4 md:mb-6 relative">
            <h2 className="text-xl md:text-4xl font-normal text-on-surface font-headline tracking-tight text-center">Connect with Us</h2>
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


          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919306057150"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_whatsapp' })}
              className="p-3 md:p-4 bg-surface-bright border border-outline/10 rounded-[2rem] md:rounded-[2.5rem]"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <span className="text-[7px] md:text-[10px] px-1.5 md:px-3 py-0.5 md:py-1 bg-[#25D366] text-white rounded-full uppercase tracking-widest font-label font-bold shrink-0">Fastest</span>
                </div>
                <h3 className="text-sm md:text-lg font-medium text-on-surface font-headline mb-1">WhatsApp Chat</h3>
                <div className="flex items-center text-[#25D366] font-label text-[7px] md:text-[9px] font-bold tracking-widest uppercase gap-2">
                  Connect Now
                </div>
              </div>
            </a>

            {/* Google Meet */}
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'modal_schedule' });
                onBookNow();
              }}
              className="p-3 md:p-4 bg-surface-bright border border-outline/10 rounded-[2rem] md:rounded-[2.5rem] text-left"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                    <svg viewBox="0 0 512 421" className="w-4 h-4 md:w-5 md:h-5">
                      <path fill="#00832d" d="M362.4 121.7l71.2-58.4c17.5-13.6 42.7-1.1 42.7 21v252.1c0 22.1-25.2 34.5-42.7 21l-71.2-58.4V121.7z"/>
                      <path fill="#00ac47" d="M0 311.6V109.1c0-26.6 21.5-48.1 48.1-48.1h266.3c26.6 0 48.1 21.5 48.1 48.1v202.5c0 26.6-21.5 48.1-48.1 48.1H48.1c-26.6 0-48.1-21.5-48.1-48.1z"/>
                      <path fill="#ffba00" d="M0 109.1L82.1 0h242c26.6 0 48.1 21.5 48.1 48.1v61h-372.2z"/>
                      <path fill="#ea4335" d="M362.4 299l114 93.4c17.5 13.6 42.7 1.1 42.7-21v-88.7L362.4 186.2V299z"/>
                      <path fill="#4285f4" d="M0 311.6l82.1 109.1h242c26.6 0 48.1-21.5 48.1-48.1v-61H0z"/>
                    </svg>
                  </div>
                  <span className="text-[7px] md:text-[10px] px-1.5 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full uppercase tracking-widest font-label font-bold shrink-0">Private</span>
                </div>
                <h3 className="text-sm md:text-lg font-medium text-on-surface font-headline mb-1">Google Meet Consultation</h3>
                <div className="flex items-center text-accent font-label text-[7px] md:text-[9px] font-bold tracking-widest uppercase gap-2">
                  Schedule Now
                </div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 md:mt-4">
            {/* Threads - Most Active */}
            <a
              href="https://www.threads.net/@rahulbaliastro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads' })}
              className="block p-3 md:p-4 bg-surface-container-low/30 border border-outline/5 rounded-[1.5rem]"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs md:text-base font-medium text-on-surface font-body">Threads</h3>
                    <span className="text-[7px] md:text-[10px] px-1.5 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full uppercase tracking-widest font-label font-bold shrink-0">Active</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/RahulBaliAstro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_instagram' })}
              className="block p-3 md:p-4 bg-surface-container-low/30 border border-outline/5 rounded-[1.5rem]"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-sm font-medium text-on-surface font-body">Instagram</h3>
                </div>
              </div>
            </a>

            {/* Support */}
            <a
              href="/about#support"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_support' })}
              className="block p-3 md:p-4 bg-surface-container-low/30 border border-outline/5 rounded-[1.5rem]"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs md:text-base font-medium text-on-surface font-body">Support Us</h3>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-3 md:mt-6 pt-3 md:pt-4 border-t border-outline/10 text-center">
            <p className="text-[6px] md:text-[10px] text-secondary/50 font-body">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LearnMoreModal;
