"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BIRDS, BIRD_TRANSLATIONS, getPanchPakshiSchedule } from '@/lib/panchPakshi';

export default function PanchPakshiClientPage() {
  const { lang } = useLanguage();
  const [dateStr, setDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBird, setSelectedBird] = useState("Vulture");

  const title = lang === 'en' ? 'Panch Pakshi' : 'पंच पक्षी';
  const selectDateLabel = lang === 'en' ? 'Select Date' : 'तारीख चुनें';
  const datePlaceholder = lang === 'en' ? 'Date' : 'तारीख';
  const selectBirdLabel = lang === 'en' ? 'Select Bird' : 'पक्षी चुनें';

  const currentSchedule = getPanchPakshiSchedule(selectedBird);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full space-y-8">
        <h1 className="text-4xl font-headline text-accent">{title}</h1>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Control Bar & Day Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Unified Control Bar */}
            <div className="bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex flex-col w-full sm:w-auto">
                  <label htmlFor="panch-pakshi-bird" className="text-xs font-semibold uppercase tracking-wider text-on-surface/70 mb-1 ml-1">{selectBirdLabel}</label>
                  <select
                    id="panch-pakshi-bird"
                    value={selectedBird}
                    onChange={(e) => setSelectedBird(e.target.value)}
                    className="w-full sm:w-48 px-4 py-2 bg-white border border-outline/50 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 text-sm font-medium"
                  >
                    {BIRDS.map(b => (
                      <option key={b} value={b}>{lang === 'en' ? b : BIRD_TRANSLATIONS[b]}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col w-full sm:w-auto">
                  <label htmlFor="panch-pakshi-date" className="text-xs font-semibold uppercase tracking-wider text-on-surface/70 mb-1 ml-1">{selectDateLabel}</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="panch-pakshi-date"
                      value={dateStr}
                      onChange={(e) => setDateStr(e.target.value)}
                      className="w-full sm:w-40 px-4 py-2 bg-white border border-outline/50 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 transition-shadow pr-12 text-sm font-medium tabular-nums"
                      aria-label={datePlaceholder}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface/50 pointer-events-none" aria-hidden="true">
                      calendar_today
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Bird Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline/20">
                <h2 className="text-xl font-headline text-accent mb-2">{lang === 'en' ? 'Your Primary Bird' : 'आपका मुख्य पक्षी'}</h2>
                <p className="text-3xl font-body text-on-surface mb-1">{lang === 'en' ? currentSchedule.bird : BIRD_TRANSLATIONS[currentSchedule.bird]}</p>
            </div>
          </div>

          {/* Right Column: Activities Timetable */}
          <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline/20">
                  <h2 className="text-2xl font-headline text-accent mb-6">{lang === 'en' ? 'Daily Activities' : 'दैनिक गतिविधियां'}</h2>
                  <div className="space-y-4">
                      {currentSchedule.activities.map((item, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-outline/10 bg-surface/30">
                              <div className="mb-2 sm:mb-0">
                                  <span className="text-sm font-medium text-on-surface/60 uppercase tracking-wider block mb-1">Time</span>
                                  <span className="text-lg font-body text-on-surface tabular-nums">{item.timeSlot}</span>
                              </div>
                              <div className={`px-4 py-2 rounded-lg font-medium text-center min-w-[120px] ${item.color}`}>
                                  {item.activity}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
