'use client';

import { FC, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ScheduleButton from '@/components/ScheduleButton';
import { sendGAEvent } from '@next/third-parties/google';

const TRANSLATIONS = {
  en: {
    title: "Book Astrology Reading Online",
    subtitle: "Professional Astrological Consultation",
    description: (
      <div className="font-body">
        Structured Vedic Astrology (Jyotish) consultations, birth chart evaluations, and practical remedial assessments.
      </div>
    ),
    whatToExpect: {
      tag: "Consultation Scope",
      title: "Consultation Scope & Format",
      intro: "Consultations are conducted as 1-hour direct live sessions structured around client requirements:",
      sessionTitle: "1 Hour Consultation",
      sessionDesc: "Comprehensive evaluation covering birth chart analysis, specific life inquiries, follow-up reviews, Horary (Praśna), Muhurta selection, or compatibility analysis.",
      partsTitle: "Core Components of the Session",
      partsDesc: "Sessions systematically address three core analytical phases based on client requirements:",
      parts: [
        {
          num: "1",
          title: "Birth Chart Rectification",
          desc: "Verification and precise calculation of birth timing parameters."
        },
        {
          num: "2",
          title: "Karmic Analysis & Remedial Strategy",
          desc: "Analytical review of planetary influences, root causal factors, and structured mantric or spiritual remedies."
        },
        {
          num: "3",
          title: "Dasha Evaluation & Predictive Analysis",
          desc: "Systematic assessment of active and upcoming Dasha periods alongside precise responses to primary queries."
        }
      ],
      knowledgeNote: "Prior knowledge of astrology is not required. For clients possessing technical astrological background, screen video recording of chart software calculations can be provided upon request."
    },
    technicalMethod: {
      tag: "Analytical Approach",
      title: "Technical Calculation & Analytical Methodology",
      pointsIntro: "Each consultation is preceded by rigorous analytical evaluation of the following parameters:",
      points: [
        "Panchanga (including Nakṣatras)",
        "Kāraka & Aprakasha / Upagrahas",
        "Rāśi, Bhāva & Ārūḍha (several)",
        "Varnada & Varga (necessary divisional charts)",
        "Bala (several strengths) & Daśā (several timing systems)"
      ],
      details: [
        "Calculations strictly adhere to the Chitra Pakṣa Ayanamsha.",
        "Chart computations are generated utilizing Jagannath Hora software.",
        "Methodology relies on classical Parasari principles, excluding Kṛṣṇamūrti Paddhati (KP) and Bhava Chalit Chakra.",
        "To maintain efficiency and focus, technical findings are summarized and presented where directly applicable to consultation queries."
      ]
    },
    howToBook: {
      tag: "Process & Timing",
      title: "Consultation Scheduling & Process",
      steps: [
        "Remit booking charge of ₹701/- via UPI (rahul.bali@ybl) or PayPal (rahulbaliastrology@gmail.com)",
        "Transmit payment confirmation screenshot via email to rahulbaliastrology@gmail.com",
        "Select an available appointment slot at least 6 days in advance on Calendly using the scheduling link below",
        "Submit precise birth details and primary consultation queries during scheduling intake"
      ],
      prepSteps: [
        "Maintain notes on key dates, astrological remedies, and strategic insights during the session",
        "Outline primary questions and priority topics prior to the session for focused discussion",
        "Ensure a quiet, distraction-free environment with a stable network connection",
        "Join punctually at the scheduled time to utilize the full session duration"
      ]
    },
    conductMedium: {
      tag: "Communication Channels",
      title: "Consultation Channels & Recording Policy",
      desc: "Consultations are delivered live via:",
      options: [
        "Telecommunication (outbound call initiated using details provided during scheduling)",
        "Video Conference (Zoom or Google Meet)"
      ],
      recordingPolicy: "Sessions across all media channels are confidential and non-recorded by default. Clients are encouraged to take notes during the consultation. (Screen video recording of chart software is optional for clients with technical astrological knowledge)."
    },
    policy: {
      tag: "Administrative Policies",
      title: "Rescheduling & Administrative Policies",
      reminders: "Automated email reminders are dispatched prior to the scheduled appointment time.",
      notice: "24-Hour Notice Requirement: Schedule modifications require a minimum of 24 hours' advance notice to facilitate calendar reallocation.",
      courtesyNotice: "Advance Notification: Timely notice enables calendar adjustment and allocation of open time slots.",
      doubleMissed: "Missed Appointments: In the event of an unexcused absence, clients may schedule an alternative time slot via the online booking portal.",
      contact: "For administrative or scheduling inquiries, contact: rahulbaliastrology@gmail.com"
    },
    paymentDetailsTitle: "Booking Charge Payment (₹701/-)",
    upiLabel: "UPI:",
    upiId: "rahul.bali@ybl",
    paypalLabel: "PayPal (for international clients):",
    paypalEmail: "rahulbaliastrology@gmail.com",
    scheduleBtnText: "Schedule Reading on Calendly",
    copied: "Copied!",
    calendlyUrl: "https://calendly.com/rahulbaliastrology/kundli/"
  }
};

const CopyableField: FC<{ value: string; label: string; copiedLabel: string }> = ({ value, label, copiedLabel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      sendGAEvent({ event: 'action_click', action_name: 'book_reading_field_copy', field: label });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-on-surface/70 font-label text-xs tracking-wider">
        {label}
      </span>
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-between px-4 py-3 bg-surface-bright border border-outline/20 rounded-xl hover:border-primary/30 transition-all text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <span className="text-sm md:text-base font-body text-on-surface font-medium mr-2">
            {value}
          </span>
          <div className="flex items-center shrink-0">
             <span className="material-symbols-outlined text-on-surface/60 group-hover:text-primary transition-colors text-lg">
               {copied ? 'check' : 'content_copy'}
             </span>
          </div>
        </button>
        {copied && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-xs px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50 whitespace-nowrap font-medium font-label tracking-wider">
            {copiedLabel}
          </div>
        )}
      </div>
    </div>
  );
};

