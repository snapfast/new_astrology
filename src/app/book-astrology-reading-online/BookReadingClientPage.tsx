'use client';

import { FC, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
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
    chooseReadingTitle: "Choose Your Reading",
    tiers: [
      {
        id: "quick-question",
        title: "Quick Question",
        priceInr: "₹333",
        priceUsd: "$5",
        description: "One clear answer to one specific question.",
        popular: false,
      },
      {
        id: "detailed-reading",
        title: "Detailed Reading",
        priceInr: "₹1111",
        priceUsd: "$15",
        description: "In-depth guidance for one area of life such as career, relationships, or finances.",
        popular: true,
      },
      {
        id: "full-chart-reading",
        title: "Full Birth Chart Reading",
        priceInr: "₹5555",
        priceUsd: "$75",
        description: "Complete life analysis with detailed insights and personalised remedies. Available as a written report or consultation call.",
        popular: false,
      }
    ],
    howToBookTitle: "How to Book",
    steps: [
      "Complete your payment",
      "Fill out the form below with your question and birth details",
      "Upload your payment confirmation"
    ],
    paymentDetailsTitle: "Payment Details",
    upiLabel: "UPI ID",
    upiId: "rahul.bali@ybl",
    paypalLabel: "PayPal (for international clients)",
    paypalEmail: "rahulbaliastrology@gmail.com",
    nextTitle: "What Happens Next",
    nextDesc1: "Once we receive your form and payment, we’ll email or WhatsApp you with a delivery time slot. Your written analysis will be sent within that time frame.",
    nextDesc2: "Each answer is carefully prepared — based on your chart, your question, and your energy.",
    submitTitle: "Submit Your Question",
    copied: "Copied!",
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfHztXCuftDzfMqt6JrPaWTaoMLqLUJ9WesZL4Cuk6EqMURlA/viewform?embedded=true"
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
        {/* Choose Your Reading Tiers */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em]">
              Packages
            </span>
            <h2 className="text-3xl md:text-4xl font-normal font-headline text-on-surface">
              {t.chooseReadingTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {t.tiers.map((tier) => (
              <div
                key={tier.id}
                className={`bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between relative transition-all hover:border-outline/40 ${
                  tier.popular ? 'ring-2 ring-accent/30' : ''
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white font-label uppercase text-[9px] font-medium px-3 py-1 rounded-full tracking-widest shadow-sm">
                    Most Popular
                  </span>
                )}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-normal font-headline text-on-surface">
                    {tier.title}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl md:text-3xl font-semibold text-on-surface font-body">
                      {tier.priceInr}
                    </span>
                    <span className="text-sm text-on-surface/60 font-body">
                      ({tier.priceUsd})
                    </span>
                  </div>
                  <p className="text-sm font-body text-on-surface/80 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => {
                      sendGAEvent({ event: 'action_click', action_name: 'tier_select', tier: tier.id });
                      scrollToSection('payment-and-form');
                    }}
                    className={`w-full py-3.5 px-6 rounded-full text-xs font-medium uppercase font-label tracking-[0.15em] transition-all active:scale-95 text-center ${
                      tier.popular
                        ? 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                        : 'bg-surface-bright border border-outline/20 text-on-surface hover:bg-surface-bright/80'
                    }`}
                  >
                    Select Reading
                  </button>
                </div>
              </div>
            ))}
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
                After you’ve made the payment, fill out the form below with your question and birth details. You’ll also be asked to upload your payment confirmation.
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

        {/* Submit Your Question (Embedded Google Form) Section */}
        <section className="bg-white border border-outline/20 rounded-3xl p-6 md:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-medium uppercase text-accent font-label tracking-[0.3em]">
              Details & Question
            </span>
            <h2 className="text-2xl md:text-3xl font-normal font-headline text-on-surface">
              {t.submitTitle}
            </h2>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full max-w-3xl min-h-[950px] md:min-h-[1100px] border border-outline/10 rounded-2xl overflow-hidden bg-surface-bright">
              <iframe
                src={t.googleFormUrl}
                width="100%"
                height="1100"
                className="w-full border-0 min-h-[950px] md:min-h-[1100px]"
                title="Submit Astrology Question Form"
                loading="lazy"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default BookReadingClientPage;
