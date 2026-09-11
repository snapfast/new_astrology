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
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" viewBox="0 0 576 512">
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#000000] hover:bg-[#000000] hover:border-[#000000] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Threads"
            >
              <svg className="w-6 h-6" viewBox="0 0 448 512">
                <path d="M331.5 235.7c-2.5 0-5.1.2-7.6.6-.4-3-.9-6-1.6-8.9-13.3-60.7-68.8-103.8-131-97.1-50.5 5.5-91.8 42.2-101.3 92.4-11.3 59.8 23 118.8 81.2 136 32.1 9.5 66.8 4 93.4-14.8 22.8-16.1 38.3-40.8 42.8-68.3 10.7 1.8 21.6 1.9 32.3-.3 13.9-2.9 27-9.5 37.8-19 23.3-20.5 35.8-51.3 33.7-82.6-3.8-57.1-43.2-105.1-98.3-119.8-70.1-18.7-144 18.5-172.5 83.2-24.8 56.4-11.3 123.8 32.5 166.7 40.2 39.4 99 53.6 153.2 37.1 23.8-7.3 45.7-20.5 63.8-38.3l23.5 23.5c-22.8 22.4-50.5 38.8-80.7 48-67.9 20.7-141.7 2.9-192.1-46.5C8 387 -9 302.2 22 231.6 57.6 150.6 150 104 237.7 127.4c69.1 18.4 118.5 78.5 123.2 150 2.6 39.3-13.1 78.1-42.3 103.8-13.7 12.1-30.3 20.5-48 24.2-17.7 3.7-36.1 2.5-53.3-3.4 3.7-18.9 1-38.6-7.8-55.8zm-105.8 52.4c-30.4 0-55.1-24.7-55.1-55.1s24.7-55.1 55.1-55.1 55.1 24.7 55.1 55.1-24.7 55.1-55.1 55.1z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" viewBox="0 0 320 512">
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V137.9c0-25.7 12.6-50.8 53-50.8h41V3.2S252.7 0 215.5 0C138 0 88 47.1 88 132.1v69.4H0v97.8h80z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" viewBox="0 0 448 512">
                <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.tumblr}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#36465D] hover:bg-[#36465D] hover:border-[#36465D] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Tumblr"
            >
              <svg className="w-6 h-6" viewBox="0 0 320 512">
                <path d="M309.8 480.3c-13.6 14.5-35.8 25.1-66.3 31.7-28.1 6.1-58.1 3.5-84.7-7.6-32.9-13.7-52.1-43.2-52.1-85.8V232H54.1c-14.8 0-26.8-12-26.8-26.8v-72.3c0-14.8 12-26.8 26.8-26.8 27.6 0 51.5-12.7 67.2-34.1 14.4-19.6 22.8-44.5 24.6-71.1C146.5 8.9 156.4 0 168.6 0h78.3c14.8 0 26.8 12 26.8 26.8v106.3h80.1c14.8 0 26.8 12 26.8 26.8v72.3c0 14.8-12 26.8-26.8 26.8h-80.1v151.7c0 17.8 4.2 29.8 12.8 36.2 8.3 6.1 20.3 8.3 36.3 6.6 15.6-1.7 30.6-6.7 44.1-14.7 12.8-7.6 29.2-3.1 36.8 9.7l32.1 53.8c7.7 12.7 3.3 29.2-9.6 36.8z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_PROFILES.reddit}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-outline/20 bg-surface-bright flex items-center justify-center text-[#FF4500] hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-white transition-all duration-300 text-2xl shadow-sm fill-current"
              aria-label="Reddit"
            >
              <svg className="w-6 h-6" viewBox="0 0 512 512">
                <path d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3l23.3-109.7 76.1 16.2c.8 19.3 16.6 34.6 36.1 34.6 20 0 36.3-16.3 36.3-36.3s-16.3-36.3-36.3-36.3c-13.3 0-25 7.2-31.3 18l-84.5-18c-3.6-.8-7.3.3-9.9 2.8s-3.7 6.2-3 9.9l-25.7 120.9c-54.7 1.4-103.8 17.3-139.8 42.3-9.7-9.7-22.9-15.9-37.9-15.9-29.5 0-53.5 24-53.5 53.5 0 20.2 11.2 37.8 27.8 47-1.1 6.3-1.7 12.8-1.7 19.3 0 98.2 111.9 178 250 178s250-79.8 250-178c0-6.6-.6-13-1.7-19.3 16.5-9.2 27.8-26.8 27.8-47 0-29.5-24-53.5-53.5-53.5zM170.1 285.8c14.2 0 25.7 11.5 25.7 25.7s-11.5 25.7-25.7 25.7-25.7-11.5-25.7-25.7 11.5-25.7 25.7-25.7zm171.8 120.7c-26.7 26.7-77 26.7-103.7 0-5-5-5-13.1 0-18.1 5-5 13.1-5 18.1 0 16.8 16.8 50.7 16.8 67.5 0 5-5 13.1-5 18.1 0 5 5 5 13.1 0 18.1zm-8.1-69.3c-14.2 0-25.7-11.5-25.7-25.7s11.5-25.7 25.7-25.7 25.7 11.5 25.7 25.7-11.5 25.7-25.7 25.7z"/>
              </svg>
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
