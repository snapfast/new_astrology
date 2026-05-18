'use client';

import { FC } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
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
        <div className="relative w-full max-w-lg md:max-w-2xl bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl animate-in fade-in zoom-in duration-500 border border-white/20 pointer-events-auto">
          <div className="p-3 md:p-6">
          <div className="flex justify-center items-center mb-4 md:mb-6 relative">
            <h2 className="text-xl md:text-4xl font-normal text-on-surface font-headline tracking-tight text-center">Book Consultation</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'book_modal_close' });
                onClose();
              }}
              className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 shrink-0"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-4 md:space-y-8">
            {/* WhatsApp Consultation */}
            <div className="p-4 md:p-6 bg-surface-container-low/20 rounded-[2rem] border border-outline/10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl border border-outline/10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-10 md:h-10 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg md:text-2xl font-normal text-on-surface font-headline mb-1">WhatsApp Consultation</h3>
                <p className="text-[10px] md:text-sm text-secondary font-body mb-3">Quick and direct guidance via text/voice note.</p>
                <a
                  href="https://wa.me/919306057150"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_whatsapp_redirect' })}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-[#25D366] text-white rounded-full text-[10px] md:text-xs font-medium tracking-wider uppercase"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Private Email Consultation */}
            <div className="p-4 md:p-6 bg-surface-container-low/20 rounded-[2rem] border border-outline/10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl border border-outline/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-3xl md:text-5xl text-accent font-variation-fill">mail</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-1">
                  <h3 className="text-lg md:text-2xl font-normal text-on-surface font-headline">Private Email Consultation</h3>
                  <span className="inline-block px-2 py-0.5 bg-accent/10 text-accent text-[8px] md:text-[9px] font-bold tracking-widest uppercase rounded-full self-center">More Private</span>
                </div>
                <p className="text-[10px] md:text-sm text-secondary font-body mb-4">Detailed analysis delivered via secure email. Comprehensive remedies and lifestyle guidance.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://calendly.com/rahulbaliastrology/kundli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' })}
                    className="inline-flex items-center justify-center gap-2 px-10 py-3 bg-primary text-white rounded-full text-[10px] md:text-xs font-medium tracking-wider uppercase shadow-lg shadow-primary/10"
                  >
                    Schedule Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-10 pt-4 md:pt-6 border-t border-outline/10 text-center">
            <p className="text-[6px] md:text-[10px] text-secondary/50 font-label uppercase tracking-widest">
              Guided by the stars, Grounded in Truth
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default BookConsultationModal;
