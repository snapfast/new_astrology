'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Payment Methods",
    upiTitle: "Scan to Pay (UPI)",
    upiIdLabel: "UPI ID",
    upiId: "rahul.bali@ybl",
    paypalTitle: "PayPal Payment",
    paypalEmail: "rahulbaliastrology@gmail.com",
    emailTitle: "Email for Consultations & Payment Issues",
    paypalEmailLabel: "PayPal Email",
    paymentInstructions: "Please send this payment screenshot to rahulbaliastrology@gmail.com before booking the slot.",
    motto: "Guided by the stars, Grounded in Truth",
    copied: "Copied!",
    closeModal: "Close modal"
  },
  hi: {
    title: "भुगतान के तरीके",
    upiTitle: "स्कैन करके भुगतान करें (UPI)",
    upiIdLabel: "UPI आईडी",
    upiId: "rahul.bali@ybl",
    paypalTitle: "पेपाल भुगतान",
    paypalEmail: "rahulbaliastrology@gmail.com",
    emailTitle: "परामर्श और भुगतान संबंधी समस्याओं के लिए ईमेल",
    paypalEmailLabel: "पेपाल ईमेल",
    paymentInstructions: "स्लॉट बुक करने से पहले कृपया इस भुगतान का स्क्रीनशॉट rahulbaliastrology@gmail.com पर भेजें।",
    motto: "सितारों द्वारा निर्देशित, सत्य में निहित",
    copied: "कॉपी हो गया!",
    closeModal: "मोडल बंद करें"
  }
};

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CopyableField: FC<{ value: string; label: string; copiedLabel: string; lang: string }> = ({ value, label, copiedLabel, lang }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      sendGAEvent({ event: 'action_click', action_name: 'payment_field_copy', field: label });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[320px]">
      <span className={`text-on-surface/40 font-label uppercase ${lang === 'hi' ? 'text-[10px]' : 'text-[9px] tracking-widest'}`}>
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
          <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50 whitespace-nowrap font-medium font-label uppercase ${lang === 'hi' ? 'tracking-normal' : 'tracking-widest'}`}>
            {copiedLabel}
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentOptionsModal: FC<PaymentOptionsModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg lg:max-w-4xl"
    >
      <div className="p-3 md:p-10">
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <h2 className="text-xl md:text-5xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'payment_modal_close' });
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
              aria-label={t.closeModal}
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-8 md:space-y-12">
            <div className="bg-on-surface/5 border border-outline/10 rounded-2xl p-4 mb-6">
              <p className={`text-on-surface/90 font-body leading-relaxed ${lang === 'hi' ? 'text-base' : 'text-sm'}`}>
                <span className="material-symbols-outlined align-middle mr-2 text-xl">info</span>
                {t.paymentInstructions}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* UPI Section */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                <div className="space-y-2">
                  <h4 className={`font-medium text-on-surface font-headline ${lang === 'hi' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>{t.upiTitle}</h4>
                </div>
                <div className="relative w-56 h-56 md:w-80 md:h-80 bg-surface-bright rounded-[3rem] p-6 border border-outline/10 shadow-sm overflow-hidden">
                  {/* ⚡ Bolt Optimization: Added sizes attribute to prevent downloading 100vw image, mapping to w-56/w-80 tailwind classes */}
                  <Image
                    src="/donate-qr.png"
                    alt="UPI QR Code"
                    fill
                    className="object-contain p-6"
                    priority
                    sizes="(max-width: 768px) 224px, 320px"
                  />
                </div>
                <CopyableField
                  value={t.upiId}
                  label={t.upiIdLabel}
                  copiedLabel={t.copied}
                  lang={lang}
                />
              </div>

              {/* PayPal Section */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                <div className="space-y-2">
                  <h4 className={`font-medium text-on-surface font-headline ${lang === 'hi' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>{t.paypalTitle}</h4>
                </div>
                <div className="flex flex-col items-center lg:items-start gap-8 w-full">
                  <div className="relative w-56 h-56 md:w-80 md:h-80 bg-surface-bright rounded-[3rem] p-6 border border-outline/10 shadow-sm overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* ⚡ Bolt Optimization: Added sizes attribute to prevent downloading 100vw image, mapping to container boundaries */}
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
                    lang={lang}
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-outline/10">
              <a
                href="mailto:rahulbaliastrology@gmail.com"
                className="inline-flex items-center gap-3 text-on-surface/70 hover:text-primary transition-colors font-body text-sm md:text-base group"
              >
                <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center border border-outline/10 group-hover:border-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </div>
                <span>{t.emailTitle}: <span className="text-on-surface font-medium">rahulbaliastrology@gmail.com</span></span>
              </a>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-outline/10">
            <p className={`text-on-surface/40 font-label uppercase transition-all ${
              lang === 'hi' ? 'text-[10px] md:text-xs tracking-normal' : 'text-[8px] md:text-[10px] tracking-widest'
            }`}>
              {t.motto}
            </p>
          </div>
      </div>
    </BaseModal>
  );
};

export default PaymentOptionsModal;
