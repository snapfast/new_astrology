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
        Focused chart insights.
      </div>
    ),
    tier: {
      id: "birth-chart-reading",
      title: "Personalised Birth Chart Reading",
      priceTag: "Donation Based",
      description: "In-depth guidance and detailed insights tailored to your birth chart with practical remedies during your consultation call.",
    },
    howToBookTitle: "How to book",
    steps: [
      "Select your preferred date and time slot using Calendly",
      "Provide your birth details and questions during scheduling",
      "Support our work with a voluntary contribution on our Donate page and leave a review"
    ],
    prepSteps: [
      "Keep a notebook and pen ready to write down key dates, planetary remedies, and personal insights",
      "List your primary concerns and questions in advance to ensure all pressing topics are covered",
      "Choose a quiet, distraction-free space with a stable internet connection for clear communication",
      "Take a few moments before the call to relax and approach the reading with an open, calm mindset"
    ],
    paymentDetailsTitle: "Voluntary Contributions & Support",
    upiLabel: "UPI:",
    upiId: "rahul.bali@ybl",
    paypalLabel: "PayPal (for international clients):",
    paypalEmail: "rahulbaliastrology@gmail.com",
    nextTitle: "What Happens Next",
    nextDesc1: "Once you schedule your slot, you will receive an instant Google Meet invitation. Your consultation will be provided during your scheduled timeframe.",
    nextDesc2: "Each answer is carefully prepared — based on your chart, your question, and your energy.",
    scheduleBtnText: "Book Your Slot on Calendly",
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
      <span className="text-on-surface/70 font-label uppercase text-[10px] tracking-widest">
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
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50 whitespace-nowrap font-medium font-label uppercase tracking-widest">
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
        {/* Single Reading Package */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between relative transition-all">
          <div className="space-y-4 text-center">
            <h3 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.tier.title}
            </h3>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="inline-flex items-center px-4 py-1.5 bg-surface-bright border border-outline/20 rounded-full text-sm md:text-base font-medium text-on-surface font-body">
                {t.tier.priceTag}
              </span>
              <p className="text-xs md:text-sm text-on-surface/70 font-body">
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
            <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
              {t.tier.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-1 text-xs md:text-sm font-medium font-body text-accent pt-1">
              <span>30-minute 1-on-1 sessions</span>
              <span>Video is optional</span>
            </div>
          </div>

          <div className="pt-8 text-center space-y-3 flex flex-col items-center">
            <ScheduleButton
              href={t.calendlyUrl}
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'calendly_reading_page_click' });
              }}
              className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-full font-medium uppercase font-label transition-all active:scale-95 hover:bg-primary/90 shadow-lg shadow-primary/10 text-xs tracking-[0.2em]"
            >
              {t.scheduleBtnText}
            </ScheduleButton>
            <p className="text-xs font-body text-on-surface/60">
              Generates instant Google Meet confirmation
            </p>
          </div>
        </section>

        {/* How to Book Section */}
        <section id="how-to-book" className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em] block">
              Simple Process
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.howToBookTitle}
            </h2>
          </div>

          <ol className="space-y-4">
            {t.steps.map((step, idx) => (
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
        </section>

        {/* Preparing for Your Session */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em] block">
              Consultation Readiness
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              Preparing for Your Session
            </h2>
          </div>

          <ol className="space-y-4">
            {t.prepSteps.map((step, idx) => (
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
        </section>

        {/* What Happens Next Section */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-4 text-center">
          <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em] block">
            Delivery Details
          </span>
          <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
            {t.nextTitle}
          </h2>
          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            {t.nextDesc1}
          </p>
          <p className="text-sm font-body text-accent font-medium leading-relaxed italic pt-1">
            &ldquo;{t.nextDesc2}&rdquo;
          </p>
        </section>

        {/* Payment Details Card */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em] block">
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
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-surface-bright border border-outline/20 rounded-xl hover:border-primary/30 text-on-surface text-xs md:text-sm font-medium font-label uppercase tracking-wider transition-all"
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
