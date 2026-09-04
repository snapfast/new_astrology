'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import { SOCIAL_PROFILES } from '@/lib/social-data';

const TRANSLATIONS = {
  en: {
    quote: '"Astrology is a sacred science of light; it is about illuminating the karmic blueprint of your soul through divine wisdom and ancient Brahmin traditions."',
    para1: 'Pandit Rahul Bali Ji is a highly revered Vedic Astrologer specializing in <strong>Jyotish Shastra</strong>, <strong>Parashara</strong>, and <strong>Jaimini</strong> systems. Upholding a prestigious Brahmin heritage, he provides exceptionally precise birth chart analysis and profound spiritual remedies for career, relationships, and health.',
    para2: 'His masterful approach seamlessly unites ancient sacred wisdom with modern clarity, utilizing high-precision <strong>Lahiri Ayanamsa</strong> for every calculation. Every authoritative prediction and remedy is deeply rooted in authentic karmic patterns to empower you with absolute confidence and transformative insights.',
    para3: 'With an esteemed global reach extending from <strong>India</strong> to <strong>Indonesia</strong> and beyond, his unparalleled expertise has guided countless souls toward ultimate clarity. Every shared testimonial reflects genuine, undeniable success.',
    corePrinciples: 'Core Principles',
    specializedServices: 'Specialized Services',
    contactInfo: 'Contact Information',
    location: "Location",
    city: "India",
    email: "Email Address",
    online: "Online Presence",
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

            <p dangerouslySetInnerHTML={{ __html: t.para3 }} />

            <p className="text-lg md:text-2xl text-center pt-12 text-accent border-t border-outline/20 font-hindi">
              ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
            </p>
          </div>
        </div>

        {/* Right Column: Core Principles & Services (40%) */}
        <div className="lg:col-span-4 space-y-16">
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

          <div className="space-y-8">
            <h3 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.specializedServices}</h3>
            <ul className="grid grid-cols-1 gap-4">
              {SPECIALIZED_SERVICES.map((service) => (
                <li key={service.id} className="flex items-center gap-3 text-sm font-medium text-on-surface hover:text-accent transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                  {service.title[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-24 pt-16 border-t border-outline/20">
        <h2 className="text-3xl font-headline text-center text-on-surface mb-16">{t.contactInfo}</h2>
        <div className="flex flex-col items-center text-center space-y-16">
          <div>
            <h3 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.location}</h3>
            <p className="text-2xl font-body text-on-surface">{t.city}</p>
          </div>

          <div>
            <h3 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.email}</h3>
            <a href="mailto:rahulbaliastrology@gmail.com" className="text-2xl font-body text-on-surface hover:text-accent transition-colors">
              rahulbaliastrology@gmail.com
            </a>
          </div>

          <div>
            <h3 className={`text-[10px] font-medium uppercase text-accent mb-6 font-label ${lang === 'en' ? 'tracking-[0.3em]' : ''}`}>{t.online}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href={SOCIAL_PROFILES.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-surface transition-all duration-300 text-2xl"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center text-[#000000] hover:bg-[#000000] hover:border-[#000000] hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Threads"
              >
                <i className="fa-brands fa-threads"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.linkedin}
                rel="noopener noreferrer"
                target="_blank"
                className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-surface transition-all duration-300 text-2xl"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.tumblr}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center text-[#36465D] hover:bg-[#36465D] hover:border-[#36465D] hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Tumblr"
              >
                <i className="fa-brands fa-tumblr"></i>
              </a>
              <a
                href={SOCIAL_PROFILES.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full border border-outline/20 flex items-center justify-center text-[#FF4500] hover:bg-[#FF4500] hover:border-[#FF4500] hover:text-surface transition-all duration-300 text-2xl"
                aria-label="Reddit"
              >
                <i className="fa-brands fa-reddit-alien"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
