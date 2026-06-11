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

const UPILogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
    <path d="M7 16V8M7 8L4 11M7 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 8V16M17 16L14 13M17 16L20 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PayPalLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 124 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={className || "text-accent"}>
    <path fill="currentColor" d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658 h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5 c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454 h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z" />
    <path fill="currentColor" d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332 c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031 c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95 c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449 c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301 c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z" />
    <path fill="currentColor" d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425 c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811 c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z" />
    <path fill="currentColor" d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658 h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5 c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454 h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704 C95.809,11.668,95.918,12.292,95.781,13.154z" />
    <path fill="currentColor" d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332 c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031 c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949 c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449 c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301 c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z" />
    <path fill="currentColor" d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803 l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z" />
    <path fill="currentColor" d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1 c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917 c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812 c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183 c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73 c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215 c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z" />
    <path fill="currentColor" d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55 c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533 c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32 c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622 C24.022,8.286,23.573,7.945,23.048,7.667z" />
    <path fill="currentColor" d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117 c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605 l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55 c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z" />
    <path fill="currentColor" d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352 c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15 c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392 C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791 l1.454-9.225L9.614,7.699z" />
  </svg>
);

export default function AboutClient() {
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
          <div className="prose prose-lg max-w-none font-body text-secondary leading-relaxed space-y-8">
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
        </div>

        {/* Right Column: Core Principles (40%) */}
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-8">
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

      {/* Support Our Work - Full Width Main Area */}
      <div id="support" className="pt-16 border-t border-outline/10 space-y-12">
        <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent font-label text-center md:text-left">Support Our Work</h3>

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
                quality={95}
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
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-0.5 font-label">Support via UPI</p>
                <p className="text-xs text-on-surface font-body truncate">rahul.bali@ybl</p>
              </div>
              <button
                onClick={() => copyToClipboard('rahul.bali@ybl', 'upi')}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent/10 text-accent transition-colors"
                title="Copy UPI ID"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {copiedId === 'upi' ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          {/* 3. PayPal Logo (Big) */}
          <div className="w-full max-w-[200px] flex justify-center md:justify-start">
            <PayPalLogo className="w-full h-auto text-accent" />
          </div>

          {/* 4. Email for copy */}
          <div className="w-full">
            <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline/50 transition-all hover:border-accent/30 group">
              <div className="shrink-0 w-10 h-10 bg-accent/5 rounded-full flex items-center justify-center text-accent">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-0.5 font-label">Pay using Email ID</p>
                <p className="text-xs text-on-surface font-body truncate">rahulbaliastrology@gmail.com</p>
              </div>
              <button
                onClick={() => copyToClipboard('rahulbaliastrology@gmail.com', 'paypal')}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent/10 text-accent transition-colors"
                title="Copy PayPal Email"
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
  );
}
