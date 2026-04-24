'use client';

import React from 'react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg md:max-w-3xl bg-surface-bright rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)] custom-scrollbar animate-in fade-in zoom-in duration-300">
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-lg md:text-3xl font-normal text-on-surface font-headline mb-2">Connect with Us</h2>
              <p className="text-accent font-medium font-body text-[10px] md:text-sm mb-1 italic">
                Complete chart reading (₹701): includes all questions, remedies, and lifestyle guidance.
              </p>
              <p className="text-secondary font-body text-[9px] md:text-xs">Choose your preferred channel for consultation and queries.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Calendly */}
            <a
              href="https://calendly.com/rahulbaliastrology/kundli/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-3 md:p-4 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">calendar_today</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-medium text-on-surface font-body">Schedule a Meeting</h3>
                    <span className="text-[7px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full uppercase tracking-widest font-label font-bold shrink-0">Preferred</span>
                  </div>
                  <p className="text-[11px] text-secondary/60 mt-0.5 hidden md:block">Book a personalized 1:1 session conducted via Google Meet.</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors text-sm">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Email - Preferred */}
            <a
              href="/contact"
              className="block group p-3 md:p-4 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface font-body">Email Inquiry</h3>
                  <p className="text-[11px] text-secondary/60 mt-0.5 hidden md:block">Submit specific questions for a detailed written analysis.</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors text-sm">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Threads - Most Active */}
            <a
              href="https://www.threads.com/@rahulbaliastro"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-3 md:p-4 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">alternate_email</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-medium text-on-surface font-body">Threads App</h3>
                    <span className="text-[7px] bg-accent/10 text-accent px-1.5 py-0.5 rounded-full uppercase tracking-widest font-label font-bold shrink-0">Active</span>
                  </div>
                  <p className="text-[11px] text-secondary/60 mt-0.5 truncate hidden md:block">Most active social platform</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors text-sm">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/RahulBaliAstro"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-3 md:p-4 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">chat</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface font-body">Instagram Direct</h3>
                  <p className="text-[11px] text-secondary/60 mt-0.5 truncate hidden md:block">Message us @RahulBaliAstro</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors text-sm">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Donation */}
            <a
              href="/donate"
              className="block group p-3 md:p-4 bg-white border border-outline/10 rounded-3xl hover:border-primary/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-xl font-variation-fill">volunteer_activism</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface font-body">Donation Program</h3>
                  <p className="text-[11px] text-secondary/60 mt-0.5 truncate hidden md:block">Support our spiritual research and services.</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-primary transition-colors text-sm">
                  arrow_forward_ios
                </span>
              </div>
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-outline/10 text-center">
            <p className="text-[10px] md:text-xs text-secondary/50 font-body">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
