'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { SOCIAL_PROFILES } from '@/lib/social-data';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    title: "Contact Us",
    subtitle: "Get in Touch",
    location: "Location",
    city: "Gurugram, Haryana, India",
    email: "Email Address",
    online: "Online Presence"
  },
  hi: {
    title: "संपर्क करें",
    subtitle: "जुड़ें",
    location: "स्थान",
    city: "गुरुग्राम, हरियाणा, भारत",
    email: "ईमेल पता",
    online: "ऑनलाइन उपस्थिति"
  }
};

export default function ContactContent() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <PageHeader
        title={t.title}
        subtitle={t.subtitle}
      />
      <div className="py-16 max-w-4xl mx-auto px-8 flex flex-col items-center text-center">
        <div className="space-y-16">
          <div>
            <h2 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.location}</h2>
            <p className="text-2xl font-body text-on-surface">{t.city}</p>
          </div>

          <div>
            <h2 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.email}</h2>
            <a href="mailto:rahulbaliastrology@gmail.com" className="text-2xl font-body text-on-surface hover:text-accent transition-colors">
              rahulbaliastrology@gmail.com
            </a>
          </div>

          <div>
            <h2 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.online}</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={SOCIAL_PROFILES.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Threads"
              >
                <i className="fa-brands fa-threads"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.linkedin}
                rel="noopener noreferrer"
                target="_blank"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.tumblr}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Tumblr"
              >
                <i className="fa-brands fa-tumblr"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/30 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Reddit"
              >
                <i className="fa-brands fa-reddit-alien"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
