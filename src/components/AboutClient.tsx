'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    quote: '"Astrology is not just about predicting the future; it is about understanding the karmic blueprint of your soul to navigate life with wisdom."',
    para1: 'Pandit Rahul Bali Ji is a renowned Vedic Astrologer based in Gurugram, specializing in <strong>Jyotish Shastra</strong>, <strong>Parashara</strong>, and <strong>Jaimini</strong> systems. Since starting <strong>paid consultations in August 2024</strong>, he has been providing precise birth chart analysis and practical remedies for career, relationships, and health.',
    para2: 'His approach combines ancient wisdom with modern clarity, utilizing high-precision <strong>Lahiri Ayanamsa</strong> for every calculation. Every prediction and remedy is rooted in authentic karmic patterns to empower you with confidence and actionable insights.',
    para3: 'Every testimonial and review shared by clients reflects genuine success and authentic experiences; no reviews are fake. For those seeking absolute certainty, contact details for any reviewer can be provided privately for personal verification, as we maintain direct records of every consultation.',
    corePrinciples: 'Core Principles',
    supportTitle: 'Support Our Work',
    supportDesc: 'If you found our service valuable, we would be deeply grateful for any donation to support our mission, suggested amount ₹701, ₹1100, ₹1200, ₹2100, ₹7100, etc.',
    supportUPI: 'Support via UPI',
    supportEmail: 'Pay using Email ID',
    copyUPI: 'Copy UPI ID',
    copyEmail: 'Copy PayPal Email',
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
    para1: 'पंडित राहुल बाली जी गुरुग्राम में स्थित एक प्रसिद्ध वैदिक ज्योतिषी हैं, जो <strong>ज्योतिष शास्त्र</strong>, <strong>पराशर</strong> और <strong>जैमिनी</strong> प्रणालियों में विशेषज्ञ हैं। <strong>अगस्त 2024 में सशुल्क परामर्श</strong> शुरू करने के बाद से, वह करियर, रिश्तों और स्वास्थ्य के लिए सटीक जन्म कुंडली विश्लेषण और व्यावहारिक उपाय प्रदान कर रहे हैं।',
    para2: 'उनका दृष्टिकोण आधुनिक स्पष्टता के साथ प्राचीन ज्ञान को जोड़ता है, प्रत्येक गणना के लिए उच्च-सटीक <strong>लाहिड़ी अयनांश</strong> का उपयोग करता है। प्रत्येक भविष्यवाणी और उपाय आपको आत्मविश्वास और व्यावहारिक अंतर्दृष्टि के साथ सशक्त बनाने के लिए प्रामाणिक कर्म पैटर्न में निहित है।',
    para3: 'ग्राहकों द्वारा साझा किया गया प्रत्येक प्रशंसापत्र और समीक्षा वास्तविक सफलता और प्रामाणिक अनुभवों को दर्शाती है; कोई भी समीक्षा नकली नहीं है। जो लोग पूर्ण निश्चितता चाहते हैं, उनके लिए किसी भी समीक्षक के संपर्क विवरण व्यक्तिगत सत्यापन के लिए निजी तौर पर प्रदान किए जा सकते हैं, क्योंकि हम प्रत्येक परामर्श का प्रत्यक्ष रिकॉर्ड रखते हैं।',
    corePrinciples: 'मुख्य सिद्धांत',
    supportTitle: 'हमारे काम का समर्थन करें',
    supportDesc: 'यदि आपको हमारी सेवा मूल्यवान लगी, तो हम अपने मिशन का समर्थन करने के लिए किसी भी दान के लिए गहराई से आभारी होंगे, सुझाई गई राशि ₹701, ₹1100, ₹1200, ₹2100, ₹7100, आदि।',
    supportUPI: 'यूपीआई के माध्यम से समर्थन',
    supportEmail: 'ईमेल आईडी का उपयोग करके भुगतान करें',
    copyUPI: 'यूपीआई आईडी कॉपी करें',
    copyEmail: 'पेपाल ईमेल कॉपी करें',
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

const UPILogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
    <path d="M7 16V8M7 8L4 11M7 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8V16M17 16L14 13M17 16L20 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function AboutClient() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

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
              ।। ॐ नमो भगवते वासुदेवाय नम: ।।
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

      {/* Support Our Work - Full Width Main Area */}
      <div id="support" className="pt-16 border-t border-outline/10 space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <h3 className={`text-lg md:text-2xl font-medium uppercase text-accent font-label ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}>{t.supportTitle}</h3>
          <p className="text-sm md:text-base text-on-surface font-body leading-relaxed max-w-2xl mx-auto md:mx-0">
            {t.supportDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Column 1: UPI Support */}
          <div className="flex flex-col gap-12 items-center md:items-start">
            {/* 1. UPI QR Code */}
            <div className="shrink-0 w-full max-w-[200px]">
              <div className="relative aspect-[495/640] overflow-hidden">
                <Image
                  src="/donate-qr.png"
                  alt="Support QR Code"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 200px, 200px"
                />
              </div>
            </div>

            {/* 2. UPI ID for copy */}
            <div className="w-full">
              <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline/50 transition-all hover:border-accent/30 group">
                <div className="shrink-0 w-10 h-10 bg-accent/5 rounded-full flex items-center justify-center">
                  <UPILogo />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] font-medium uppercase text-accent mb-0.5 font-label ${lang === 'en' ? 'tracking-[0.2em]' : ''}`}>{t.supportUPI}</p>
                  <p className="text-xs text-on-surface font-body truncate">rahul.bali@ybl</p>
                </div>
                <button
                  onClick={() => copyToClipboard('rahul.bali@ybl', 'upi')}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent/10 text-accent transition-colors"
                  title={t.copyUPI}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedId === 'upi' ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: PayPal Support */}
          <div className="flex flex-col gap-12 items-center md:items-start">
            {/* 3. PayPal Logo (Big) */}
            <div className="w-full max-w-[200px] flex justify-center md:justify-start">
              <Image
                src="/paypal-logo.svg"
                alt="PayPal Logo"
                width={200}
                height={60}
                className="object-contain w-full h-auto"
              />
            </div>

            {/* 4. Email for copy */}
            <div className="w-full">
              <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline/50 transition-all hover:border-accent/30 group">
                <div className="shrink-0 w-10 h-10 bg-accent/5 rounded-full flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[10px] font-medium uppercase text-accent mb-0.5 font-label ${lang === 'en' ? 'tracking-[0.2em]' : ''}`}>{t.supportEmail}</p>
                  <p className="text-xs text-on-surface font-body truncate">rahulbaliastrology@gmail.com</p>
                </div>
                <button
                  onClick={() => copyToClipboard('rahulbaliastrology@gmail.com', 'paypal')}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent/10 text-accent transition-colors"
                  title={t.copyEmail}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedId === 'paypal' ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
