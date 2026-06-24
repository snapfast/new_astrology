'use client';

import React from 'react';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import PageHeader from './PageHeader';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Vedic Astrology Services",
    subtitle: "Spiritual Guidance",
    description: "Professional consultations grounded in the ancient principles of Jyotish Shastra, providing clarity on your life's unique karmic path."
  },
  hi: {
    title: "वैदिक ज्योतिष सेवाएं",
    subtitle: "आध्यात्मिक मार्गदर्शन",
    description: "ज्योतिष शास्त्र के प्राचीन सिद्धांतों पर आधारित पेशेवर परामर्श, जो आपके जीवन के अनूठे कर्म पथ पर स्पष्टता प्रदान करते हैं।",
    bookBtn: "परामर्श बुक करें"
  },
  en: {
    title: "Vedic Astrology Services",
    subtitle: "Spiritual Guidance",
    description: "Professional consultations grounded in the ancient principles of Jyotish Shastra, providing clarity on your life's unique karmic path.",
    bookBtn: "Book Consultation"
  }
};

export default function ServicesContent() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <>
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
      />

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {SPECIALIZED_SERVICES.map((service) => (
              <div key={service.id} className="flex flex-col gap-4">
                <div className="space-y-4">
                  <h3 className="text-xl font-normal font-headline text-on-surface tracking-tight flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {service.title[lang]}
                  </h3>
                  <p className="text-sm font-body text-on-surface leading-relaxed pl-4.5 border-l border-outline/30">
                    {service.description[lang]}
                  </p>
                </div>
                <div className="pl-4.5">
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('openBookingModal'));
                    }}
                    className={`inline-flex items-center justify-center px-6 py-3 border border-accent/30 text-accent rounded-full font-medium uppercase font-label transition-all active:scale-95 hover:bg-accent hover:text-white group ${
                      lang === 'hi' ? 'text-[13px]' : 'text-[10px] tracking-[0.15em]'
                    }`}
                  >
                    {t.bookBtn}
                    <span className="material-symbols-outlined text-sm ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer Mantra */}
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center border-t border-outline/20 pt-12">
          <p className="text-lg md:text-2xl text-accent font-hindi">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </p>
        </div>
      </section>
    </>
  );
}
