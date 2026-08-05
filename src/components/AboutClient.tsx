'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    quote: '"Astrology is a sacred science of light; it is about illuminating the karmic blueprint of your soul through divine wisdom and ancient Brahmin traditions."',
    para1: 'Pandit Rahul Bali Ji is a highly revered Vedic Astrologer based in <strong>Gurugram (Gurgaon)</strong>, specializing in <strong>Jyotish Shastra</strong>, <strong>Parashara</strong>, and <strong>Jaimini</strong> systems. Upholding a prestigious Brahmin heritage, he provides exceptionally precise birth chart analysis and profound spiritual remedies for career, relationships, and health.',
    para2: 'His masterful approach seamlessly unites ancient sacred wisdom with modern clarity, utilizing high-precision <strong>Lahiri Ayanamsa</strong> for every calculation. Every authoritative prediction and remedy is deeply rooted in authentic karmic patterns to empower you with absolute confidence and transformative insights.',
    para3: 'With an esteemed global reach extending from <strong>India</strong> to <strong>Indonesia</strong> and beyond, his unparalleled expertise has guided countless souls toward ultimate clarity. Every shared testimonial reflects genuine, undeniable success. For those seeking absolute certainty, contact details for any reviewer can be provided privately for personal verification.',
    corePrinciples: 'Core Principles',
    values: [
      {
        title: "Authenticity",
        description: "Strictly adhering to traditional Parashara and Jaimini systems without compromise.",
        icon: "verified_user"
      },
      {
        title: "Precision",
        description: "Utilizing high-precision astronomical data (Lahiri Ayanamsa) for every calculation.",
        icon: "track_changes"
      },
      {
        title: "Compassion",
        description: "A patient, non-judgmental approach to understanding modern life challenges.",
        icon: "favorite"
      },
      {
        title: "Clarity",
        description: "Empowering you with actionable insights rather than creating fear or confusion.",
        icon: "lightbulb"
      }
    ]
  }
};

export default function AboutClient() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  return (
    <div className="space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
        {/* Left Column: Condensed Bio (60%) */}
        <div className="lg:col-span-6 space-y-16">
          <div className="prose prose-lg max-w-none font-body text-on-surface leading-relaxed space-y-8">
            <p className="p-6 border-l-4 border-accent bg-accent/5 text-xl text-accent font-medium leading-relaxed italic">
              {t.quote}
            </p>

            <p dangerouslySetInnerHTML={{ __html: t.para1 }} />

            <p dangerouslySetInnerHTML={{ __html: t.para2 }} />

            <p>
              {t.para3}
            </p>

            <p className="text-lg md:text-2xl text-center pt-12 text-accent border-t border-outline/20 font-hindi">
              ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
            </p>
          </div>
        </div>

        {/* Right Column: Core Principles (40%) */}
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-8">
            <h3 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.corePrinciples}</h3>
            <div className="space-y-8">
              {t.values.map((value, idx) => (
                <div key={idx} className="group flex gap-5">
                  <div className="shrink-0 w-10 h-10 bg-accent/5 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-on-accent transition-colors">
                    <span className="material-symbols-outlined text-xl">{value.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface mb-1 uppercase tracking-wider group-hover:text-accent transition-colors">{value.title}</h4>
                    <p className="text-xs text-on-surface leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
