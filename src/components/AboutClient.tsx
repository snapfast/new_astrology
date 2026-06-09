'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const CORE_VALUES = [
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
];

export default function AboutClient() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
      {/* Left Column: Condensed Bio (60%) */}
      <div className="lg:col-span-6 prose prose-lg max-w-none font-body text-secondary leading-relaxed space-y-8">
        <p className="text-xl text-on-surface font-light leading-relaxed italic">
          &quot;Astrology is not just about predicting the future; it is about understanding the karmic blueprint of your soul to navigate life with wisdom.&quot;
        </p>

        <p>
          Pandit Rahul Bali Ji is a renowned Vedic Astrologer based in Gurugram, specializing in <strong>Jyotish Shastra</strong>, <strong>Parashara</strong>, and <strong>Jaimini</strong> systems. Since starting <strong>paid consultations in August 2024</strong>, he has been providing precise birth chart analysis and practical remedies for career, relationships, and health.
        </p>

        <p>
          His approach combines ancient wisdom with modern clarity, utilizing high-precision <strong>Lahiri Ayanamsa</strong> for every calculation. Every prediction and remedy is rooted in authentic karmic patterns to empower you with confidence and actionable insights.
        </p>

        <p>
          Every testimonial and review shared by clients reflects genuine success and authentic experiences; no reviews are fake. For those seeking absolute certainty, contact details for any reviewer can be provided privately for personal verification, as we maintain direct records of every consultation.
        </p>

        <p className="text-lg md:text-2xl italic text-center pt-12 text-accent border-t border-outline/20">
          ।। ॐ नमो भगवते वासुदेवाय नम: ।।
        </p>
      </div>

      {/* Right Column: QR and Core Principles (40%) */}
      <div className="lg:col-span-4 space-y-12" id="support">
        {/* Integrated QR Image - No Card, Minimalist */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative w-full max-w-[240px] aspect-[495/640] mx-auto overflow-hidden">
            <Image
              src="/donate-qr.png"
              alt="Support QR Code"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 240px, 240px"
            />
          </div>
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <p className="text-[10px] text-secondary font-label uppercase tracking-[0.2em]">
                rahul.bali@ybl
              </p>
              <button
                onClick={() => copyToClipboard('rahul.bali@ybl', 'upi')}
                className="flex items-center gap-1 text-[8px] font-label uppercase tracking-widest text-accent hover:text-on-surface transition-colors"
                title="Copy UPI ID"
              >
                <span className="material-symbols-outlined text-[12px]">
                  {copiedId === 'upi' ? 'check' : 'content_copy'}
                </span>
                {copiedId === 'upi' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="flex items-center justify-center gap-3">
              <p className="text-[10px] text-secondary font-label lowercase tracking-[0.1em]">
                rahulbaliastrology@gmail.com
              </p>
              <button
                onClick={() => copyToClipboard('rahulbaliastrology@gmail.com', 'paypal')}
                className="flex items-center gap-1 text-[8px] font-label uppercase tracking-widest text-accent hover:text-on-surface transition-colors"
                title="Copy PayPal Email"
              >
                <span className="material-symbols-outlined text-[12px]">
                  {copiedId === 'paypal' ? 'check' : 'content_copy'}
                </span>
                {copiedId === 'paypal' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Core Principles - Integrated (No Cards) */}
        <div className="space-y-8 pt-4">
          <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 font-label">Core Principles</h3>
          <div className="space-y-8">
            {CORE_VALUES.map((value, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 bg-accent/5 rounded-xl flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined text-xl">{value.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface mb-1 uppercase tracking-wider">{value.title}</h4>
                  <p className="text-xs text-secondary leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
