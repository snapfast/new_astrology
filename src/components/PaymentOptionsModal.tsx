'use client';

import { FC } from 'react';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import BaseModal from './BaseModal';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Payment Methods",
    upiTitle: "Scan to Pay (UPI)",
    paypalTitle: "PayPal Payment",
    paypalEmail: "rahulbaliastrology@gmail.com",
    emailTitle: "Email for Consultations & Payment Issues",
    motto: "Guided by the stars, Grounded in Truth"
  },
  hi: {
    title: "भुगतान के तरीके",
    upiTitle: "स्कैन करके भुगतान करें (UPI)",
    paypalTitle: "पेपाल भुगतान",
    paypalEmail: "rahulbaliastrology@gmail.com",
    emailTitle: "परामर्श और भुगतान संबंधी समस्याओं के लिए ईमेल",
    motto: "सितारों द्वारा निर्देशित, सत्य में निहित"
  }
};

interface PaymentOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentOptionsModal: FC<PaymentOptionsModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg md:max-w-2xl"
    >
      <div className="p-4 md:p-10">
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-5xl font-normal text-on-surface font-headline tracking-tight">{t.title}</h2>
            <button
              onClick={() => {
                sendGAEvent({ event: 'action_click', action_name: 'payment_modal_close' });
                onClose();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-outline/20 hover:bg-surface-bright transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-on-surface text-xl">close</span>
            </button>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {/* UPI QR */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h4 className={`mb-4 font-medium text-on-surface font-headline ${lang === 'hi' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>{t.upiTitle}</h4>
                <div className="relative w-36 h-36 md:w-44 md:h-44 bg-surface-bright rounded-3xl p-3 border border-outline/10 shadow-sm">
                  <Image
                    src="/donate-qr.png"
                    alt="UPI QR Code"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>

              {/* PayPal */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h4 className={`mb-4 font-medium text-on-surface font-headline ${lang === 'hi' ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>{t.paypalTitle}</h4>
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="relative w-32 h-10 md:w-40 md:h-12 bg-surface-bright rounded-xl border border-outline/10 flex items-center justify-center p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src="/paypal-logo.svg"
                        alt="PayPal"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-sm md:text-base font-body text-on-surface font-medium selection:bg-accent/20">
                    {t.paypalEmail}
                  </p>
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
