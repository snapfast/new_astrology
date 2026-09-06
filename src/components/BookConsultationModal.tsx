'use client';

import { FC, useState, useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';
import ScheduleButton from './ScheduleButton';
import LotusSwastika from './LotusSwastika';
import Image from 'next/image';


const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

const EXIT_REASONS = [
  "I'm not sure the consultation is right for me",
  "I need more information",
  "Unclear pricing",
  "The timing isn't right",
  "I need to think about it",
  "I'm not ready yet",
  "The process was too confusing",
  "I was just browsing",
  "Other"
];

const TRANSLATIONS = {
  en: {
    title: "Book Consultation",
    meetTitle: "Google Meet Session",
    durationBadge: "30 Mins",
    videoBadge: "Video is optional",
    meetDesc: "1-on-1 session for deep chart analysis and remedies.",
    meetBtn: "Schedule Now",
    optionalDonationBtn: "Optional Donation",
    closeModal: "Close modal",
    useOfService: "Compassionate Kundli Analysis",
    howItBenefits: "Clarity & Inner Peace",
    highlights: [
      "Birth Chart (Kundli) Analysis",
      "Career & Wealth Guidance",
      "Relationships & Compatibility",
      "Custom Remedies & Solutions"
    ]
  }};

interface BookConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookConsultationModal: FC<BookConsultationModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  const [view, setView] = useState<'booking' | 'survey' | 'thanks'>('booking');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when modal opens, to avoid visual flash during close animation
  useEffect(() => {
    if (isOpen) {
      setView('booking');
      setSelectedReason('');
    }
  }, [isOpen]);

  const handleSurveySubmit = async () => {
    if (!selectedReason) return;
    setIsSubmitting(true);

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: selectedReason, timestamp: new Date().toISOString() })
      });
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setIsSubmitting(false);
      setView('thanks');
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setView('booking');
          setSelectedReason('');
        }, 300);
      }, 2000);
    }
  };

  const handleBooked = () => {
    onClose();
    setTimeout(() => {
      setView('booking');
      setSelectedReason('');
    }, 300);
  };


  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md md:max-w-lg"
      ariaLabelledBy="book-consultation-title"
      ariaDescribedBy="book-consultation-desc"
    >
      <div className="p-4 md:p-5">
        {view === 'booking' ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-3 md:mb-4 border-b border-outline/10 pb-3">
              <div className="flex items-center gap-3">
                <LotusSwastika className="w-5 h-5 md:w-6 md:h-6 text-[#C62828] drop-shadow-sm" aria-hidden="true" />
                <h2 id="book-consultation-title" className="text-xl md:text-2xl font-medium text-on-surface font-headline tracking-tight">{t.title}</h2>
                <LotusSwastika className="w-5 h-5 md:w-6 md:h-6 text-[#C62828] drop-shadow-sm" aria-hidden="true" />
              </div>
              <button
                onClick={() => {
                  sendGAEvent({ event: 'action_click', action_name: 'book_modal_close' });
                  onClose();
                }}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
                aria-label={t.closeModal}
              >
                <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">close</span>
              </button>
            </div>

            {/* Content Stack */}
            <div className="space-y-3.5">
              {/* Service Details with Logo */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5 bg-surface-bright rounded-full">
                  <Image src="/google-meet-icon.svg" alt="Google Meet Logo" width={24} height={24} className="w-5 h-5 drop-shadow-sm" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className={`font-normal text-on-surface font-headline tracking-tight ${lang === 'hi' ? 'text-lg' : 'text-base md:text-lg'}`}>{t.meetTitle}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`px-2 py-0.5 bg-surface-bright border border-outline/10 text-on-surface/80 font-medium uppercase rounded-full ${
                        lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                      }`}>{t.durationBadge}</span>
                      <span className={`px-2 py-0.5 bg-surface-bright border border-outline/10 text-on-surface/80 font-medium uppercase rounded-full ${
                        lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[10px] md:text-xs tracking-wider'
                      }`}>{t.videoBadge}</span>
                    </div>
                  </div>
                  <p id="book-consultation-desc" className={`text-on-surface/80 font-body leading-relaxed ${lang === 'hi' ? 'text-sm' : 'text-xs md:text-sm'}`}>{t.meetDesc}</p>
                </div>
              </div>

              {/* Service Details & Benefits (2 empathetic pointers) */}
              <div className="space-y-3">
                <div className="flex gap-2.5 items-start">
                  <span className="material-symbols-outlined text-on-surface/70 text-lg shrink-0 mt-0.5" aria-hidden="true">explore</span>
                  <p className="text-on-surface/90 font-body leading-relaxed text-xs md:text-sm">
                    {t.useOfService}
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="material-symbols-outlined text-on-surface/70 text-lg shrink-0 mt-0.5" aria-hidden="true">sentiment_satisfied</span>
                  <p className="text-on-surface/90 font-body leading-relaxed text-xs md:text-sm">
                    {t.howItBenefits}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <ScheduleButton
                  href="https://calendly.com/rahulbaliastrology/kundli/"
                  onClick={() => {
                    sendGAEvent({ event: 'action_click', action_name: 'modal_calendly_redirect' });
                    setView('survey');
                  }}
                  className={`flex items-center justify-center w-full py-2.5 bg-on-surface text-white rounded-full font-medium uppercase transition-all hover:bg-on-surface/90 ${
                    lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-[0.15em]'
                  }`}
                >
                  {t.meetBtn}
                </ScheduleButton>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-outline/20 flex justify-center items-center">
              <div className={`flex items-center gap-1.5 text-on-surface/40 font-body uppercase ${
                 lang === 'hi' ? 'text-xs md:text-sm tracking-normal' : 'text-xs md:text-sm tracking-wider'
              }`}>
                <span className="material-symbols-outlined text-base">verified_user</span>
                <span>Secure via Calendly</span>
              </div>
            </div>
          </>
        ) : view === 'survey' ? (
          <>
            <div className="flex justify-between items-center mb-2.5 border-b border-outline/10 pb-2">
              <div className="flex items-center gap-2 md:gap-3">
                 <LotusSwastika className="w-5 h-5 text-[#C62828] drop-shadow-sm" aria-hidden="true" />
                 <h2 id="exit-survey-title" className="text-lg md:text-xl font-medium text-on-surface font-headline tracking-tight">Before you go...</h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
                aria-label="Close survey"
              >
                <span className="material-symbols-outlined text-on-surface text-lg" aria-hidden="true">close</span>
              </button>
            </div>

            <div className="space-y-2.5">
               <p className="text-on-surface/90 font-body leading-tight text-xs md:text-sm">
                  I’d love to understand what stopped you from booking. What’s the main reason you didn’t continue?
               </p>

               <div className="space-y-0.5">
                  {EXIT_REASONS.map((reason, idx) => (
                      <label key={idx} className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-surface-bright transition-colors cursor-pointer border border-transparent hover:border-outline/10">
                          <div className="flex items-center h-4 md:h-5">
                              <input
                                  type="radio"
                                  name="exit_reason"
                                  value={reason}
                                  checked={selectedReason === reason}
                                  onChange={() => setSelectedReason(reason)}
                                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent bg-surface-bright border-outline/30 focus:ring-accent focus:ring-2 mt-0.5"
                              />
                          </div>
                          <div className="flex flex-col">
                              <span className="text-xs md:text-sm text-on-surface/80">{reason}</span>
                              {reason === "Unclear pricing" && (
                                  <span className="text-[10px] md:text-[11px] text-on-surface/50 mt-0.5 leading-tight pr-2">
                                      (This is a donation-based service. You can donate anything after the session or choose not to.)
                                  </span>
                              )}
                          </div>
                      </label>
                  ))}
               </div>

               <div className="flex flex-col gap-1.5 pt-1.5">
                   <button
                      onClick={handleSurveySubmit}
                      disabled={!selectedReason || isSubmitting}
                      className={`flex items-center justify-center w-full py-2 rounded-full font-medium uppercase transition-all text-[11px] tracking-wider md:text-xs md:tracking-[0.1em] ${
                          !selectedReason || isSubmitting
                          ? 'bg-surface-bright text-on-surface/40 cursor-not-allowed'
                          : 'bg-on-surface text-white hover:bg-on-surface/90 active:scale-[0.98] shadow-sm'
                      }`}
                   >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                   </button>
                   <button
                      onClick={handleBooked}
                      className="flex items-center justify-center w-full py-2 text-on-surface/60 font-medium uppercase transition-all hover:text-on-surface hover:bg-surface-bright rounded-full active:scale-[0.98] text-[11px] tracking-wider md:text-xs md:tracking-[0.1em]"
                   >
                      I have booked
                   </button>
               </div>
            </div>
          </>
        ) : (
           <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
              <p className="text-on-surface font-medium text-lg">Thank you for your feedback!</p>
           </div>
        )}
      </div>
    </BaseModal>
  );
};

export default BookConsultationModal;