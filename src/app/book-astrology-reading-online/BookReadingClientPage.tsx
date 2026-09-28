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
    subtitle: "Online Astrology Consultation",
    description: (
      <div className="font-body">
        Structured Vedic Astrology (Jyotish) consultations, birth chart analysis, and practical life remedies for domestic and international clients.
      </div>
    ),
    whatToExpect: {
      tag: "Consultation Structure",
      title: "What to Expect",
      intro: "Consultations are conducted as 1-hour direct live sessions structured around your specific requirements:",
      sessionTitle: "1 Hour Consultation",
      sessionDesc: "Designed for birth chart examination, pressing questions, horary analysis (Praśna), auspicious timing (Muhurta), or compatibility assessment.",
      partsTitle: "Three Core Stages of a Session",
      partsDesc: "Each session covers three primary analytical areas:",
      parts: [
        {
          num: "1",
          title: "Birth Chart Rectification",
          desc: "Verification and precise alignment of birth time details."
        },
        {
          num: "2",
          title: "Assessment of Karmas & Remedies",
          desc: "Evaluation of planetary influences, root causes, and practical mantric or spiritual remedies."
        },
        {
          num: "3",
          title: "Current & Upcoming Predictions",
          desc: "Analysis of present and future planetary periods (Daśā) with clear answers to specific questions."
        }
      ],
      knowledgeNote: "No prior knowledge of astrology is required. For clients with an astrological background, screen-recording of chart calculations can be provided upon request."
    },
    technicalMethod: {
      tag: "Analytical Approach",
      title: "Technical Calculations & Methodology",
      pointsIntro: "Consultations are prepared through systematic examination of fundamental Vedic parameters:",
      points: [
        "Panchanga (including Nakṣatras and Tithis)",
        "Kāraka & Aprakasha / Upagrahas",
        "Rāśi, Bhāva & Ārūḍha (divisional placements)",
        "Varnada & Varga (divisional charts)",
        "Bala (planetary strength) & Daśā (timing systems)"
      ],
      details: [
        "Calculations strictly adhere to Chitra Pakṣa Ayanamsha.",
        "Charts are computed using standard astronomical software (Jagannath Hora).",
        "Analysis follows traditional Parashari principles, excluding KP and Bhava Chalit methods.",
        "Technical findings serve as the analytical foundation and are summarized clearly during the call."
      ]
    },
    howToBook: {
      tag: "Process & Timing",
      title: "How to Schedule Your Reading",
      steps: [
        { label: "Payment", desc: "Remit booking charge of ₹701/- via UPI (rahul.bali@ybl) or PayPal (rahulbaliastrology@gmail.com)." },
        { label: "Confirmation", desc: "Email payment screenshot to rahulbaliastrology@gmail.com." },
        { label: "Scheduling", desc: "Select a suitable time slot on Calendly (supports automatic global time zone conversion)." },
        { label: "Details", desc: "Provide birth details (date, time, location) and primary questions during booking." }
      ],
      prepSteps: [
        { label: "Questions", desc: "Note down key questions or focus areas in advance." },
        { label: "Environment", desc: "Choose a quiet space with a stable phone or internet connection." },
        { label: "Notes", desc: "Keep note-taking materials ready for remedies and timing insights." },
        { label: "Punctuality", desc: "Join on time to receive full allocated session duration." }
      ]
    },
    conductMedium: {
      tag: "Channels & Notes",
      title: "Consultation Medium",
      desc: "Sessions are available worldwide via:",
      options: [
        "Direct Phone Call (for clients in India)",
        "HD Video Call via Zoom or Google Meet (for international clients)"
      ],
      recordingPolicy: "Sessions are conducted live and are not recorded by default. Clients are welcome to take personal notes during the reading."
    },
    policy: {
      tag: "Guidelines & Policies",
      title: "Scheduling & Rescheduling Policy",
      reminders: "Automated email confirmations and calendar reminders are sent upon scheduling.",
      notice: "24-Hour Notice: Please provide at least 24 hours advance notice for any rescheduling request.",
      courtesyNotice: "Rescheduling: Timely notice permits open slots to be offered to waiting clients.",
      doubleMissed: "Missed Sessions: If a session is missed, a new time slot can be selected on Calendly.",
      contact: "For booking inquiries, email: rahulbaliastrology@gmail.com"
    },
    paymentDetailsTitle: "Booking Charge Payment (₹701/-)",
    upiLabel: "UPI (India):",
    upiId: "rahul.bali@ybl",
    paypalLabel: "PayPal (International):",
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
              Professional Consultation
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Personalised Birth Chart Reading
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm font-body text-on-surface/80">
              <span className="whitespace-nowrap">In-depth birth chart analysis</span>
              <span className="hidden sm:inline text-on-surface/40">•</span>
              <span className="whitespace-nowrap">Global appointment scheduling</span>
              <span className="hidden sm:inline text-on-surface/40">•</span>
              <span className="text-center">Practical remedies based on authentic Vedic principles</span>
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
              Instant calendar confirmation with automatic time zone adjustment
            </p>
          </div>
        </section>

        {/* How to Schedule & Prepare */}
        <section id="how-to-book" className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              {t.howToBook.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.howToBook.title}
            </h2>
          </div>

          <ol className="space-y-3">
            {t.howToBook.steps.map((step, idx) => (
              <li key={idx} className="bg-surface-bright rounded-2xl p-4 border border-outline/10 flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-surface border border-outline/20 flex items-center justify-center font-headline text-xs text-secondary font-semibold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="text-sm md:text-base font-body text-on-surface/90 leading-relaxed">
                  <span className="text-secondary font-semibold mr-1.5">{step.label}:</span>
                  {step.desc}
                </div>
              </li>
            ))}
          </ol>

          <div className="pt-4 border-t border-outline/10 space-y-4">
            <h3 className="text-lg font-medium font-headline text-on-surface">
              Preparing for Your Session
            </h3>
            <ol className="space-y-3">
              {t.howToBook.prepSteps.map((step, idx) => (
                <li key={idx} className="bg-surface-bright rounded-2xl p-4 border border-outline/10 flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-surface border border-outline/20 flex items-center justify-center font-headline text-xs text-secondary font-semibold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="text-sm md:text-base font-body text-on-surface/90 leading-relaxed">
                    <span className="text-secondary font-semibold mr-1.5">{step.label}:</span>
                    {step.desc}
                  </div>
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

          <div className="pt-1">
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

            <ol className="space-y-3">
              {t.whatToExpect.parts.map((part) => (
                <li key={part.num} className="flex items-start gap-4 p-4 bg-surface-bright rounded-2xl border border-outline/10">
                  <span className="w-7 h-7 rounded-full bg-surface border border-outline/20 flex items-center justify-center font-headline text-xs text-secondary font-semibold shrink-0 mt-0.5">
                    {part.num}
                  </span>
                  <div className="space-y-0.5">
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
                Notice Period
              </h3>
              <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                {t.policy.notice}
              </p>
            </div>

            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-sm font-medium font-headline text-on-surface">
                Courtesy Rescheduling
              </h3>
              <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                {t.policy.courtesyNotice}
              </p>
            </div>

            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-sm font-medium font-headline text-on-surface">
                Missed Sessions
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
              Direct Transfer
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.paymentDetailsTitle}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
              Booking charge is ₹701/- per session. You can complete payment via UPI (India) or PayPal (International) using the details below:
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
              Appointment Scheduling
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Schedule Your Reading
            </h2>
            <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
              Use the Schedule button below to reserve your appointment on Calendly.
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
              Instant calendar confirmation with automatic time zone adjustment
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
};

export default BookReadingClientPage;
