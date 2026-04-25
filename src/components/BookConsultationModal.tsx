'use client';

import React, { useEffect } from 'react';

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: React.FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
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
    <div className="fixed inset-0 z-[100] flex justify-center p-4 overflow-y-auto custom-scrollbar">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative my-auto w-full max-w-lg md:max-w-2xl bg-white/90 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl animate-in fade-in zoom-in duration-500 border border-white/20">
        <div className="p-6 md:p-14">
          <div className="flex justify-center items-center mb-10 md:mb-16 relative">
            <h2 className="text-2xl md:text-4xl font-normal text-on-surface font-headline tracking-tight text-center">Book Consultation</h2>
            <button
              onClick={onClose}
              className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors border border-outline/20 shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-10 md:space-y-16">
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 md:mb-10 p-7 md:p-10 bg-surface-container-low/20 rounded-[2.5rem] border border-outline/5">
                <svg viewBox="0 0 122.88 101.11" className="w-12 h-12 md:w-16 md:h-16">
                  <g>
                    <polygon fill="#188038" points="69.51,50.56 81.49,64.25 97.6,74.54 100.41,50.65 97.6,27.28 81.18,36.32 69.51,50.56"/>
                    <path fill="#1967D2" d="M0,72.32v20.36c0,4.66,3.77,8.43,8.43,8.43h20.36L33,85.72l-4.21-13.4l-13.97-4.21L0,72.32L0,72.32z"/>
                    <polygon fill="#EA4335" points="28.79,0 0,28.79 14.82,33 28.79,28.79 32.93,15.57 28.79,0"/>
                    <polygon fill="#4285F4" points="0,72.32 28.79,72.32 28.79,28.79 0,28.79 0,72.32"/>
                    <path fill="#34A853" d="M115.99,12.19L97.6,27.28v47.26l18.47,15.15c2.77,2.16,6.81,0.19,6.81-3.32V15.45 C122.88,11.89,118.74,9.94,115.99,12.19L115.99,12.19z M69.51,50.56v21.77H28.79v28.79h60.39c4.66,0,8.43-3.77,8.43-8.43V74.54 L69.51,50.56L69.51,50.56z"/><path fill="#FBBC04" d="M89.18,0H28.79v28.79h40.73v21.77L97.6,27.28V8.43C97.6,3.77,93.83,0,89.18,0L89.18,0z"/>
                  </g>
                </svg>
              </div>

              <div className="mb-4">
                <span className="px-3 md:px-4 py-1 md:py-1.5 bg-accent/10 text-accent rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase font-label">
                  ₹701 Fee
                </span>
              </div>

              <h3 className="text-xl md:text-3xl font-normal text-on-surface font-headline mb-4">Personal Consultation</h3>
              <div className="space-y-2 md:space-y-3">
                <p className="text-sm md:text-lg text-secondary font-body">30-minute session via Google Meet</p>
                <p className="text-[10px] md:text-sm text-secondary/70 font-body leading-relaxed max-w-sm mx-auto">
                  Detailed analysis including remedies, lifestyle guidance, and answers to your questions.
                </p>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="p-5 bg-surface-container-low/40 rounded-3xl border border-outline/5 text-center">
                <p className="text-[11px] md:text-sm text-secondary/70 font-body leading-relaxed max-w-sm mx-auto">
                  You will be redirected to <span className="font-semibold text-on-surface">Calendly</span> to choose your time slot. Please ensure payment is completed via the QR code.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="/donate-qr.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 border border-accent/30 rounded-full text-accent font-label text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-center transition-all bg-accent/5"
                >
                  View Payment QR
                </a>

                <a
                  href="https://calendly.com/rahulbaliastrology/kundli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 w-full py-6 bg-primary text-white text-center rounded-full font-medium text-xs md:text-sm tracking-[0.15em] uppercase transition-all shadow-xl shadow-primary/10"
                >
                  Proceed to Calendly
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 pt-6 border-t border-outline/10 text-center">
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
