'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import { SOCIAL_PROFILES } from '@/lib/social-data';

const TRANSLATIONS = {
  en: {
    para1Part1: 'Pandit Rahul Bali Ji provides practical life guidance through ',
    para1Strong: 'Jyotish Shastra',
    para1Part2: '. His approach combines traditional astrology with psycho-analysis, focusing on understanding deep-rooted thinking patterns and behaviors. By decoding your birth chart, he offers clear, actionable insights to help you navigate your career, relationships, and personal growth.',
    specializedServices: 'Specialized Services',
    email: "Email Address",
    online: "Online Presence",
    stylisedWordmarks: "Stylised Brand Mark Variations",
  }
};

const BALI_STYLES = [
  { id: 1, label: 'Elegant Cursive', svg: '/images/bali-styles/bali-style-1.svg', webp: '/images/bali-styles/bali-style-1.webp' },
  { id: 2, label: 'Modern Editorial', svg: '/images/bali-styles/bali-style-2.svg', webp: '/images/bali-styles/bali-style-2.webp' },
  { id: 3, label: 'Vedic Traditional', svg: '/images/bali-styles/bali-style-3.svg', webp: '/images/bali-styles/bali-style-3.webp' },
  { id: 4, label: 'Artistic Expression', svg: '/images/bali-styles/bali-style-4.svg', webp: '/images/bali-styles/bali-style-4.webp' },
];

export default function AboutClient() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  return (
    <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
      {/* Practitioner Bio & Mantra Block */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 text-center space-y-8">
        <div className="prose prose-lg max-w-2xl mx-auto font-body text-on-surface leading-relaxed">
          <p className="text-base md:text-lg text-on-surface/90">
            {t.para1Part1}
            <strong className="text-on-surface font-semibold">{t.para1Strong}</strong>
            {t.para1Part2}
          </p>
        </div>
        <div className="pt-6 border-t border-outline/10 text-xl md:text-2xl text-accent font-hindi tracking-wide">
          ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
        </div>
      </div>

      {/* Specialized Services Grid Card */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 space-y-8">
        <div className="text-center">
          <h3 className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-accent font-label ${lang === 'en' ? 'tracking-[0.25em]' : ''}`}>
            {t.specializedServices}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {SPECIALIZED_SERVICES.map((service) => (
            <div
              key={service.id}
              className="p-3.5 rounded-2xl bg-surface-bright border border-outline/15 text-sm font-medium text-on-surface flex items-center justify-center text-center transition-all hover:border-accent/40 hover:bg-surface"
            >
              {service.title[lang]}
            </div>
          ))}
        </div>
      </div>

      {/* Email & Social Links Card */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 text-center space-y-10">
        <div className="space-y-3">
          <h3 className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-accent font-label ${lang === 'en' ? 'tracking-[0.25em]' : ''}`}>
            {t.email}
          </h3>
          <a
            href="mailto:rahulbaliastrology@gmail.com"
            className="text-xl md:text-2xl font-body font-medium text-on-surface hover:text-accent transition-colors inline-block"
          >
            rahulbaliastrology@gmail.com
          </a>
        </div>

        <div className="space-y-6 pt-8 border-t border-outline/10">
          <h3 className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-accent font-label ${lang === 'en' ? 'tracking-[0.25em]' : ''}`}>
            {t.online}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href={SOCIAL_PROFILES.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white transition-all duration-300 text-2xl shadow-sm"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all duration-300 text-2xl shadow-sm"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#000000] hover:bg-[#000000] hover:border-[#000000] hover:text-white transition-all duration-300 text-2xl shadow-sm"
              aria-label="Threads"
            >
              <i className="fa-brands fa-threads"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 text-2xl shadow-sm"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 text-2xl shadow-sm"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.tumblr}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#36465D] hover:bg-[#36465D] hover:border-[#36465D] hover:text-white transition-all duration-300 text-2xl shadow-sm"
              aria-label="Tumblr"
            >
              <i className="fa-brands fa-tumblr"></i>
            </a>
            <a
              href={SOCIAL_PROFILES.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#FF4500] hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white transition-all duration-300 text-2xl shadow-sm"
              aria-label="Reddit"
            >
              <i className="fa-brands fa-reddit-alien"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Stylised Brand Mark Variations Gallery */}
      <div className="space-y-8 text-center">
        <h3 className={`text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-accent font-label ${lang === 'en' ? 'tracking-[0.25em]' : ''}`}>
          {t.stylisedWordmarks}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {BALI_STYLES.map((style) => (
            <div
              key={style.id}
              className="p-4 rounded-3xl bg-surface-bright border border-outline/20 shadow-sm flex flex-col items-center justify-center transition-all hover:border-outline/40"
            >
              <picture className="w-full h-auto block">
                <source srcSet={style.webp} type="image/webp" />
                <source srcSet={style.svg} type="image/svg+xml" />
                <img
                  src={style.webp}
                  alt={`Bali Stylised Wordmark - ${style.label}`}
                  className="w-full h-auto object-contain rounded-2xl"
                  loading="lazy"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
