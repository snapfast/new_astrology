'use client';

import React from 'react';

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: React.FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
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
              <h2 className="text-3xl font-normal text-on-surface font-headline mb-2">Book Consultation</h2>
              <p className="text-secondary font-body text-sm">Review the session details before proceeding.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface">close</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-5">
              {/* Session Overview */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-on-surface font-body">Session Overview</h4>
                  <p className="text-sm text-secondary font-body">A complete 1:1 session—clarity on your situation, all questions answered, plus practical remedies and life guidance.</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-on-surface font-body">Session Duration</h4>
                  <p className="text-sm text-secondary font-body">30 minutes of personalized guidance.</p>
                </div>
              </div>

              {/* Mode */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">video_chat</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-on-surface font-body">Meeting Mode</h4>
                  <p className="text-sm text-secondary font-body">Conducted via Google Meet. You will receive a Google Calendar invite upon booking.</p>
                </div>
              </div>

              {/* Payment */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">payments</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-on-surface font-body">Payment Flexibility</h4>
                  <p className="text-sm text-secondary font-body">Payments can be made securely before the session or during the meeting.</p>
                </div>
              </div>

              {/* Redirection Notice */}
              <div className="mt-4 p-4 bg-surface-container-low rounded-2xl border border-outline/10">
                <p className="text-xs text-secondary/80 font-body leading-relaxed">
                  Note: You will be redirected to our <span className="font-semibold">Calendly</span> page to choose your preferred time slot and finalize the booking.
                </p>
              </div>
            </div>

            <a
              href="https://calendly.com/rahulbaliastrology/kundli/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-primary text-white text-center rounded-full font-medium text-sm tracking-wider transition-all hover:opacity-95"
            >
              Proceed to Calendly
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-outline/10 text-center">
            <p className="text-[10px] text-secondary/50 font-label uppercase tracking-widest">
              Guided by the stars, Grounded in Truth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultationModal;
