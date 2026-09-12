'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ExploreTools from '@/components/ExploreTools';
import { generateAstrologyData, PLANET_NAMES, getPlanetTransits } from '@/lib/astrology';

const TRANSLATIONS = {
  en: {
    heroTitle: "Transits Table",
    heroDesc: "View the current astrological positions and status of all Vedic planets.",
    referenceTime: "Reference Date & Time (IST)",
    planet: "Planet",
    rashi: "Sign",
    degree: "Degree",
    nakshatra: "Nakshatra",
    pada: "Pada",
    rashiLord: "Sign Lord",
    nakshatraLord: "Nakshatra Lord",
    state: "State",
    combust: "Combust",
    retrograde: "Retrograde",
    direct: "Direct"
  }
};

const PLANETS_ORDER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];

const TransitsTableClientPage = () => {
  const t = TRANSLATIONS.en;

  const [selectedDate, setSelectedDate] = useState("2026-07-16");
  const [selectedTime, setSelectedTime] = useState("17:11");

  useEffect(() => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);

    const y = istDate.getUTCFullYear();
    const m = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const d = String(istDate.getUTCDate()).padStart(2, '0');
    const hrs = String(istDate.getUTCHours()).padStart(2, '0');
    const mins = String(istDate.getUTCMinutes()).padStart(2, '0');

    setSelectedDate(`${y}-${m}-${d}`);
    setSelectedTime(`${hrs}:${mins}`);
  }, []);

  // Safely construct referenceDate for IST timezone
  const referenceDate = useMemo(() => {
    if (!selectedDate || !selectedTime) return new Date();
    const dateParts = selectedDate.split('-');
    const timeParts = selectedTime.split(':');
    if (dateParts.length !== 3 || timeParts.length < 2) return new Date();
    const [y, m, d] = dateParts.map(Number);
    const [hrs, mins] = timeParts.map(Number);
    if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(hrs) || isNaN(mins)) return new Date();

    const formattedDate = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const formattedTime = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:00`;
    const dObj = new Date(`${formattedDate}T${formattedTime}+05:30`);
    return isNaN(dObj.getTime()) ? new Date() : dObj;
  }, [selectedDate, selectedTime]);

  // Use generateAstrologyData for planetary house mapping and positions
  const chartData = useMemo(() => {
    return generateAstrologyData(selectedDate, selectedTime, "28.6139", "77.2090");
  }, [selectedDate, selectedTime]);

  // Using getPlanetTransits fallback for Outer planets since they aren't fully integrated into generateAstrologyData output for this view
  const currentPositionsMap = useMemo(() => {
    const map = new Map();
    for (const planet of PLANETS_ORDER) {
      // First try to find in chartData
      let pData = chartData.planets?.find(p => p.name === planet);

      // If not in chartData (like outer planets), calculate it
      if (!pData) {
        const transits = getPlanetTransits(planet, referenceDate);
        if (transits.current) {
          pData = transits.current;
        }
      }

      if (pData) {
        map.set(planet, pData);
      }
    }
    return map;
  }, [chartData, referenceDate]);

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.heroTitle}
        description={t.heroDesc}
      />

      <section className="py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">

        {/* Date/Time Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-outline rounded-2xl p-4 shadow-sm max-w-2xl mx-auto">
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <h2 className="text-xs uppercase font-label text-accent font-bold tracking-widest">{t.referenceTime}</h2>
            <p className="text-sm text-on-surface font-body">Location default: New Delhi</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-44 px-3 py-1.5 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10"
                aria-label="Select Date"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-on-surface text-sm font-body z-20">
                {(() => {
                  if (!selectedDate) return '';
                  const [y, m, d] = selectedDate.split('-');
                  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const monthIdx = parseInt(m, 10) - 1;
                  if (monthIdx >= 0 && monthIdx < 12) {
                    return `${parseInt(d, 10)} ${months[monthIdx]} ${y}`;
                  }
                  return selectedDate;
                })()}
              </div>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-lg z-20">calendar_month</span>
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full sm:w-32 px-3 py-1.5 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all appearance-none"
                aria-label="Select Time"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-lg">schedule</span>
            </div>
          </div>
        </div>

        {/* Transits Table */}
        <div className="bg-white border border-outline rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-body text-on-surface">
              <thead className="bg-surface border-b border-outline/20 uppercase text-xs font-label text-accent font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-3">{t.planet}</th>
                  <th className="px-4 py-3">{t.rashi}</th>
                  <th className="px-4 py-3">{t.rashiLord}</th>
                  <th className="px-4 py-3">{t.degree}</th>
                  <th className="px-4 py-3">{t.nakshatra}</th>
                  <th className="px-4 py-3">{t.nakshatraLord}</th>
                  <th className="px-4 py-3 text-center">{t.pada}</th>
                  <th className="px-4 py-3">{t.state}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/10">
                {PLANETS_ORDER.map((planetName) => {
                  const pData = currentPositionsMap.get(planetName);
                  if (!pData) return null;

                  const planetSanskrit = PLANET_NAMES[planetName]?.sanskrit || planetName;

                  return (
                    <tr key={planetName} className="hover:bg-surface/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-on-surface flex items-center gap-1.5">
                         {planetName} <span className="font-hindi text-xs font-normal text-on-surface/70">({planetSanskrit})</span>
                      </td>
                      <td className="px-4 py-3">{pData.rasi}</td>
                      <td className="px-4 py-3">{pData.rasiLord}</td>
                      <td className="px-4 py-3 tabular-nums">{pData.degree}</td>
                      <td className="px-4 py-3">{pData.nakshatra}</td>
                      <td className="px-4 py-3">{pData.nakshatraLord}</td>
                      <td className="px-4 py-3 text-center">{pData.pada}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
                          {pData.isRetrograde && (
                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-outline/40">
                               {t.retrograde}
                             </span>
                          )}
                          {pData.isCombust && (
                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface border border-outline/40">
                               {t.combust}
                             </span>
                          )}
                          {!pData.isRetrograde && !pData.isCombust && planetName !== "Sun" && planetName !== "Moon" && planetName !== "Rahu" && planetName !== "Ketu" && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface/50 border border-transparent text-on-surface/80">
                                {t.direct}
                              </span>
                          )}
                           {(planetName === "Sun" || planetName === "Moon" || planetName === "Rahu" || planetName === "Ketu") && !pData.isRetrograde && !pData.isCombust && (
                              <span className="text-on-surface/50">-</span>
                           )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      <ExploreTools currentPath="/transits-table" className="my-6 md:my-8" />
      <Footer />
    </main>
  );
};

export default TransitsTableClientPage;
