'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    quote: '"Astrology is not just about predicting the future; it is about understanding the karmic blueprint of your soul to navigate life with wisdom."',
    para1: 'Pandit Rahul Bali Ji is a renowned Vedic Astrologer based in <strong>Gurugram (Gurgaon)</strong>, specializing in <strong>Jyotish Shastra</strong>, <strong>Parashara</strong>, and <strong>Jaimini</strong> systems. Since starting <strong>consultations in August 2024</strong>, he has been providing precise birth chart analysis and practical remedies for career, relationships, and health.',
    para2: 'His approach combines ancient wisdom with modern clarity, utilizing high-precision <strong>Lahiri Ayanamsa</strong> for every calculation. Every prediction and remedy is rooted in authentic karmic patterns to empower you with confidence and actionable insights.',
    para3: 'With a global reach extending from <strong>India</strong> to <strong>Indonesia</strong> and beyond, he has helped numerous clients find clarity. Every testimonial and review shared reflects genuine success; no reviews are fake. For those seeking absolute certainty, contact details for any reviewer can be provided privately for personal verification.',
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
  },
  hi: {
    quote: '"ज्योतिष केवल भविष्य बताने के बारे में नहीं है; यह जीवन को ज्ञान के साथ जीने के लिए आपकी आत्मा के कर्म खाके को समझने के बारे में है।"',
    para1: 'पंडित राहुल बाली जी <strong>गुरुग्राम (गुड़गांव)</strong> में स्थित एक प्रसिद्ध वैदिक ज्योतिषी हैं, जो <strong>ज्योतिष शास्त्र</strong>, <strong>पराशर</strong> और <strong>जैमिनी</strong> प्रणालियों में विशेषज्ञ हैं। <strong>अगस्त 2024 में परामर्श</strong> शुरू करने के बाद से, वह करियर, रिश्तों और स्वास्थ्य के लिए सटीक जन्म कुंडली विश्लेषण और व्यावहारिक उपाय प्रदान कर रहे हैं।',
    para2: 'उनका दृष्टिकोण आधुनिक स्पष्टता के साथ प्राचीन ज्ञान को जोड़ता है, प्रत्येक गणना के लिए उच्च-सटीक <strong>लाहिड़ी अयनांश</strong> का उपयोग करता है। प्रत्येक भविष्यवाणी और उपाय आपको आत्मविश्वास और व्यावहारिक अंतर्दृष्टि के साथ सशक्त बनाने के लिए प्रामाणिक कर्म पैटर्न में निहित है।',
    para3: '<strong>भारत</strong> से लेकर <strong>इंडोनेशिया</strong> और उसके बाद तक वैश्विक पहुंच के साथ, उन्होंने अनगिनत क्लाइंट्स को स्पष्टता खोजने में मदद की है। साझा किया गया प्रत्येक प्रशंसापत्र और समीक्षा वास्तविक सफलता को दर्शाती है; कोई भी समीक्षा नकली नहीं है। जो लोग पूर्ण निश्चितता चाहते हैं, उनके लिए किसी भी समीक्षक के संपर्क विवरण व्यक्तिगत सत्यापन के लिए निजी तौर पर प्रदान किए जा सकते हैं।',
    corePrinciples: 'मुख्य सिद्धांत',
    values: [
      {
        title: "प्रामाणिकता",
        description: "बिना किसी समझौते के पारंपरिक पराशर और जैमिनी प्रणालियों का कड़ाई से पालन करना।",
        icon: "verified_user"
      },
      {
        title: "सटीकता",
        description: "प्रत्येक गणना के लिए उच्च-सटीक खगोलीय डेटा (लाहिड़ी अयनांश) का उपयोग करना।",
        icon: "track_changes"
      },
      {
        title: "करुणा",
        description: "आधुनिक जीवन की चुनौतियों को समझने के लिए एक धैर्यपूर्ण, गैर-निर्णयात्मक दृष्टिकोण।",
        icon: "favorite"
      },
      {
        title: "स्पष्टता",
        description: "डर या भ्रम पैदा करने के बजाय आपको व्यावहारिक अंतर्दृष्टि के साथ सशक्त बनाना।",
        icon: "lightbulb"
      }
    ]
  }
};

export default function AboutClient() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
        {/* Left Column: Condensed Bio (60%) */}
        <div className="lg:col-span-6 space-y-16">
          <div className="prose prose-lg max-w-none font-body text-on-surface leading-relaxed space-y-8">
            <p className="text-xl text-on-surface font-normal leading-relaxed">
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
                <div key={idx} className="flex gap-5">
                  <div className="shrink-0 w-10 h-10 bg-accent/5 rounded-xl flex items-center justify-center text-accent">
                    <span className="material-symbols-outlined text-xl">{value.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface mb-1 uppercase tracking-wider">{value.title}</h4>
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
