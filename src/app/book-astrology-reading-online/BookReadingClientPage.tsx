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
    subtitle: "Personalised Guidance",
    description: (
      <div className="font-body">
        Have a specific question about your life? Get clear, direct answers through a personalised astrology reading based on your birth chart. No generic predictions, only focused insights tailored to you.
      </div>
    ),
    chooseReadingTitle: "Personalised Astrology Reading",
    tier: {
      id: "birth-chart-reading",
      title: "Personalised Birth Chart Reading",
      priceInr: "₹701",
      priceUsd: "$11",
      description: "In-depth guidance and detailed insights tailored to your birth chart with practical remedies. Available as a written report or consultation call.",
    },
    howToBookTitle: "How to book",
    steps: [
      "Complete payment or contribution using UPI or PayPal",
      "Select your preferred date and time slot using Calendly",
      "Provide your birth details and questions during scheduling"
    ],
    paymentDetailsTitle: "Payment & Contributions",
    upiLabel: "UPI:",
    upiId: "rahul.bali@ybl",
    paypalLabel: "PayPal (for international clients):",
    paypalEmail: "rahulbaliastrology@gmail.com",
    nextTitle: "What Happens Next",
    nextDesc1: "Once you schedule your slot, you will receive an instant Google Meet invitation. Your consultation or written analysis will be provided during your scheduled timeframe.",
    nextDesc2: "Each answer is carefully prepared — based on your chart, your question, and your energy.",
    scheduleTitle: "Schedule Your Appointment",
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 md:space-y-24">
        {/* Single Reading Package */}
        <section className="space-y-8 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em]">
              Service Package
            </span>
            <h2 className="text-3xl md:text-4xl font-normal font-headline text-on-surface">
              {t.chooseReadingTitle}
            </h2>
          </div>

          <div className="bg-white border border-outline/20 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-between relative transition-all">
            <div className="space-y-4 text-center">
              <h3 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
                {t.tier.title}
              </h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-3xl md:text-4xl font-semibold text-on-surface font-body">
                  {t.tier.priceInr}
                </span>
                <span className="text-base text-on-surface/60 font-body">
                  ({t.tier.priceUsd})
                </span>
              </div>
              <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed max-w-lg mx-auto">
                {t.tier.description}
              </p>
            </div>

            <div className="pt-8 text-center">
              <button
                onClick={() => {
                  sendGAEvent({ event: 'action_click', action_name: 'tier_select', tier: t.tier.id });
                  scrollToSection('schedule-section');
                }}
                className="w-full sm:w-auto py-4 px-10 bg-primary text-white rounded-full text-xs font-medium uppercase font-label tracking-[0.15em] transition-all active:scale-95 text-center hover:bg-primary/90 shadow-md"
              >
                Select Reading
              </button>
            </div>
          </div>
        </section>

        {/* How to Book & Payment Details Grid */}
        <section id="payment-and-form" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* How to Book Card */}
          <div className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em]">
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
          </div>

          {/* Payment Details Card */}
          <div className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em]">
                Direct Transfer
              </span>
              <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
                {t.paymentDetailsTitle}
              </h2>
            </div>

            <div className="space-y-4">
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
              <p className="text-xs font-body text-on-surface/60 leading-relaxed pt-2">
                For voluntary contributions or payment confirmation, you can use the details above.
              </p>
            </div>
          </div>
        </section>

        {/* What Happens Next Section */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-4 text-center max-w-3xl mx-auto">
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

        {/* Schedule Your Appointment Section (Calendly Link) */}
        <section id="schedule-section" className="bg-white border border-outline/20 rounded-3xl p-8 md:p-12 shadow-sm space-y-6 text-center max-w-3xl mx-auto">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em] block">
              Instant Scheduling
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.scheduleTitle}
            </h2>
          </div>

          <p className="text-sm md:text-base font-body text-on-surface/80 leading-relaxed">
            Pick a date and time that fits your schedule. Your appointment will automatically generate a Google Meet link and confirmation.
          </p>

          <div className="pt-4">
            <ScheduleButton
              href={t.calendlyUrl}
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'calendly_reading_page_click' });
              }}
              className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white rounded-full font-medium uppercase font-label transition-all active:scale-95 hover:bg-primary/90 shadow-lg shadow-primary/10 text-xs tracking-[0.2em]"
            >
              {t.scheduleBtnText}
            </ScheduleButton>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default BookReadingClientPage;
