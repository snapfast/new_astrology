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
    subtitle: "Professional Vedic Astrology Consultations",
    description: (
      <div className="font-body">
        Authoritative Vedic Astrology (Jyotish) consultations, birth chart analysis, and practical remedies tailored for clients across India and international time zones worldwide.
      </div>
    ),
    whatToExpect: {
      tag: "Consultation Structure",
      title: "Consultation Framework & Scope",
      intro: "Consultations are structured as 1-hour direct live consultation sessions, customized to address specific client requirements across personal, professional, and spiritual dimensions:",
      sessionTitle: "1 Hour Consultation",
      sessionDesc: "Designed for comprehensive birth chart evaluation, specific life queries, follow-up assessments, Horary astrology (Praśna), auspicious timing selection (Muhurta), or relationship compatibility analysis.",
      partsTitle: "Three Core Phases of the Consultation",
      partsDesc: "Each session follows a structured technical workflow tailored to individual requirements:",
      parts: [
        {
          num: "1",
          title: "Birth Chart Verification & Rectification",
          desc: "Systematic validation and precision tuning of birth timing data before deep analysis."
        },
        {
          num: "2",
          title: "Assessment of Karmic Patterns & Planetary Remedies",
          desc: "In-depth diagnostic examination of karmic influences, root planetary causes, and practical mantric or Vedic remedies."
        },
        {
          num: "3",
          title: "Current Period Analysis & Strategic Outlook",
          desc: "Detailed evaluation of active and upcoming planetary periods (Dasha & Gochar), providing actionable guidance and answers to specific inquiries."
        }
      ],
      knowledgeNote: "Prior technical knowledge of astrology is not required. For clients possessing background knowledge in astrology, Pandit Rahul Bali can provide a screen-recorded video capturing chart calculations and cursor movements during the session upon request."
    },
    technicalMethod: {
      tag: "Analytical Methodology",
      title: "Technical Calculation Standards & Principles",
      pointsIntro: "Each consultation is prepared utilizing rigorous classical calculation principles:",
      points: [
        "Panchanga analysis (including Nakṣatra, Tithi, Yoga, and Karana)",
        "Kāraka, Aprakasha & Upagraha evaluations",
        "Rāśi, Bhāva & Ārūḍha Pada calculations across relevant houses",
        "Varnada & Varga divisional charts assessment (D1 through D60 as required)",
        "Shadbala, Bhava Bala & multi-tier Daśā timing systems"
      ],
      details: [
        "Calculations strictly adhere to the Chitra Pakṣa (Lahiri) Ayanamsha standard.",
        "Precision astronomical calculations are generated via Jagannath Hora software.",
        "Calculations exclude the Kṛṣṇamūrti Paddhati (KP) system and the Bhava Chalit Chakra, remaining true to classical Parashari principles.",
        "To maintain direct focus on key objectives, technical calculation details are summarized efficiently during discussions unless explicitly requested."
      ]
    },
    howToBook: {
      tag: "Scheduling Procedure",
      title: "Step-by-Step Consultation Booking",
      steps: [
        (
          <>
            Remit the standard booking charge of <span className="text-secondary font-semibold">₹401/-</span> via UPI (<span className="text-secondary font-semibold">rahul.bali@ybl</span>) for domestic India transfers or via PayPal (<span className="text-secondary font-semibold">rahulbaliastrology@gmail.com</span>) for international clients.
          </>
        ),
        (
          <>
            Transmit the payment confirmation receipt or screenshot to <span className="text-secondary font-semibold">rahulbaliastrology@gmail.com</span>.
          </>
        ),
        (
          <>
            Select an appropriate appointment time slot <span className="text-secondary font-semibold">at least 6 days in advance on Calendly</span> via the schedule button.
          </>
        ),
        (
          <>
            Submit precise birth parameters (<span className="text-secondary font-semibold">Date, Exact Time, and City/Country of Birth</span>) along with key consultation topics during scheduling.
          </>
        )
      ],
      prepSteps: [
        (
          <>
            Have a <span className="text-secondary font-semibold">notepad and pen accessible</span> to record key dates, planetary periods, and remedial protocols.
          </>
        ),
        (
          <>
            <span className="text-secondary font-semibold">Prepare a prioritized list of specific questions</span> to maximize the efficiency of your session.
          </>
        ),
        (
          <>
            Ensure a <span className="text-secondary font-semibold">quiet, private environment</span> with a stable internet or cellular connection.
          </>
        ),
        (
          <>
            <span className="text-secondary font-semibold">Join promptly at the scheduled time</span> to utilize the full allotted consultation duration.
          </>
        )
      ]
    },
    conductMedium: {
      tag: "Global Communications",
      title: "Consultation Channels & Recording Protocols",
      desc: "Sessions are accessible worldwide and conducted through the following primary channels:",
      options: [
        "Direct Telecommunication (Outbound calls for domestic and eligible international direct lines)",
        "HD Video Conferencing via Zoom (www.zoom.us) or Google Meet for seamless global connectivity across all time zones"
      ],
      recordingPolicy: "Standard consultations across Telecommunication, Zoom, and Google Meet are not audio-recorded by default to maintain privacy. Clients are encouraged to record notes during the session. (Screen video recording of software chart movements is provided for clients with technical astrological background)."
    },
    policy: {
      tag: "Service Policies",
      title: "Scheduling, Rescheduling & Advisory Policies",
      reminders: "Automated calendar notifications and email confirmation reminders are dispatched prior to each scheduled appointment.",
      notice: "24-Hour Rescheduling Notice: Should a schedule conflict arise, please notify us at least 24 hours prior to your slot to enable rescheduling and accommodate other awaiting clients.",
      courtesyNotice: "Schedule Management: Timely advance notice ensures optimal scheduling efficiency across domestic and international time zones.",
      doubleMissed: "Missed Appointments: In the event of a missed session, clients may select a new available time slot on Calendly at their convenience.",
      contact: "For inquiries regarding consultation schedules or administrative support, contact: rahulbaliastrology@gmail.com"
    },
    paymentDetailsTitle: "Booking Charge Payment Details (₹401/-)",
    upiLabel: "UPI Transfer (Domestic India):",
    upiId: "rahul.bali@ybl",
    paypalLabel: "PayPal Transfer (International / Global Clients):",
    paypalEmail: "rahulbaliastrology@gmail.com",
    scheduleBtnText: "Schedule Consultation on Calendly",
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
              Personalised Vedic Astrology Consultation
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm font-body text-on-surface/80">
              <span className="whitespace-nowrap">Global & Domestic Time Zones</span>
              <span className="hidden sm:inline text-on-surface/40">•</span>
              <span className="whitespace-nowrap">In-Depth Chart Analysis</span>
              <span className="hidden sm:inline text-on-surface/40">•</span>
              <span className="text-center">Authentic Vedic Remedies Based on Classical Parashari Jyotish</span>
            </div>
            <div className="inline-block bg-surface-bright px-4 py-2 rounded-full border border-outline/20">
              <span className="text-sm md:text-base font-semibold font-headline text-on-surface">
                Booking Charge: ₹401/-
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
              Instant calendar scheduling across all global time zones
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

          <div className="pt-6 border-t border-outline/10 space-y-4">
            <h3 className="text-lg md:text-xl font-medium font-headline text-on-surface">
              Session Preparation Protocol
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
                Rescheduling & Cancellation
              </h3>
              <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                {t.policy.notice}
              </p>
            </div>

            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-sm font-medium font-headline text-on-surface">
                Schedule Optimization
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
              Direct Payment Channels
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.paymentDetailsTitle}
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
              The booking charge is ₹401/- per session. Please remit payment using the appropriate channel below prior to confirming your slot on Calendly:
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
              Reservation
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Schedule Your Consultation
            </h2>
            <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
              Select your preferred date and time on Calendly to reserve your appointment.
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
              Instant calendar scheduling across all global time zones
            </p>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
};

export default BookReadingClientPage;
