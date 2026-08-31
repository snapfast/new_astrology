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
    heroDesc: "View the current live astrological positions and status of all Vedic planets.",
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

  // Use generateAstrologyData for planetary house mapping and positions
  const chartData = useMemo(() => {
    return generateAstrologyData(selectedDate, selectedTime, "28.6139", "77.2090");
  }, [selectedDate, selectedTime]);

  // Using getPlanetTransits fallback for Outer planets since they aren't fully integrated into generateAstrologyData output for this view
  const currentPositionsMap = useMemo(() => {
    const referenceDate = new Date(`${selectedDate}T${selectedTime}:00+05:30`);

    const map = new Map();
    for (const planet of PLANETS_ORDER) {
      // First try to find in chartData
      let pData = chartData.planets.find(p => p.name === planet);

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
  }, [selectedDate, selectedTime, chartData]);

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
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-40 px-3 py-1.5 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all"
            />
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full sm:w-32 px-3 py-1.5 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all"
            />
          </div>
        </div>

        {/* Transits Table */}
        <div className="bg-white border border-outline rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-body text-on-surface">
              <thead className="bg-surface border-b border-outline/30 uppercase text-xs font-label text-accent font-bold tracking-wider">
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
