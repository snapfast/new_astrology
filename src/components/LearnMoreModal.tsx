'use client';

import React, { useEffect } from 'react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg md:max-w-3xl bg-white/80 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)] custom-scrollbar animate-in fade-in zoom-in duration-300 border border-white/20">
        <div className="p-5 md:p-12">
          <div className="flex justify-between items-start mb-6 md:mb-10">
            <div>
              <h2 className="text-xl md:text-4xl font-normal text-on-surface font-headline mb-2 md:mb-3">Connect with Us</h2>
              <div className="flex flex-col gap-1">
                <p className="text-accent font-medium font-body text-xs md:text-sm italic">
                  Complete chart reading (₹701): all questions & remedies.
                </p>
                <p className="text-secondary font-body text-[10px] md:text-xs opacity-70">Select a channel to begin your journey.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low rounded-full transition-colors border border-outline/30 shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Calendly */}
            <button
              onClick={onBookNow}
              className="group p-4 md:p-6 bg-white border border-outline/40 rounded-[2rem] hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 text-left"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-xl md:text-2xl font-variation-fill">calendar_today</span>
                  </div>
                  <span className="text-[7px] md:text-[9px] bg-accent text-white px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.2em] font-label font-bold">Preferred</span>
                </div>
                <h3 className="text-lg md:text-xl font-medium text-on-surface font-headline mb-2">Schedule Meeting</h3>
                <p className="text-[11px] md:text-xs text-secondary/70 font-body leading-relaxed mb-4 md:mb-6 flex-1">
                  1:1 session via Google Meet for in-depth analysis.
                </p>
                <div className="flex items-center text-accent font-label text-[10px] font-bold tracking-widest uppercase gap-2">
                  Book Now
                </div>
              </div>
            </button>

            {/* Email */}
            <a
              href="/contact"
              className="group p-4 md:p-6 bg-white border border-outline/40 rounded-[2rem] hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-xl md:text-2xl font-variation-fill">mail</span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-medium text-on-surface font-headline mb-2">Email Inquiry</h3>
                <p className="text-[11px] md:text-xs text-secondary/70 font-body leading-relaxed mb-4 md:mb-6 flex-1">
                  Detailed written analysis for specific questions.
                </p>
                <div className="flex items-center text-accent font-label text-[10px] font-bold tracking-widest uppercase gap-2">
                  Send Mail
                </div>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
            {/* Threads - Most Active */}
            <a
              href="https://www.threads.com/@rahulbaliastro"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-3 md:p-4 bg-surface-container-low/50 border border-outline/20 rounded-[1.5rem] hover:bg-white hover:border-accent/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-medium text-on-surface font-body">Threads App</h3>
                    <span className="text-[7px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full uppercase tracking-widest font-label font-bold shrink-0">Active</span>
                  </div>
                  <p className="text-[9px] md:text-[10px] text-secondary/60 mt-0.5 truncate">Most active platform</p>
                </div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/RahulBaliAstro"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-3 md:p-4 bg-surface-container-low/50 border border-outline/20 rounded-[1.5rem] hover:bg-white hover:border-accent/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface font-body">Instagram</h3>
                  <p className="text-[9px] md:text-[10px] text-secondary/60 mt-0.5 truncate">Direct Message</p>
                </div>
              </div>
            </a>

            {/* Donation */}
            <a
              href="/donate"
              className="block group p-3 md:p-4 bg-primary text-white rounded-[1.5rem] hover:opacity-90 transition-all md:col-span-2 shadow-lg shadow-primary/10 mt-1"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium font-body">Donation Program</h3>
                  <p className="text-[9px] md:text-[10px] text-white/60 mt-0.5">Support our spiritual research and community services.</p>
                </div>
              </div>
            </a>
          </div>

          <div className="mt-8 md:mt-10 pt-6 border-t border-outline/10 text-center">
            <p className="text-[7px] md:text-xs text-secondary/50 font-body">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
