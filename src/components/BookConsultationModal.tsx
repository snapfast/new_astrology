'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: React.FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
  const [showQR, setShowQR] = useState(false);

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
      <div className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)] custom-scrollbar animate-in fade-in zoom-in duration-300 border border-outline/20">
        <div className="p-5 md:p-12">
          <div className="flex justify-between items-start mb-6 md:mb-10">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <h2 className="text-xl md:text-4xl font-normal text-on-surface font-headline">Book Consultation</h2>
                <span className="px-2 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase font-label">
                  ₹701 Fee
                </span>
              </div>
              <p className="text-secondary font-body text-[10px] md:text-xs opacity-70">Review session details before proceeding.</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-low rounded-full transition-colors border border-outline/30 shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Session Overview */}
              <div className="p-4 md:p-5 rounded-3xl bg-surface-container-low/30 border border-outline/10">
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>insights</span>
                </div>
                <h4 className="text-xs md:text-sm font-medium text-on-surface font-body mb-2">Overview</h4>
                <p className="text-[10px] md:text-[11px] text-secondary/70 font-body leading-relaxed">Complete 1:1 session with clarity, remedies, and guidance.</p>
              </div>

              {/* Duration */}
              <div className="p-4 md:p-5 rounded-3xl bg-surface-container-low/30 border border-outline/10">
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>timer</span>
                </div>
                <h4 className="text-xs md:text-sm font-medium text-on-surface font-body mb-2">Duration</h4>
                <p className="text-[10px] md:text-[11px] text-secondary/70 font-body leading-relaxed">30 minutes of personalized consultation.</p>
              </div>

              {/* Mode */}
              <div className="p-4 md:p-5 rounded-3xl bg-surface-container-low/30 border border-outline/10">
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>video_call</span>
                </div>
                <h4 className="text-xs md:text-sm font-medium text-on-surface font-body mb-2">Meeting Mode</h4>
                <p className="text-[10px] md:text-[11px] text-secondary/70 font-body leading-relaxed">Conducted via Google Meet with a calendar invite.</p>
              </div>

              {/* Payment */}
              <div className="p-4 md:p-5 rounded-3xl bg-surface-container-low/30 border border-outline/10">
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent mb-4">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>currency_rupee</span>
                </div>
                <h4 className="text-xs md:text-sm font-medium text-on-surface font-body mb-2">Payment</h4>
                <p className="text-[10px] md:text-[11px] text-secondary/70 font-body leading-relaxed">Secure payments before or during the session.</p>
              </div>
            </div>

            {/* Redirection Notice */}
            <div className="p-4 bg-surface-container-low/50 rounded-2xl border border-outline/10 text-center">
              <p className="text-[10px] text-secondary/60 font-body">
                Note: You will be redirected to <span className="font-semibold text-on-surface">Calendly</span> to choose your time slot and finalize.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center justify-center gap-2 w-full py-4 border border-outline/30 rounded-full text-accent font-label text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-accent/5 transition-all"
              >
                {showQR ? 'Hide Payment QR' : 'Show Payment QR'}
              </button>

              {showQR && (
                <div className="relative w-full max-w-[200px] aspect-[495/640] mx-auto bg-white rounded-2xl shadow-xl border border-outline/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-500 p-2">
                  <div className="relative w-full h-full">
                    <Image
                      src="/donate-qr.png"
                      alt="Payment QR Code"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              )}

              <a
                href="https://calendly.com/rahulbaliastrology/kundli/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full py-5 bg-primary text-white text-center rounded-full font-medium text-xs tracking-[0.15em] uppercase transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                Proceed to Calendly
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline/10 text-center">
            <p className="text-[6px] md:text-[10px] text-secondary/50 font-label uppercase tracking-widest">
              Guided by the stars, Grounded in Truth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultationModal;
