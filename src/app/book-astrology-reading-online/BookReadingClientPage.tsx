'use client';

import { FC, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ScheduleButton from '@/components/ScheduleButton';
import { sendGAEvent } from '@next/third-parties/google';

const TRANSLATIONS = {
  en: {
    title: "Personalised Birth Chart Reading",
    subtitle: "Online Consultation",
    description: (
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm md:text-base font-body text-on-surface">
        <span className="whitespace-nowrap">In-depth birth chart analysis</span>
        <span className="hidden sm:inline text-on-surface/40">•</span>
        <span className="whitespace-nowrap">Easy online slot booking</span>
        <span className="hidden sm:inline text-on-surface/40">•</span>
        <span className="text-center">Practical remedies based on Vedic Shastra</span>
      </div>
    ),
    whatToExpect: {
      tag: "Session Overview",
      title: "What to Expect in Your Reading",
      intro: "Each session is a 1-hour direct live consultation dedicated entirely to your birth chart and specific life questions:",
      sessionTitle: "1 Hour Consultation",
      sessionDesc: "Suitable for detailed birth chart analysis, pressing career or personal questions, horary analysis (Prashna), auspicious timing (Muhurta), or Kundli matching.",
      partsTitle: "Three Main Parts of the Session",
      partsDesc: "During our conversation, we cover three primary areas:",
      parts: [
        {
          num: "1",
          title: "Birth Time Verification",
          desc: "Checking and confirming your birth details so all calculations are exact."
        },
        {
          num: "2",
          title: "Planetary Analysis & Remedies",
          desc: "Evaluating planetary influences, root causes, and practical mantric or traditional remedies."
        },
        {
          num: "3",
          title: "Active Period & Future Guidance",
          desc: "Examining your current Dasha and transits (Gochar) to answer your specific questions clearly."
        }
      ],
      knowledgeNote: "No prior background in astrology is required. If you study astrology yourself, chart screen-sharing can also be arranged during our call upon request."
    },
    technicalMethod: {
      tag: "Methodology",
      title: "Calculations & Astrological Approach",
      pointsIntro: "Readings are prepared using classical Parashari principles calculated on standard astronomical software (Jagannath Hora):",
      points: [
        "Panchanga analysis (Rashi, Tithi, Nakshatra, and Nakshatra Lords)",
        "Functional Karakas, Upagrahas, and planetary aspects",
        "Rashi chart (D1), Navamsha (D9), and key divisional charts (Vargas)",
        "Planetary strength (Bala) and active Vimshottari Dasha periods",
        "Chitra Paksha (Lahiri) Ayanamsha for precise planetary positions"
      ],
      details: [
        "All calculations strictly follow classical Parashari Jyotish principles.",
        "Analysis excludes KP and Bhava Chalit methods to maintain focus on classical Vedic astrology.",
        "Technical chart details serve as our working foundation and are explained in plain, simple terms during the call."
      ]
    },
    howToBook: {
      items: [
        "Pay ₹701/- via UPI (rahul.bali@ybl) or PayPal (rahulbaliastrology@gmail.com).",
        "Email payment screenshot to rahulbaliastrology@gmail.com.",
        "Pick a convenient slot on Calendly.",
        "Note main focus areas in advance.",
        "Ensure a quiet room and stable connection.",
        "Keep a pen and notebook ready for remedies."
      ]
    },
    conductMedium: {
      tag: "Consultation Mode",
      title: "How the Reading is Conducted",
      desc: "Consultations take place live via:",
      options: [
        "Direct Phone Call (for clients within India)",
        "HD Video Call via Zoom or Google Meet (for international clients)"
      ],
      recordingPolicy: "Sessions are live personal conversations and are not recorded by default. You are welcome to take notes during our call."
    },
    policy: {
      tag: "Rescheduling & Guidelines",
      title: "Rescheduling Policy",
      reminders: "You will receive an instant email confirmation and calendar reminder as soon as you book on Calendly.",
      notice: "24-Hour Notice: If you need to change your slot, please let me know at least 24 hours in advance.",
      courtesyNotice: "Rescheduling: Timely notice allows me to offer the open slot to someone on the waiting list.",
      doubleMissed: "Missed Sessions: If you happen to miss your session, you can pick a new available slot on Calendly.",
      contact: "For booking queries, email: rahulbaliastrology@gmail.com"
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
      >
        <div className="flex flex-col items-center gap-4 mt-2">
          <div className="inline-block bg-surface-bright px-4 py-2 rounded-full border border-outline/20">
            <span className="text-sm md:text-base font-semibold font-headline text-on-surface">
              Booking Charge: ₹701/-
            </span>
          </div>
          <div className="flex flex-col items-center">
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
        </div>
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-8 md:space-y-10">

        {/* How to Schedule & Prepare */}
        <section id="how-to-book" className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-2">
          {t.howToBook.items.map((item, idx) => (
            <p key={idx} className="text-sm md:text-base font-body text-on-surface/90 leading-relaxed">
              {item}
            </p>
          ))}
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
