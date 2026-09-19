'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ScheduleButton from '@/components/ScheduleButton';
import { sendGAEvent } from '@next/third-parties/google';

const TRANSLATIONS = {
  en: {
    title: "Booking Online",
    subtitle: "Personalised Guidance",
    description: (
      <div className="font-body">
        Comprehensive Vedic Astrology (Jyotish) consultations, birth chart analysis, and practical life remedies.
      </div>
    ),
    aboutPractice: {
      tag: "Professional Practice",
      title: "About the Practice",
      desc1: "Practising as a professional astrologer since 2004, Pandit Rahul Bali sees clients on a daily basis.",
      desc2: "Services involve the ascertainment and correction of life problems based on the principles of Vedic Astrology (Jyotish). Consultations utilise precise birth details to provide insightful advice and remedial measures tailored to your life situation."
    },
    whatToExpect: {
      tag: "Consultation Formats",
      title: "What to Expect",
      intro: "Consultations are available based on the amount of time required for your situation:",
      shortTitle: "Short Consultations (< 60 Minutes)",
      shortDesc: "Recommended for follow-up consultations, short-question sessions, horary (Praśna), day-selection (Muhurta), and matching of charts (business and personal).",
      fullTitle: "Full Consultations (60+ Minutes)",
      fullDesc: "Recommended for all new clients to allow sufficient time for a thorough birth chart examination and karmic analysis.",
      partsTitle: "Three Core Parts of a Consultation",
      partsDesc: "Consultations largely involve three parts, which can be adjusted at the behest of the client:",
      parts: [
        {
          num: "1",
          title: "Birth Chart Rectification",
          desc: "Verification and micro-tuning of birth timing (a limited version is performed for short sessions less than 60 minutes)."
        },
        {
          num: "2",
          title: "Assessment of Karmas & Remedies",
          desc: "In-depth examination of karmic influences, their effects, root causes, and mantric or similar spiritual remedies (available for sessions of 60 minutes or more)."
        },
        {
          num: "3",
          title: "Current & Near-Future Predictions",
          desc: "Detailed assessment of present and upcoming planetary periods, alongside clear answers to your specific questions."
        }
      ],
      knowledgeNote: "No prior knowledge of astrology is necessary to have a consultation. Should you have prior astrological knowledge, Pandit Rahul Bali will offer to video-record his chart screen and mouse movements during the session for you."
    },
    technicalMethod: {
      tag: "Analytical Approach",
      title: "Technical Calculations & Methodology",
      pointsIntro: "Pandit Rahul Bali prepares for each consultation by thoroughly examining the following points:",
      points: [
        "Panchanga (including Nakṣatras)",
        "Kāraka & Aprakasha / Upagrahas",
        "Rāśi, Bhāva & Ārūḍha (several)",
        "Varnada & Varga (necessary divisional charts)",
        "Bala (several strengths) & Daśā (several timing systems)"
      ],
      details: [
        "Calculations strictly use Chitra Pakṣa Ayanamsha.",
        "Draws and calculates charts using the software Jagannath Hora.",
        "Does not rely on the Kṛṣṇamūrti Paddhati (KP) system nor on the Bhava Chalit Chakra.",
        "For brevity and focus, results of all technical principles may not be explicitly mentioned unless directly relevant to your questions."
      ]
    },
    howToBook: {
      tag: "Process & Timing",
      title: "How to Schedule Your Reading",
      steps: [
        "Select your preferred date and time slot using the Schedule button below",
        "Provide your precise birth details and key questions during scheduling",
        "Upon receiving your request and contribution reference, expect 10–12 days processing time before your scheduled session",
        "Support our work with a voluntary contribution on our Donate page and leave a review"
      ],
      prepSteps: [
        "Keep a notebook and pen ready to write down key dates, planetary remedies, and personal insights",
        "List your primary concerns and questions in advance to ensure all pressing topics are covered",
        "Choose a quiet, distraction-free space with a clear connection for your call",
        "Arrive on time so that you receive the full allocated duration for your appointment"
      ]
    },
    conductMedium: {
      tag: "Channels & Notes",
      title: "How the Reading is Conducted",
      desc: "Readings can be conducted through:",
      options: [
        "Phone Call (await your phone number and meeting details after scheduling)",
        "Zoom (www.zoom.us) or Google Meet"
      ],
      recordingPolicy: "All readings whether over Phone, Zoom, or Google Meet are not recorded by default. You are welcome to take notes and write down predictions and remedies. (Video recording of chart screen & mouse movements is offered for clients with prior astrological knowledge)."
    },
    policy: {
      tag: "Guidelines & Policies",
      title: "No Show & Cancellation Policy",
      reminders: "As a courtesy, to help you remember scheduled appointments, email reminders are sent in advance of your appointment time.",
      notice: "24-Hour Notice: If your schedule changes and you cannot keep your appointment, please contact us with at least 24-hour notice so we may reschedule you and accommodate waiting clients.",
      feeCharge: "Reimbursement Charge: If you do not cancel or reschedule your appointment with at least 24 hours notice, a EUR 50 € reimbursement charge for lost time is expected before rescheduling your consultation.",
      doubleMissed: "Double Missed Sessions: If your consultation session is missed twice, your fee will not be refunded, and you are welcome to book a new consultation and remit a new fee.",
      contact: "If you do not receive scheduling notice within 14 days, please contact: rahulbaliastrology@gmail.com"
    },
    paymentDetailsTitle: "Voluntary Contributions & Support",
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8 md:space-y-10">

        {/* Schedule Call-to-Action Card */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between relative transition-all text-center">
          <div className="space-y-4">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              Schedule A Consultation
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Personalised Birth Chart Reading
            </h2>
            <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
              In-depth guidance, detailed chart analysis, and practical spiritual remedies based on authentic Vedic Astrology principles.
            </p>
            <p className="text-xs md:text-sm text-on-surface/70 font-body pt-1">
              All consultations operate on a voluntary contribution basis.{' '}
              <Link
                href="/donate"
                className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
                onClick={() => sendGAEvent({ event: 'action_click', action_name: 'reading_page_donate_link' })}
              >
                View Donate page <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </p>
          </div>

          <div className="pt-6 text-center space-y-3 flex flex-col items-center">
            <ScheduleButton
              href={t.calendlyUrl}
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'calendly_reading_page_click' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-medium font-label transition-all active:scale-95 hover:bg-primary/90 shadow-lg shadow-primary/10 text-xs md:text-sm tracking-wider"
            >
              {t.scheduleBtnText}
            </ScheduleButton>
            <p className="text-xs font-body text-on-surface/60">
              Generates instant calendar confirmation
            </p>
          </div>
        </section>

        {/* About the Practice */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              {t.aboutPractice.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.aboutPractice.title}
            </h2>
          </div>
          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            {t.aboutPractice.desc1}
          </p>
          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            {t.aboutPractice.desc2}
          </p>
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

          <div className="space-y-4 pt-2">
            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-base font-medium font-headline text-on-surface">
                {t.whatToExpect.shortTitle}
              </h3>
              <p className="text-sm font-body text-on-surface/80 leading-relaxed">
                {t.whatToExpect.shortDesc}
              </p>
            </div>

            <div className="p-4 bg-surface-bright rounded-2xl border border-outline/10 space-y-1">
              <h3 className="text-base font-medium font-headline text-on-surface">
                {t.whatToExpect.fullTitle}
              </h3>
              <p className="text-sm font-body text-on-surface/80 leading-relaxed">
                {t.whatToExpect.fullDesc}
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

          <ol className="space-y-4">
            {t.howToBook.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-surface-bright border border-outline/20 flex items-center justify-center font-headline text-sm text-accent font-medium shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm md:text-base font-body text-on-surface/90 leading-relaxed pt-1">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="pt-6 border-t border-outline/10 space-y-4">
            <h3 className="text-lg font-medium font-headline text-on-surface">
              Preparing for Your Session
            </h3>
            <ol className="space-y-4">
              {t.howToBook.prepSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-surface-bright border border-outline/20 flex items-center justify-center font-headline text-sm text-accent font-medium shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-sm md:text-base font-body text-on-surface/90 leading-relaxed pt-1">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
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
                Reimbursement Charge
              </h3>
              <p className="text-xs md:text-sm font-body text-on-surface/80 leading-relaxed">
                {t.policy.feeCharge}
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

        {/* Schedule Call-to-Action Bottom Card */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-medium text-accent font-label tracking-wider block">
              Ready to Begin
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Schedule Your Session
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
          </div>
        </section>

        {/* Payment / Voluntary Support Details Card */}
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
              We offer guidance on a voluntary donation basis. You can choose to contribute before or after your consultation session.
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
            <div className="pt-2">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-surface-bright border border-outline/20 rounded-xl hover:border-primary/30 text-on-surface text-xs md:text-sm font-medium font-label tracking-wider transition-all"
                onClick={() => sendGAEvent({ event: 'action_click', action_name: 'reading_page_donate_button' })}
              >
                <span>Go to Donate Page (QR & Options)</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
};

export default BookReadingClientPage;
