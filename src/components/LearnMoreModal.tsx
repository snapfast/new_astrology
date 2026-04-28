'use client';

import React, { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose, onBookNow }) => {
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

          <div className="flex justify-center mb-2 md:mb-3">
            <span className="px-1.5 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full text-[7px] md:text-[10px] font-bold tracking-widest uppercase font-label">
              ₹701 Fee
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {/* Calendly */}
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'modal_schedule' });
                onBookNow();
              }}
              className="p-3 md:p-4 bg-surface-bright border border-outline/10 rounded-[2rem] md:rounded-[3rem] text-left"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                    <span className="material-symbols-outlined text-base md:text-lg font-variation-fill">calendar_today</span>
                  </div>
                  <span className="text-[7px] md:text-[10px] px-1.5 md:px-3 py-0.5 md:py-1 bg-accent text-white rounded-full uppercase tracking-widest font-label font-bold shrink-0">Preferred</span>
                </div>
                <h3 className="text-[11px] md:text-lg font-medium text-on-surface font-headline mb-1">Schedule Meeting</h3>
                <div className="flex items-center text-accent font-label text-[7px] md:text-[9px] font-bold tracking-widest uppercase gap-2">
                  Book Now
                </div>
              </div>
            </button>

            {/* Email */}
            <a
              href="mailto:rahulbaliastrology@gmail.com"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_email' })}
              className="p-3 md:p-4 bg-surface-bright border border-outline/10 rounded-[2rem] md:rounded-[3rem]"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2 md:mb-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                    <span className="material-symbols-outlined text-base md:text-lg font-variation-fill">mail</span>
                  </div>
                </div>
                <h3 className="text-[11px] md:text-lg font-medium text-on-surface font-headline mb-1">Email Inquiry</h3>
                <div className="flex items-center text-accent font-label text-[7px] md:text-[9px] font-bold tracking-widest uppercase gap-2">
                  Send Mail
                </div>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 md:mt-4">
            {/* Threads - Most Active */}
            <a
              href="https://www.threads.com/@rahulbaliastro"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_threads' })}
              className="block p-2 md:p-4 bg-surface-container-low/30 border border-outline/5 rounded-[1.5rem] md:rounded-[2rem]"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[10px] md:text-base font-medium text-on-surface font-body">Threads</h3>
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
              className="block p-2 md:p-4 bg-surface-container-low/30 border border-outline/5 rounded-[1.5rem] md:rounded-[2rem]"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] md:text-base font-medium text-on-surface font-body">Instagram</h3>
                </div>
              </div>
            </a>

            {/* Donation */}
            <a
              href="/donate"
              onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_donation' })}
              className="block p-2 md:p-4 bg-surface-container-low/30 border border-outline/5 rounded-[1.5rem] md:rounded-[2rem]"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] md:text-base font-medium text-on-surface font-body">Donation</h3>
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
