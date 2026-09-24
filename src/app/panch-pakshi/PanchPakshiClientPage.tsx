"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExploreTools from '@/components/ExploreTools';
import { NAKSHATRA_NAMES } from '@/lib/astrology';
import {
  ACTIVITY_GUIDANCE,
  BIRD_DETAILS,
  BIRD_TRANSLATIONS,
  getPanchPakshiSchedule,
  NAKSHATRA_BIRD_MAPPING
} from '@/lib/panchPakshi';
import { BirdIcon } from '@/components/panch-pakshi/BirdIcon';

export default function PanchPakshiClientPage() {
  const { lang } = useLanguage();
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [selectedNakshatra, setSelectedNakshatra] = useState("Ashwini");
  const [selectedPaksha, setSelectedPaksha] = useState<"Shukla" | "Krishna">("Shukla");

  const title = lang === 'en' ? 'Panch Pakshi' : 'पंच पक्षी';
  const subtitle = lang === 'en'
    ? 'Ancient Vedic 5-Bird Bio-Rhythm system for timing optimal daily activities & decisions.'
    : 'अनुकूल दैनिक गतिविधियों और निर्णयों के समय के लिए प्राचीन वैदिक 5-पक्षी जैव-ताल प्रणाली।';

  const selectDateLabel = lang === 'en' ? 'Select Date' : 'तारीख चुनें';
  const datePlaceholder = lang === 'en' ? 'Date' : 'तारीख';
  const selectNakshatraLabel = lang === 'en' ? 'Birth Nakshatra' : 'जन्म नक्षत्र';
  const selectPakshaLabel = lang === 'en' ? 'Birth Paksha' : 'जन्म पक्ष';

  const pakshaOptions = [
    { value: "Shukla", label: lang === 'en' ? 'Shukla Paksha (Waxing)' : 'शुक्ल पक्ष' },
    { value: "Krishna", label: lang === 'en' ? 'Krishna Paksha (Waning)' : 'कृष्ण पक्ष' }
  ];

  const calculatedBird = NAKSHATRA_BIRD_MAPPING[selectedNakshatra]?.[selectedPaksha] || "Vulture";
  const currentSchedule = getPanchPakshiSchedule(calculatedBird);
  const birdAttributes = BIRD_DETAILS[calculatedBird] || BIRD_DETAILS["Vulture"];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-4xl font-headline text-accent mb-2">{title}</h1>
          <p className="text-on-surface/80 text-sm md:text-base">{subtitle}</p>
        </div>

        {/* Control Bar */}
        <div className="bg-white border border-outline/20 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="panch-pakshi-nakshatra" className="text-xs font-semibold uppercase tracking-wider text-on-surface/70 mb-1 ml-1">
                {selectNakshatraLabel}
              </label>
              <select
                id="panch-pakshi-nakshatra"
                value={selectedNakshatra}
                onChange={(e) => setSelectedNakshatra(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 bg-white border border-outline/20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-sm font-medium"
              >
                {NAKSHATRA_NAMES.map(n => (
                  <option key={n.name} value={n.name}>{lang === 'en' ? n.name : n.sanskrit}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="panch-pakshi-paksha" className="text-xs font-semibold uppercase tracking-wider text-on-surface/70 mb-1 ml-1">
                {selectPakshaLabel}
              </label>
              <select
                id="panch-pakshi-paksha"
                value={selectedPaksha}
                onChange={(e) => setSelectedPaksha(e.target.value as "Shukla" | "Krishna")}
                className="w-full sm:w-48 px-4 py-2 bg-white border border-outline/20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent text-sm font-medium"
              >
                {pakshaOptions.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="panch-pakshi-date" className="text-xs font-semibold uppercase tracking-wider text-on-surface/70 mb-1 ml-1">
                {selectDateLabel}
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="panch-pakshi-date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full sm:w-40 px-4 py-2 bg-white border border-outline/20 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-shadow pr-12 text-sm text-transparent font-medium tabular-nums relative z-10"
                  aria-label={datePlaceholder}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface text-sm font-medium z-20">
                  {(() => {
                    if (!dateStr) return '';
                    const [y, m, d] = dateStr.split('-');
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const monthIdx = parseInt(m, 10) - 1;
                    if (monthIdx >= 0 && monthIdx < 12) {
                      return `${parseInt(d, 10)} ${months[monthIdx]} ${y}`;
                    }
                    return dateStr;
                  })()}
                </div>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/50 pointer-events-none z-20" aria-hidden="true">
                  calendar_today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Bird Attributes Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline/20 space-y-5">
              <div className="flex items-center space-x-4 pb-4 border-b border-outline/10">
                <div className="p-2 bg-surface rounded-2xl border border-outline/20 flex items-center justify-center">
                  <BirdIcon bird={calculatedBird} className="w-16 h-16" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-on-surface/60 block">
                    {lang === 'en' ? 'Your Primary Bird' : 'आपका मुख्य पक्षी'}
                  </span>
                  <p className="text-2xl font-body font-bold text-on-surface">
                    {calculatedBird}
                  </p>
                  <span className="text-sm font-medium text-accent font-hindi block">
                    ({BIRD_TRANSLATIONS[calculatedBird]})
                  </span>
                </div>
              </div>

              <p className="text-xs text-on-surface/80 leading-relaxed italic">
                &ldquo;{birdAttributes.description}&rdquo;
              </p>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-surface/50 border border-outline/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface/60 block">
                    {lang === 'en' ? 'Ruling Planet' : 'स्वामी ग्रह'}
                  </span>
                  <span className="text-xs font-semibold text-on-surface">
                    {birdAttributes.planet}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface/50 border border-outline/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface/60 block">
                    {lang === 'en' ? 'Element (Tattva)' : 'तत्त्व'}
                  </span>
                  <span className="text-xs font-semibold text-on-surface">
                    {birdAttributes.element}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface/50 border border-outline/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface/60 block">
                    {lang === 'en' ? 'Favorable Direction' : 'दिशा'}
                  </span>
                  <span className="text-xs font-semibold text-on-surface">
                    {birdAttributes.direction}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface/50 border border-outline/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface/60 block">
                    {lang === 'en' ? 'Friendly Birds' : 'मित्र पक्षी'}
                  </span>
                  <span className="text-xs font-semibold text-success">
                    {birdAttributes.friendlyBirds.join(', ')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-surface/50 border border-outline/10">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-on-surface/60 block mb-1">
                  {lang === 'en' ? 'Incompatible / Enemy Birds' : 'शत्रु पक्षी'}
                </span>
                <span className="text-xs font-semibold text-error">
                  {birdAttributes.enemyBirds.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Daily Activities Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline/20 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-headline text-accent">
                    {lang === 'en' ? 'Daily Activities Schedule' : 'दैनिक गतिविधियों की समय सारणी'}
                  </h2>
                  <p className="text-xs text-on-surface/70 mt-1">
                    {lang === 'en'
                      ? '5 Major Prahara Time Slots (06:00 AM - 06:00 PM)'
                      : '५ प्रमुख प्रहर कालखण्ड (प्रातः ०६:०० - सायं ०६:००)'}
                  </p>
                </div>
                <BirdIcon bird={calculatedBird} className="w-10 h-10 opacity-70 hidden sm:block" />
              </div>

              <div className="space-y-4">
                {currentSchedule.activities.map((item, idx) => {
                  const guidance = ACTIVITY_GUIDANCE[item.activity];
                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-outline/20 bg-surface/30 hover:bg-surface/60 transition-colors gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-on-surface/60 uppercase tracking-wider block">
                          {lang === 'en' ? `Prahara ${idx + 1} Slot` : `प्रहर ${idx + 1}`}
                        </span>
                        <span className="text-lg font-body font-semibold text-on-surface tabular-nums">
                          {item.timeSlot}
                        </span>
                      </div>

                      <div className="flex flex-col sm:items-end space-y-1">
                        <span className={`px-4 py-1.5 rounded-lg text-sm font-semibold border ${item.color} text-center min-w-[120px]`}>
                          {item.activity} {guidance?.title ? `(${guidance.title.split(' ')[0]})` : ''}
                        </span>
                        <span className="text-xs text-on-surface/70">
                          {guidance?.summary}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive Actionable Guidance & Do's / Don'ts Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline/20 space-y-6 mt-8">
          <div>
            <h2 className="text-2xl font-headline text-accent mb-1">
              {lang === 'en' ? 'Actionable Guidance & Activity Recommendations' : 'कार्रवाई योग्य मार्गदर्शन और गतिविधि सिफारिशें'}
            </h2>
            <p className="text-xs text-on-surface/70">
              {lang === 'en'
                ? 'Practical Do’s and Don’ts for each Panch Pakshi state to maximize success and mitigate obstacles.'
                : 'सफलता को अधिकतम करने और बाधाओं को कम करने के लिए प्रत्येक पंच पक्षी स्थिति के लिए व्यावहारिक सुझाव।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ACTIVITY_GUIDANCE).map(([activityKey, data]) => (
              <div
                key={activityKey}
                className="p-5 rounded-2xl border border-outline/20 bg-surface/20 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-lg font-semibold text-xs border ${data.badgeColor}`}>
                      {data.title}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-on-surface/80 leading-relaxed">
                    {data.summary}
                  </p>

                  {/* Do's Section */}
                  <div className="space-y-1.5 pt-2 border-t border-outline/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-success flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      {lang === 'en' ? 'Recommended (Do’s)' : 'अनुशंसित (करने योग्य)'}
                    </span>
                    <ul className="space-y-1">
                      {data.recommended.map((rec, rIdx) => (
                        <li key={rIdx} className="text-xs text-on-surface/80 flex items-start gap-1.5">
                          <span className="text-success text-xs font-bold select-none">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts Section */}
                  <div className="space-y-1.5 pt-2 border-t border-outline/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-error flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">cancel</span>
                      {lang === 'en' ? 'Things to Avoid (Don’ts)' : 'बचने योग्य (न करने योग्य)'}
                    </span>
                    <ul className="space-y-1">
                      {data.avoid.map((av, aIdx) => (
                        <li key={aIdx} className="text-xs text-on-surface/80 flex items-start gap-1.5">
                          <span className="text-error text-xs font-bold select-none">•</span>
                          <span>{av}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ExploreTools currentPath="/panch-pakshi" className="mt-8" />
      </main>
      <Footer />
    </div>
  );
}