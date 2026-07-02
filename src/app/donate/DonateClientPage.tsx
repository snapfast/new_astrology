'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const TRANSLATIONS = {
  en: {
    title: "Support My Work",
    subtitle: "CONTRIBUTIONS & DONATIONS",
    description: "Your contributions help maintain this platform and keep classical Vedic Astrology tools free for everyone. If you find my guidance or tools helpful, please consider making a donation.",
    upiTitle: "Scan to Pay (UPI)",
    upiIdLabel: "UPI ID",
    upiId: "rahul.bali@ybl",
    paypalTitle: "PayPal Payment",
    paypalEmail: "rahulbaliastrology@gmail.com",
    paypalEmailLabel: "PayPal Email",
    emailTitle: "Email for Payment Issues",
    motto: "Guided by the stars, Grounded in Truth",
    copied: "Copied!",
    donationText: "Suggested donation amounts:",
    price1: "₹1100",
    price2: "₹2100",
    price3: "₹5100",
    backHome: "Back to Home"
  }
};

const CopyableField: FC<{ value: string; label: string; copiedLabel: string }> = ({ value, label, copiedLabel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      sendGAEvent({ event: 'action_click', action_name: 'donate_field_copy', field: label });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[320px]">
      <span className="text-on-surface/40 font-label uppercase text-[9px] tracking-widest">
        {label}
      </span>
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-between px-4 py-3 bg-surface-bright border border-outline/10 rounded-xl hover:border-primary/30 transition-all text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <span className="text-sm md:text-base font-body text-on-surface font-medium mr-2">
            {value}
          </span>
          <div className="flex items-center shrink-0">
             <span className="material-symbols-outlined text-on-surface/40 group-hover:text-primary transition-colors text-lg">
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

const DonateClientPage: FC = () => {
  const t = TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-on-surface border border-outline/60 rounded-full font-medium uppercase font-label transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 text-[10px] md:text-xs tracking-[0.1em]"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          {t.backHome}
        </Link>
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Donation Denominations */}
        <div className="mb-16 bg-accent/5 p-6 md:p-10 rounded-[2.5rem] border border-accent/20 text-center">
          <p className="text-on-surface/90 font-body mb-6 text-base md:text-lg">{t.donationText}</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <span className="text-2xl md:text-4xl text-on-surface font-headline font-semibold tabular-nums whitespace-nowrap font-hindi tracking-tight">{t.price1}</span>
            <span className="text-2xl md:text-4xl text-on-surface font-headline font-semibold tabular-nums whitespace-nowrap font-hindi tracking-tight">{t.price2}</span>
            <span className="text-2xl md:text-4xl text-on-surface font-headline font-semibold tabular-nums whitespace-nowrap font-hindi tracking-tight">{t.price3}</span>
          </div>
        </div>

        <div className="space-y-16 md:space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* UPI Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              <div className="space-y-3">
                <h4 className="font-medium text-on-surface font-headline text-2xl md:text-3xl">{t.upiTitle}</h4>
              </div>
              <div className="relative w-[392px] h-[392px] md:w-[560px] md:h-[560px] bg-white rounded-[3rem] p-6 shadow-sm border border-outline/10 overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/donate-qr.png"
                    alt="UPI QR Code"
                    fill
                    className="object-contain p-6 scale-125"
                    priority
                    sizes="(max-width: 768px) 392px, 560px"
                  />
                </div>
              </div>
              <CopyableField
                value={t.upiId}
                label={t.upiIdLabel}
                copiedLabel={t.copied}
              />
            </div>

            {/* PayPal Section */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              <div className="space-y-3">
                <h4 className="font-medium text-on-surface font-headline text-2xl md:text-3xl">{t.paypalTitle}</h4>
              </div>
              <div className="relative w-56 h-56 md:w-80 md:h-80 bg-white rounded-[3rem] p-6 shadow-sm border border-outline/10 overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/paypal-logo.svg"
                    alt="PayPal"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 224px, 320px"
                  />
                </div>
              </div>
              <CopyableField
                value={t.paypalEmail}
                label={t.paypalEmailLabel}
                copiedLabel={t.copied}
              />
            </div>
          </div>

          <div className="pt-12 border-t border-outline/10 text-center lg:text-left">
            <a
              href="mailto:rahulbaliastrology@gmail.com"
              className="inline-flex items-center gap-4 text-on-surface/70 hover:text-primary transition-colors font-body text-base md:text-lg group"
            >
              <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center border border-outline/10 group-hover:border-primary/20 transition-colors">
                <span className="material-symbols-outlined text-xl">mail</span>
              </div>
              <span>{t.emailTitle}: <span className="text-on-surface font-medium">rahulbaliastrology@gmail.com</span></span>
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-outline/10 text-center">
          <p className="text-on-surface/40 font-label uppercase text-[10px] md:text-xs tracking-[0.3em]">
            {t.motto}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default DonateClientPage;