const BookReadingClientPage: FC = () => {
  const t = TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8 md:space-y-10">

        {/* Overview Card */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between relative transition-all text-center space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              Astrological Consultation
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Personalised Birth Chart Reading
            </h2>
            <div className="flex flex-col items-center gap-1 text-xs md:text-sm font-body text-on-surface/80 max-w-lg mx-auto">
              <p>• Comprehensive birth chart evaluation</p>
              <p>• Targeted analysis for career, relationships, financial, and personal queries</p>
              <p>• Remedial recommendations grounded in authentic Vedic Astrology principles</p>
            </div>
            <div className="inline-block bg-surface-bright px-4 py-2 rounded-full border border-outline/20">
              <span className="text-sm md:text-base font-semibold font-headline text-on-surface">
                Booking Charge: ₹701/-
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center">
            <ScheduleButton
              href={t.calendlyUrl}
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'calendly_reading_page_top_click' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-medium font-label transition-all active:scale-95 hover:bg-primary/90 shadow-lg shadow-primary/10 text-xs md:text-sm tracking-wider"
            >
              {t.scheduleBtnText}
            </ScheduleButton>
            <p className="text-xs font-body text-on-surface/60 mt-3">
              Provides automated calendar confirmation upon selection
            </p>
          </div>
        </section>

        {/* How to Schedule & Prepare */}
        <section id="how-to-book" className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              {t.howToBook.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.howToBook.title}
            </h2>
          </div>

          <ol className="space-y-2.5">
            {t.howToBook.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-bright border border-outline/20 flex items-center justify-center font-headline text-xs text-accent font-medium shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm md:text-base font-body text-on-surface/90 leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="pt-4 border-t border-outline/10 space-y-2.5">
            <h3 className="text-lg font-medium font-headline text-on-surface">
              Preparing for Your Session
            </h3>
            <ol className="space-y-2.5">
              {t.howToBook.prepSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-surface-bright border border-outline/20 flex items-center justify-center font-headline text-xs text-accent font-medium shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm md:text-base font-body text-on-surface/90 leading-snug">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              {t.whatToExpect.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.whatToExpect.title}
            </h2>
          </div>

          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            {t.whatToExpect.intro}
          </p>

          <div className="pt-2">
            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-base font-medium font-headline text-on-surface">
                {t.whatToExpect.sessionTitle}
              </h3>
              <p className="text-sm font-body text-on-surface/80 leading-relaxed">
                {t.whatToExpect.sessionDesc}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-outline/10">
            <h3 className="text-lg font-medium font-headline text-on-surface">
              {t.whatToExpect.partsTitle}
            </h3>
            <p className="text-sm font-body text-on-surface/80 leading-relaxed">
              {t.whatToExpect.partsDesc}
            </p>

            <ol className="space-y-4">
              {t.whatToExpect.parts.map((part) => (
                <li key={part.num} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-surface-bright border border-outline/20 flex items-center justify-center font-headline text-sm text-accent font-medium shrink-0 mt-0.5">
                    {part.num}
                  </span>
                  <div className="space-y-0.5 pt-0.5">
                    <h4 className="text-sm md:text-base font-medium font-headline text-on-surface">
                      {part.title}
                    </h4>
                    <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                      {part.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-4 border-t border-outline/10">
            <p className="text-xs md:text-sm font-body text-on-surface/80 italic leading-relaxed bg-surface-bright p-4 rounded-2xl border border-outline/10">
              &ldquo;{t.whatToExpect.knowledgeNote}&rdquo;
            </p>
          </div>
        </section>

        {/* Technical Calculations & Methodology */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              {t.technicalMethod.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.technicalMethod.title}
            </h2>
          </div>

          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            {t.technicalMethod.pointsIntro}
          </p>

          <ul className="space-y-2">
            {t.technicalMethod.points.map((pt, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm md:text-base font-body text-on-surface/90">
                <span className="material-symbols-outlined text-accent text-base shrink-0">
                  check_circle
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2 pt-4 border-t border-outline/10">
            {t.technicalMethod.details.map((dt, idx) => (
              <p key={idx} className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                • {dt}
              </p>
            ))}
          </div>
        </section>

        {/* How Reading is Conducted */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              {t.conductMedium.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.conductMedium.title}
            </h2>
          </div>

          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            {t.conductMedium.desc}
          </p>

          <ul className="space-y-2">
            {t.conductMedium.options.map((opt, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm md:text-base font-body text-on-surface/90">
                <span className="material-symbols-outlined text-accent text-base shrink-0">
                  videocam
                </span>
                <span>{opt}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed pt-2 border-t border-outline/10">
            {t.conductMedium.recordingPolicy}
          </p>
        </section>

        {/* Policy & Guidelines */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              {t.policy.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.policy.title}
            </h2>
          </div>

          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            {t.policy.reminders}
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-sm font-medium font-headline text-on-surface">
                Cancellation & Rescheduling
              </h3>
              <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                {t.policy.notice}
              </p>
            </div>

            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-sm font-medium font-headline text-on-surface">
                Courtesy & Rescheduling
              </h3>
              <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                {t.policy.courtesyNotice}
              </p>
            </div>

            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-sm font-medium font-headline text-on-surface">
                Missed Appointments
              </h3>
              <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                {t.policy.doubleMissed}
              </p>
            </div>
          </div>

          <p className="text-xs md:text-sm font-body text-accent font-medium pt-2">
            {t.policy.contact}
          </p>
        </section>

        {/* Payment Details Card */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              Payment Details
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.paymentDetailsTitle}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
              The standard booking charge is ₹701/- per session. Remittance must be completed via UPI or PayPal using the credentials below:
            </p>
            <CopyableField
              value={t.upiId}
              label={t.upiLabel}
              copiedLabel={t.copied}
            />
            <CopyableField
              value={t.paypalEmail}
              label={t.paypalLabel}
              copiedLabel={t.copied}
            />
          </div>
        </section>

        {/* Schedule Call-to-Action Card at end of page */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              Appointment Reservation
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Schedule Your Consultation
            </h2>
            <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
              Select an available appointment time via Calendly using the button below.
            </p>
          </div>

          <div className="pt-2 flex flex-col items-center">
            <ScheduleButton
              href={t.calendlyUrl}
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'calendly_reading_page_bottom_click' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-medium font-label transition-all active:scale-95 hover:bg-primary/90 shadow-lg shadow-primary/10 text-xs md:text-sm tracking-wider"
            >
              {t.scheduleBtnText}
            </ScheduleButton>
            <p className="text-xs font-body text-on-surface/60 mt-3">
              Provides automated calendar confirmation upon selection
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
};

export default BookReadingClientPage;
