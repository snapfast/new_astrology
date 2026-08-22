'use client';

import { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import {
  getPlanetTransits,
  PLANET_NAMES,
  getRetrogradeDetails,
  getCombustionDetails,
  TransitEvent,
  COMBUSTION_ORB_LIMITS,
  RETROGRADE_INSIGHTS,
  COMBUSTION_INSIGHTS
} from '@/lib/astrology';
import { sendGAEvent } from '@next/third-parties/google';
import ExploreTools from '@/components/ExploreTools';

const TRANSLATIONS = {
  en: {
    filterPlanet: "Filter by Planet",
    allPlanets: "All Planets",
    heroTitle: "Planetary Transits",
    heroSubtitle: "Gochar Tracker",
    heroDesc: "Track past and future planetary movements across signs (Rashi) and asterisms (Nakshatra). Predict shift in cosmic energies.",
    referenceTime: "Reference Date & Time (IST)",
    rashiTransits: "Rashi Transits",
    nakshatraTransits: "Nakshatra Transits",
    retrograde: "Retrograde",
    combust: "Combust",
    direct: "Direct",
    eduTitle: "Vedic Planetary Transits (Gochara)",
    eduIntro: "In Vedic Astrology, the movement of planets across the zodiac is known as Gochara (Transits). While your birth chart (Kundli) represents your life's blueprint, transits trigger the timing of events and direct current environmental energies.",
    sunTitle: "Sun (Surya)",
    sunDesc: "Transits every sign in about 30 days. Triggers shifts in career focus, vitality, authority, and public recognition.",
    moonTitle: "Moon (Chandra)",
    moonDesc: "The fastest moving celestial body, transiting a sign in 2.25 days. Governs daily mood, intuition, and mental state.",
    marsTitle: "Mars (Mangala)",
    marsDesc: "Transits a sign in about 45 days. Drives action, ambition, courage, physical energy, and potential conflicts.",
    mercuryTitle: "Mercury (Budha)",
    mercuryDesc: "Transits a sign in roughly 15-20 days. Governs speech, logic, business dealings, travels, and analytical decisions.",
    jupiterTitle: "Jupiter (Guru)",
    jupiterDesc: "A slow-moving planet transiting a sign in about 1 year. Brings massive growth, fortune, knowledge, and spiritual progress.",
    venusTitle: "Venus (Shukra)",
    venusDesc: "Transits a sign in roughly 30 days. Influences relationships, creativity, luxury, wealth, and sensual pleasure.",
    saturnTitle: "Saturn (Shani)",
    saturnDesc: "The slowest major planet, transiting a sign in 2.5 years. Demands discipline, focus, structured lessons, and persistence.",
    rahuKetuTitle: "Rahu & Ketu",
    rahuKetuDesc: "The shadow nodes transit a sign in 1.5 years. Rahu triggers intense desires and innovation, while Ketu drives detachment and spiritual liberation.",
    uranusTitle: "Uranus (Aruna)",
    uranusDesc: "A slow-moving planet transiting a sign in about 7 years. Governs revolution, sudden shifts, innovation, and technological breakthroughs.",
    neptuneTitle: "Neptune (Varuna)",
    neptuneDesc: "Transits a sign in roughly 14 years. Influences mass consciousness, dreams, spiritual alignment, illusion, and artistic expression.",
    plutoTitle: "Pluto (Yama)",
    plutoDesc: "The slowest outer planet, transiting a sign in 12-30 years. Rules transformation, rebirth, deep psychological shifts, and generational changes.",
    combustionTitle: "Planetary Combustion (Asta) Periods",
    combustionSubtitle: "Combustion occurs when a planet transits too close to the Sun, temporarily weakening its material expression and highlighting internal or spiritual lessons.",
    currentlyCombust: "Currently Combust (Asta)",
    upcomingCombustion: "Upcoming Combustion",
    combustFrom: "From",
    combustTo: "To",
    noCombustions: "No upcoming combustion periods found in the near future.",
    retrogradeLabel: "Retrograde",
    combustLabel: "Combustion",
    currentOrUpcoming: "Current / Next",
    previousPeriod: "Previous",
    retrogradeTitle: "Retrograde Motion (Vakri)",
    combustTitle: "Combustion (Asta)",
    combustAndRetroOverview: "Planetary Retrograde & Combustion Overview",
    overviewSubtitle: "Special motion states alter planetary expression: Retrograde (Vakri) directs energy inward, while Combustion (Asta) obscures external material manifestations under solar intensity.",
    allOverview: "All Phenomena",
    retrogradeOnly: "Retrograde (Vakri)",
    combustionOnly: "Combustion (Asta)",
    activeNow: "Active Now",
    upcoming: "Upcoming",
    ended: "Ended",
    durationDays: "days",
    combustionOrb: "Combustion Orb Limit",
    astrologicalGuidance: "Astrological Guidance",
    keyRemedies: "Key Recommendation",
    noRashiTransit: "Long-term sign transit (no sign change near this reference date).",
    noNakshatraTransit: "No nakshatra change near this reference date."
  }
};

const PLANETS_ORDER = ["Moon", "Mercury", "Venus", "Sun", "Mars", "Jupiter", "Rahu", "Ketu", "Saturn", "Uranus", "Neptune", "Pluto"];

const TransitsClientPage = () => {
  const t = TRANSLATIONS.en;

  // Static default for deterministic SSR/hydration
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

  const [selectedPlanet, setSelectedPlanet] = useState("all");
  const [overviewTab, setOverviewTab] = useState<"all" | "retro" | "combust">("all");

  const referenceDate = useMemo(() => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const [hour, minute] = selectedTime.split(':').map(Number);
    const localMs = Date.UTC(year, month - 1, day, hour, minute);
    return new Date(localMs - 5.5 * 60 * 60 * 1000);
  }, [selectedDate, selectedTime]);

  const transitsData = useMemo(() => {
    const planetsToCalc = selectedPlanet === "all" ? PLANETS_ORDER : [selectedPlanet];
    return planetsToCalc.map(planet => getPlanetTransits(planet, referenceDate));
  }, [referenceDate, selectedPlanet]);

  const retroAndCombustDetails = useMemo(() => {
    const detailsMap: Record<string, { retroDetails: ReturnType<typeof getRetrogradeDetails>, combustDetails: ReturnType<typeof getCombustionDetails> }> = {};
    const planetsToCalc = selectedPlanet === "all" ? PLANETS_ORDER : [selectedPlanet];
    for (const planet of planetsToCalc) {
      detailsMap[planet] = {
        retroDetails: getRetrogradeDetails(planet, referenceDate),
        combustDetails: getCombustionDetails(planet, referenceDate)
      };
    }
    return detailsMap;
  }, [referenceDate, selectedPlanet]);


  const formatISTDate = (date: Date) => {
    const istMs = date.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = istDate.getUTCDate();
    const m = months[istDate.getUTCMonth()];
    const y = istDate.getUTCFullYear();
    const hrs = istDate.getUTCHours().toString().padStart(2, '0');
    const mins = istDate.getUTCMinutes().toString().padStart(2, '0');
    return `${d} ${m} ${y}, ${hrs}:${mins} IST`;
  };

  const formatCombustionDate = (date: Date) => {
    const istMs = date.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = istDate.getUTCDate();
    const m = months[istDate.getUTCMonth()];
    const y = istDate.getUTCFullYear();
    return `${d} ${m} ${y}`;
  };

  const getDaysDuration = (start: Date | null, end: Date | null) => {
    if (!start || !end) return null;
    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return days;
  };

  const getPhaseStatusBadge = (start: Date | null, end: Date | null, refDate: Date, type: "retro" | "combust" = "retro") => {
    if (!start || !end) return null;
    const refMs = refDate.getTime();
    const startMs = start.getTime();
    const endMs = end.getTime();

    if (refMs >= startMs && refMs <= endMs) {
      return {
        label: t.activeNow,
        className: type === "combust" ? "bg-red-100 text-red-700 border-red-300" : "bg-amber-100 text-amber-800 border-amber-300"
      };
    } else if (refMs < startMs) {
      const daysUntil = Math.ceil((startMs - refMs) / (1000 * 60 * 60 * 24));
      return {
        label: `${t.upcoming} (${daysUntil}d)`,
        className: type === "combust" ? "bg-red-50 text-red-600 border-red-200" : "bg-amber-50 text-amber-800 border-amber-200"
      };
    } else {
      return {
        label: t.ended,
        className: "bg-gray-100 text-gray-600 border-gray-200"
      };
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.heroTitle}
        description={t.heroDesc}
      />

      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Input Parameters Card */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-outline rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <h2 className="text-xs uppercase font-label text-accent font-bold tracking-widest">{t.referenceTime}</h2>
            <p className="text-sm text-on-surface font-body">Change date or time to view movements relative to a specific moment.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Filter by Planet Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedPlanet}
                onChange={(e) => {
                  setSelectedPlanet(e.target.value);
                  sendGAEvent({ event: 'action_click', action_name: 'transits_filter_planet', planet: e.target.value });
                }}
                className="w-full sm:w-48 pl-4 pr-10 py-2.5 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label={t.filterPlanet}
              >
                <option value="all">{t.allPlanets}</option>
                {PLANETS_ORDER.map((planet) => {
                  const planetSanskrit = PLANET_NAMES[planet]?.sanskrit || planet;
                  return (
                    <option key={planet} value={planet}>
                      {planet} ({planetSanskrit})
                    </option>
                  );
                })}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl">expand_more</span>
            </div>

            <div className="relative w-full sm:w-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-48 px-4 py-2.5 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10"
                aria-label="Select Date"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface text-sm font-body z-20">
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl z-20">calendar_month</span>
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full sm:w-36 px-4 py-2.5 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all appearance-none"
                aria-label="Select Time"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl">schedule</span>
            </div>
          </div>
        </div>

        {/* Transits List Grid */}
        <div data-testid="transits-grid" className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {transitsData.map((transit) => {
            const planetName = transit.planet;
            const planetSanskrit = PLANET_NAMES[planetName]?.sanskrit || planetName;

            const { retroDetails, combustDetails } = retroAndCombustDetails[planetName] || { retroDetails: null, combustDetails: null };
            const currentPos = transit.current;

            // Combine past and future events chronologically
            const allEvents = [...transit.past, ...transit.future].sort((a, b) => a.date.getTime() - b.date.getTime());

            // Deduplicate events with same type, from, to, and close date
            const uniqueEvents: TransitEvent[] = [];
            for (const ev of allEvents) {
              const isDuplicate = uniqueEvents.some(
                existing => existing.type === ev.type &&
                            existing.fromValue === ev.fromValue &&
                            existing.toValue === ev.toValue &&
                            Math.abs(existing.date.getTime() - ev.date.getTime()) < 1000 * 60 * 60
              );
              if (!isDuplicate) {
                uniqueEvents.push(ev);
              }
            }

            const rashiEvents = uniqueEvents.filter(ev => ev.type === 'rashi');
            const nakshatraEvents = uniqueEvents.filter(ev => ev.type === 'nakshatra');

            return (
              <div key={planetName} className="bg-white border border-outline rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Card Header: Name + Badges + Position */}
                  <div className="border-b border-outline/10 pb-3 flex flex-col space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 data-testid="transit-card-title" className="text-xl font-headline font-bold text-on-surface flex items-baseline gap-2">
                        {planetName} <span className="font-hindi text-base font-normal text-on-surface/70">({planetSanskrit})</span>
                      </h3>

                      {currentPos && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {currentPos.isRetrograde && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                              <span className="material-symbols-outlined text-[14px]">sync_alt</span>
                              {t.retrograde}
                            </span>
                          )}
                          {currentPos.isCombust && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error/10 text-error">
                              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                              {t.combust}
                            </span>
                          )}
                          {!currentPos.isRetrograde && !currentPos.isCombust && planetName !== "Sun" && planetName !== "Moon" && planetName !== "Rahu" && planetName !== "Ketu" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success">
                              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                              {t.direct}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {currentPos && (
                      <p className="text-xs font-body text-on-surface/80">
                        Current: <span className="font-semibold text-on-surface">{currentPos.rasi}</span> ({currentPos.degree}) • <span className="font-semibold text-on-surface">{currentPos.nakshatra}</span> ({currentPos.pada} Pada)
                      </p>
                    )}
                  </div>

                  {/* 2-Column Bullets Layout: Rashi & Nakshatra Transits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                    {/* Column 1: Rashi Transits */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-label uppercase font-bold tracking-wider text-accent border-b border-outline/10 pb-1">
                        {t.rashiTransits}
                      </h4>
                      {rashiEvents.length > 0 ? (
                        <ul className="space-y-2.5">
                          {rashiEvents.map((ev, i) => (
                            <li key={i} className="text-sm font-body text-on-surface flex items-start gap-2">
                              <span className="text-accent text-base leading-none select-none">•</span>
                              <div>
                                <div className="font-medium text-on-surface">
                                  {ev.fromValue} &rarr; {ev.toValue}
                                </div>
                                <div className="text-xs text-on-surface/70">{formatISTDate(ev.date)}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-on-surface/60 italic font-body">{t.noRashiTransit}</p>
                      )}
                    </div>

                    {/* Column 2: Nakshatra Transits */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-label uppercase font-bold tracking-wider text-accent border-b border-outline/10 pb-1">
                        {t.nakshatraTransits}
                      </h4>
                      {nakshatraEvents.length > 0 ? (
                        <ul className="space-y-2.5">
                          {nakshatraEvents.map((ev, i) => (
                            <li key={i} className="text-sm font-body text-on-surface flex items-start gap-2">
                              <span className="text-accent text-base leading-none select-none">•</span>
                              <div>
                                <div className="font-medium text-on-surface">
                                  {ev.fromValue} &rarr; {ev.toValue}
                                </div>
                                <div className="text-xs text-on-surface/70">{formatISTDate(ev.date)}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-on-surface/60 italic font-body">{t.noNakshatraTransit}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Retrograde & Combustion Detailed Cards */}
                {(retroDetails || combustDetails) && (
                  <div className="pt-4 border-t border-outline/10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body">
                      {/* Retrograde Box */}
                      {retroDetails && (() => {
                        const retroInsight = RETROGRADE_INSIGHTS[planetName];
                        const currOrNextBadge = getPhaseStatusBadge(retroDetails.currentOrNext.start, retroDetails.currentOrNext.end, referenceDate, "retro");
                        const currOrNextDuration = getDaysDuration(retroDetails.currentOrNext.start, retroDetails.currentOrNext.end);
                        const prevDuration = getDaysDuration(retroDetails.previous.start, retroDetails.previous.end);

                        const periods = [
                          { ...retroDetails.currentOrNext, duration: currOrNextDuration },
                          { ...retroDetails.previous, duration: prevDuration }
                        ].filter(p => p.start && p.end);

                        return (
                          <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-3.5 space-y-3 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs uppercase tracking-wider text-amber-800 font-label font-bold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px]">sync_alt</span>
                                  {t.retrogradeTitle}
                                </span>
                                {currOrNextBadge && (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currOrNextBadge.className}`}>
                                    {currOrNextBadge.label}
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1.5 pt-1 border-t border-amber-200/60">
                                {periods.map((p, pIdx) => {
                                  if (!p.start || !p.end) return null;
                                  const refMs = referenceDate.getTime();
                                  const isActive = refMs >= p.start.getTime() && refMs <= p.end.getTime();

                                  return (
                                    <div
                                      key={pIdx}
                                      className={`p-2 rounded-lg transition-all ${
                                        isActive
                                          ? 'bg-amber-100/90 border border-amber-300/90 shadow-2xs font-semibold'
                                          : 'bg-white/60 border border-amber-200/40'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-on-surface">
                                            {formatCombustionDate(p.start)} &rarr; {formatCombustionDate(p.end)}
                                          </span>
                                          {isActive && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-400/50">
                                              {t.activeNow}
                                            </span>
                                          )}
                                        </div>
                                        {p.duration && (
                                          <span className="text-[11px] text-amber-900 font-medium shrink-0">
                                            {p.duration} {t.durationDays}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {retroInsight && (
                              <div className="pt-2 border-t border-amber-200/60 text-[11px] text-on-surface space-y-1">
                                <p className="leading-snug">{retroInsight.summary}</p>
                                <p className="text-[10px] text-amber-800 font-medium leading-snug">💡 {retroInsight.guidance}</p>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Combustion Box */}
                      {combustDetails && (() => {
                        const combustInsight = COMBUSTION_INSIGHTS[planetName];
                        const orbInfo = COMBUSTION_ORB_LIMITS[planetName];
                        const currOrNextBadge = getPhaseStatusBadge(combustDetails.currentOrNext.start, combustDetails.currentOrNext.end, referenceDate, "combust");
                        const currOrNextDuration = getDaysDuration(combustDetails.currentOrNext.start, combustDetails.currentOrNext.end);
                        const prevDuration = getDaysDuration(combustDetails.previous.start, combustDetails.previous.end);

                        const periods = [
                          { ...combustDetails.currentOrNext, duration: currOrNextDuration },
                          { ...combustDetails.previous, duration: prevDuration }
                        ].filter(p => p.start && p.end);

                        return (
                          <div className="bg-red-50/50 border border-red-200/80 rounded-xl p-3.5 space-y-3 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs uppercase tracking-wider text-red-700 font-label font-bold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px] text-red-600">local_fire_department</span>
                                  {t.combustTitle}
                                </span>
                                {currOrNextBadge && (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currOrNextBadge.className}`}>
                                    {currOrNextBadge.label}
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1.5 pt-1 border-t border-red-200/60">
                                {periods.map((p, pIdx) => {
                                  if (!p.start || !p.end) return null;
                                  const refMs = referenceDate.getTime();
                                  const isActive = refMs >= p.start.getTime() && refMs <= p.end.getTime();

                                  return (
                                    <div
                                      key={pIdx}
                                      className={`p-2 rounded-lg transition-all ${
                                        isActive
                                          ? 'bg-red-100/90 border border-red-300/90 shadow-2xs font-semibold'
                                          : 'bg-white/60 border border-red-200/40'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-on-surface">
                                            {formatCombustionDate(p.start)} &rarr; {formatCombustionDate(p.end)}
                                          </span>
                                          {isActive && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-200 text-red-900 border border-red-400/50">
                                              {t.activeNow}
                                            </span>
                                          )}
                                        </div>
                                        {p.duration && (
                                          <span className="text-[11px] text-red-900 font-medium shrink-0">
                                            {p.duration} {t.durationDays}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}

                                {orbInfo && (
                                  <div className="text-[10px] text-red-800 font-medium pt-1">
                                    {t.combustionOrb}: <span className="font-semibold text-red-950">within {orbInfo.direct}° of Sun</span> {orbInfo.retro ? `(${orbInfo.retro}° in retro)` : ''}
                                  </div>
                                )}
                              </div>
                            </div>

                            {combustInsight && (
                              <div className="pt-2 border-t border-red-200/60 text-[11px] text-on-surface space-y-1">
                                <p className="leading-snug">{combustInsight.summary}</p>
                                <p className="text-[10px] text-red-700 font-medium leading-snug">🔥 {combustInsight.guidance}</p>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Comprehensive Planetary Retrograde & Combustion Overview Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white border border-outline rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline/10 pb-4">
            <div>
              <h2 className="text-2xl font-headline font-bold text-on-surface">{t.combustAndRetroOverview}</h2>
              <p className="text-sm text-on-surface/80 font-body mt-1 max-w-3xl">{t.overviewSubtitle}</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-surface border border-outline/30 p-1 rounded-xl self-start md:self-auto">
              <button
                type="button"
                onClick={() => setOverviewTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${overviewTab === "all" ? 'bg-white text-on-surface shadow-xs font-semibold' : 'text-on-surface/70 hover:text-on-surface'}`}
              >
                {t.allOverview}
              </button>
              <button
                type="button"
                onClick={() => setOverviewTab("retro")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${overviewTab === "retro" ? 'bg-white text-accent shadow-xs font-semibold' : 'text-on-surface/70 hover:text-on-surface'}`}
              >
                {t.retrogradeOnly}
              </button>
              <button
                type="button"
                onClick={() => setOverviewTab("combust")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${overviewTab === "combust" ? 'bg-white text-error shadow-xs font-semibold' : 'text-on-surface/70 hover:text-on-surface'}`}
              >
                {t.combustionOnly}
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(() => {
              const overviewCards: Array<{
                planet: string;
                type: "retro" | "combust";
                start: Date;
                end: Date;
                isCurrent: boolean;
              }> = [];

              const activePlanets = selectedPlanet === "all" ? PLANETS_ORDER : [selectedPlanet];

              for (const planet of activePlanets) {
                const details = retroAndCombustDetails[planet];
                if (!details) continue;

                // Retrograde period
                if (details.retroDetails?.currentOrNext.start && details.retroDetails?.currentOrNext.end) {
                  const start = details.retroDetails.currentOrNext.start;
                  const end = details.retroDetails.currentOrNext.end;
                  const refMs = referenceDate.getTime();
                  const isCurrent = refMs >= start.getTime() && refMs <= end.getTime();
                  overviewCards.push({ planet, type: "retro", start, end, isCurrent });
                }

                // Combustion period
                if (details.combustDetails?.currentOrNext.start && details.combustDetails?.currentOrNext.end) {
                  const start = details.combustDetails.currentOrNext.start;
                  const end = details.combustDetails.currentOrNext.end;
                  const refMs = referenceDate.getTime();
                  const isCurrent = refMs >= start.getTime() && refMs <= end.getTime();
                  overviewCards.push({ planet, type: "combust", start, end, isCurrent });
                }
              }

              // Filter based on overview tab
              const filteredCards = overviewCards.filter(c => {
                if (overviewTab === "retro") return c.type === "retro";
                if (overviewTab === "combust") return c.type === "combust";
                return true;
              }).sort((a, b) => a.start.getTime() - b.start.getTime());

              if (filteredCards.length === 0) {
                return <p className="text-sm text-on-surface italic col-span-full py-4">{t.noCombustions}</p>;
              }

              return filteredCards.map((card, idx) => {
                const planetSanskrit = PLANET_NAMES[card.planet]?.sanskrit || card.planet;
                const duration = getDaysDuration(card.start, card.end);
                const isRetro = card.type === "retro";
                const statusBadge = getPhaseStatusBadge(card.start, card.end, referenceDate, card.type);
                const insight = isRetro ? RETROGRADE_INSIGHTS[card.planet] : COMBUSTION_INSIGHTS[card.planet];
                const orbInfo = !isRetro ? COMBUSTION_ORB_LIMITS[card.planet] : null;

                return (
                  <div
                    key={`${card.planet}-${card.type}-${idx}`}
                    className={`border rounded-xl p-5 space-y-3.5 flex flex-col justify-between hover:shadow-xs transition-all ${
                      isRetro
                        ? 'bg-amber-50/40 border-amber-200/70'
                        : 'bg-red-50/40 border-red-200/70'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-headline font-bold text-on-surface flex items-baseline gap-1.5">
                          {card.planet} <span className="font-hindi text-xs font-normal text-on-surface/70">({planetSanskrit})</span>
                        </h3>
                        {statusBadge && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.className}`}>
                            {statusBadge.label}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-md ${isRetro ? 'bg-amber-100 text-amber-800 border border-amber-300/60' : 'bg-red-100 text-red-700 border border-red-300/60'}`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {isRetro ? "sync_alt" : "local_fire_department"}
                          </span>
                          {isRetro ? t.retrogradeTitle : t.combustTitle}
                        </span>
                        {duration && (
                          <span className="text-xs text-on-surface/70 font-body">
                            ({duration} {t.durationDays})
                          </span>
                        )}
                      </div>

                      <div className={`text-xs text-on-surface p-2.5 rounded-lg border space-y-1 font-body ${
                        card.isCurrent
                          ? (isRetro ? 'bg-amber-100/80 border-amber-300 font-medium' : 'bg-red-100/80 border-red-300 font-medium')
                          : (isRetro ? 'bg-white/60 border-amber-200/50' : 'bg-white/60 border-red-200/50')
                      }`}>
                        <div className="flex items-center justify-between">
                          <span>
                            <span className="text-on-surface/70">{t.combustFrom}:</span> <span className="font-semibold text-on-surface">{formatCombustionDate(card.start)}</span>
                          </span>
                          {card.isCurrent && (
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isRetro ? 'bg-amber-200 text-amber-900' : 'bg-red-200 text-red-900'}`}>
                              {t.activeNow}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-on-surface/70">{t.combustTo}:</span> <span className="font-semibold text-on-surface">{formatCombustionDate(card.end)}</span>
                        </div>
                        {orbInfo && (
                          <div className="text-[11px] text-red-800 font-medium pt-0.5">
                            {t.combustionOrb}: <span className="font-semibold text-on-surface">within {orbInfo.direct}° of Sun</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {insight && (
                      <div className={`pt-3 border-t text-xs text-on-surface space-y-1 font-body ${isRetro ? 'border-amber-200/60' : 'border-red-200/60'}`}>
                        <p className="leading-relaxed">{insight.summary}</p>
                        <p className={`text-[11px] font-medium leading-snug pt-0.5 ${isRetro ? 'text-amber-800' : 'text-red-700'}`}>
                          {isRetro ? '💡' : '🔥'} {insight.guidance}
                        </p>
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-8 md:py-16 bg-white border-y border-outline/30">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-headline text-on-surface">{t.eduTitle}</h2>
          <p className="text-sm md:text-base text-on-surface font-body leading-relaxed max-w-2xl mx-auto">
            {t.eduIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left not-prose pt-4">
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.sunTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.sunDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.moonTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.moonDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.marsTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.marsDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.mercuryTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.mercuryDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.jupiterTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.jupiterDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.venusTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.venusDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.saturnTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.saturnDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.rahuKetuTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.rahuKetuDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.uranusTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.uranusDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.neptuneTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.neptuneDesc}</p>
            </div>
            <div className="p-5 bg-surface rounded-xl border border-outline/40 space-y-1 md:col-span-2 md:max-w-xl md:mx-auto md:w-full">
              <h3 className="text-base font-semibold text-on-surface">{t.plutoTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.plutoDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <ExploreTools currentPath="/transits" className="my-12" />

      <Footer />
    </main>
  );
};

export default TransitsClientPage;
