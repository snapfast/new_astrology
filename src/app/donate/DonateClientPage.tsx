'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

const TRANSLATIONS = {
  en: {
    title: "Donate",
    subtitle: "Contributions",
    description: (
      <div className="font-body">
        If you found our service valuable, we would be deeply grateful for any donation to support our mission, suggested amount <span className="font-hindi">₹701, ₹1100, ₹1200, ₹2100, ₹7100</span>, etc.
      </div>
    ),
    upiTitle: "Scan to Donate (UPI)",
    upiIdLabel: "UPI ID",
    upiId: "rahul.bali@ybl",
    paypalTitle: "PayPal Donation",
    paypalEmail: "rahulbaliastrology@gmail.com",
    paypalEmailLabel: "PayPal Email",
    emailTitle: "Email for Donation Issues",
    motto: "Guided by the stars, Grounded in Truth",
    copied: "Copied!"
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
    <div className="flex flex-col gap-1.5 w-full max-w-[480px]">
      <span className="text-on-surface/70 font-label uppercase text-[9px] tracking-widest">
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

const DonateClientPage: FC = () => {
  const t = TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="space-y-10 md:space-y-12">
          {/* Single Column Layout */}
          <div className="flex flex-col items-center gap-10 md:gap-12 w-full">
            {/* UPI Section */}
            <div className="flex flex-col items-center text-center space-y-4 w-full">
              <h2 className="font-medium text-on-surface font-headline text-2xl md:text-3xl">
                {t.upiTitle}
              </h2>
              <div className="relative w-full max-w-[480px] aspect-square bg-white rounded-3xl p-3 shadow-sm border border-outline/20 overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/donate-qr.png"
                    alt="UPI QR Code"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 100vw, 480px"
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
            <div className="flex flex-col items-center text-center space-y-4 w-full">
              <h2 className="font-medium text-on-surface font-headline text-2xl md:text-3xl">
                {t.paypalTitle}
              </h2>
              <div className="relative w-full max-w-[480px] aspect-square bg-white rounded-3xl p-6 shadow-sm border border-outline/20 overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/paypal-logo.svg"
                    alt="PayPal"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 480px"
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

          <div className="pt-8 border-t border-outline/20 text-center">
            <a
              href="mailto:rahulbaliastrology@gmail.com"
              className="inline-flex items-center gap-3 text-on-surface/70 hover:text-primary transition-colors font-body text-base md:text-lg group"
            >
              <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-outline/20 group-hover:border-primary/20 transition-colors">
                <span className="material-symbols-outlined text-lg">mail</span>
              </div>
              <span>{t.emailTitle}: <span className="text-on-surface font-medium">rahulbaliastrology@gmail.com</span></span>
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-outline/20 text-center">
          <p className="text-on-surface/70 font-label uppercase text-[10px] md:text-xs tracking-[0.3em]">
            {t.motto}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default DonateClientPage;
