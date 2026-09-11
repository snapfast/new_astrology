'use client';

import React from 'react';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import { SOCIAL_PROFILES } from '@/lib/social-data';

const BALI_STYLES = [
  { id: 1, label: 'Elegant Cursive', svg: '/images/bali-styles/bali-style-1.svg', webp: '/images/bali-styles/bali-style-1.webp' },
  { id: 2, label: 'Modern Editorial', svg: '/images/bali-styles/bali-style-2.svg', webp: '/images/bali-styles/bali-style-2.webp' },
  { id: 3, label: 'Vedic Traditional', svg: '/images/bali-styles/bali-style-3.svg', webp: '/images/bali-styles/bali-style-3.webp' },
  { id: 4, label: 'Artistic Expression', svg: '/images/bali-styles/bali-style-4.svg', webp: '/images/bali-styles/bali-style-4.webp' },
];

export default function AboutClient() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
      {/* Practitioner Bio & Mantra Block */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 text-center space-y-8">
        <div className="prose prose-lg max-w-2xl mx-auto font-body text-on-surface leading-relaxed space-y-4">
          <p className="text-base md:text-lg text-on-surface/90">
            Rahul Bali was born into the{' '}
            <a
              href="https://en.wikipedia.org/wiki/Bali_clan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline font-medium hover:text-accent/80 transition-colors"
            >
              Bali Family
            </a>
            {' '}in Ambala City. Trained in classical Brahmin traditions since birth, he completed his schooling in Ambala and earned a double degree in engineering. An engineer by profession, he has been working at an MNC (Google) since 2018.
          </p>
          <p className="text-base md:text-lg text-on-surface/90">
            He combines progressive thinking with traditional values and enjoys traveling across India.
          </p>
          <p className="text-base md:text-lg text-on-surface/90">
            Pandit Rahul Bali Ji provides practical life guidance through{' '}
            <strong className="text-on-surface font-semibold">Jyotish Shastra</strong>
            . His approach combines classical astrology with psychological insights, focusing on understanding deep-rooted thinking patterns and behaviors.
          </p>
        </div>
        <div className="pt-6 border-t border-outline/10 text-xl md:text-2xl text-accent font-hindi tracking-wide">
          ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
        </div>
      </div>

      {/* Specialized Services List Card */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 space-y-8">
        <div className="text-center">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Specialized Services
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 text-center">
          {SPECIALIZED_SERVICES.map((service) => (
            <p
              key={service.id}
              className="text-sm md:text-base font-medium text-on-surface/90 py-1"
            >
              {service.title}
            </p>
          ))}
        </div>
      </div>

      {/* Email & Social Links Card */}
      <div className="bg-white border border-outline/20 shadow-sm rounded-3xl p-8 md:p-12 text-center space-y-10">
        <div className="space-y-3">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Email Address
          </h2>
          <a
            href="mailto:rahulbaliastrology@gmail.com"
            className="text-xl md:text-2xl font-body font-medium text-on-surface hover:text-accent transition-colors inline-block"
          >
            rahulbaliastrology@gmail.com
          </a>
        </div>

        <div className="space-y-6 pt-8 border-t border-outline/10">
          <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
            Online Presence
          </h2>
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
        <h2 className="text-xs md:text-sm font-medium uppercase text-accent font-label tracking-[0.25em]">
          Stylised Brand Mark Variations
        </h2>

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
