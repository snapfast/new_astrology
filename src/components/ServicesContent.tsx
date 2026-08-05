'use client';

import React from 'react';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import PageHeader from './PageHeader';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Sacred Vedic Astrology Services",
    subtitle: "Authoritative Spiritual Guidance",
    description: "Esteemed professional consultations deeply grounded in the ancient Brahmin principles of Jyotish Shastra, providing profound clarity on your life's unique karmic path."
  }};

export default function ServicesContent() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

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
              <div key={service.id} className="group space-y-4 p-4 -mx-4 rounded-xl border border-transparent hover:bg-accent/5 hover:border-accent/20 transition-all duration-300">
                <h3 className="text-xl font-normal font-headline text-on-surface group-hover:text-accent transition-colors tracking-tight flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  {service.title[lang]}
                </h3>
                <p className="text-sm font-body text-on-surface leading-relaxed pl-4.5 border-l border-outline/30 group-hover:border-accent/50 transition-colors">
                  {service.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer Mantra */}
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center border-t border-outline/20 pt-12">
          <p className="text-lg md:text-2xl text-accent font-hindi">
            ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
          </p>
        </div>
      </section>
    </>
  );
}
