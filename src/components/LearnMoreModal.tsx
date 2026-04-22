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
      <div className="relative w-full max-w-lg bg-surface-bright rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-normal text-on-surface font-headline mb-2">Connect with Us</h2>
              <p className="text-accent font-medium font-body text-sm mb-1 italic">
                Complete chart reading (₹701): includes all questions, remedies, and lifestyle guidance.
              </p>
              <p className="text-secondary font-body text-xs">Choose your preferred channel for consultation and queries.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface">close</span>
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {/* Calendly */}
            <a
              href="https://calendly.com/rahulbaliastrology/kundli/"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-5 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-on-surface font-body">Schedule a Meeting</h3>
                  <p className="text-xs text-secondary/70">Book a 1:1 session directly via Calendly</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Email - Preferred */}
            <a
              href="/contact"
              className="block group p-5 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-on-surface font-body">Email Inquiry</h3>
                    <span className="text-[8px] bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase tracking-widest font-label font-bold">Preferred</span>
                  </div>
                  <p className="text-xs text-secondary/70 mt-1">Detailed spiritual queries (1-2 questions only). Same charges as Google Meet.</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Threads - Most Active */}
            <a
              href="https://www.threads.com/@rahulbaliastro"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-5 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-on-surface font-body">Threads App</h3>
                    <span className="text-[8px] bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase tracking-widest font-label font-bold">Most Active</span>
                  </div>
                  <p className="text-xs text-secondary/70 mt-1">Connect on the most active social platform @rahulbaliastro</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/RahulBaliAstro"
              target="_blank"
              rel="noopener noreferrer"
              className="block group p-5 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-on-surface font-body">Instagram Direct</h3>
                  <p className="text-xs text-secondary/70">Message us directly @RahulBaliAstro</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-accent transition-colors">
                  arrow_forward_ios
                </span>
              </div>
            </a>

            {/* Donation */}
            <a
              href="/donate"
              className="block group p-5 bg-white border border-outline/10 rounded-3xl hover:border-accent/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined font-variation-fill">volunteer_activism</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-on-surface font-body">Donation Program</h3>
                  <p className="text-xs text-secondary/70">Support our spiritual research and community services.</p>
                </div>
                <span className="material-symbols-outlined text-secondary/30 group-hover:text-primary transition-colors">
                  arrow_forward_ios
                </span>
              </div>
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-outline/10 text-center">
            <p className="text-xs text-secondary/50 font-body">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
