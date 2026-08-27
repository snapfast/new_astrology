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
    retrogradeTitle: "Retrograde",
    combustTitle: "Combustion",
    activeNow: "Active Now",
    upcoming: "Upcoming",
    ended: "Ended",
    durationDays: "days",
    combustionOrb: "Orb Limit",
    astrologicalGuidance: "Astrological Guidance",
    keyRemedies: "Key Recommendation",
    noRashiTransit: "Long-term sign transit (no sign change near this reference date).",
    noNakshatraTransit: "No nakshatra change near this reference date.",
    currentTransit: "Current Transit"
  }
};

const PLANETS_ORDER = ["Moon", "Mercury", "Venus", "Sun", "Mars", "Jupiter", "Rahu", "Ketu", "Saturn", "Uranus", "Neptune", "Pluto"];

const RASHI_SYMBOLS: Record<string, string> = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
};

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

  const getPhaseStatusBadge = (start: Date | null, end: Date | null, refDate: Date) => {
    if (!start || !end) return null;
    const refMs = refDate.getTime();
    const startMs = start.getTime();
    const endMs = end.getTime();

    if (refMs >= startMs && refMs <= endMs) {
      return {
        label: t.activeNow,
        className: "bg-surface text-on-surface border-outline/40"
      };
    } else if (refMs < startMs) {
      const daysUntil = Math.ceil((startMs - refMs) / (1000 * 60 * 60 * 24));
      return {
        label: `${t.upcoming} (${daysUntil}d)`,
        className: "bg-surface text-on-surface border-outline/30"
      };
    } else {
      return {
        label: t.ended,
        className: "bg-surface/50 text-on-surface/60 border-outline/20"
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

      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5 md:space-y-6">
        {/* Input Parameters Card */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-outline rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <h2 className="text-xs uppercase font-label text-accent font-bold tracking-widest">{t.referenceTime}</h2>
            <p className="text-sm text-on-surface font-body">Change date or time to view movements relative to a specific moment.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Filter by Planet Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedPlanet}
                onChange={(e) => {
                  setSelectedPlanet(e.target.value);
                  sendGAEvent({ event: 'action_click', action_name: 'transits_filter_planet', planet: e.target.value });
                }}
                className="w-full sm:w-48 pl-4 pr-10 py-2 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
                className="w-full sm:w-48 px-4 py-2 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10"
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
                className="w-full sm:w-36 px-4 py-2 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all appearance-none"
                aria-label="Select Time"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl">schedule</span>
            </div>
          </div>
        </div>

        {/* Legend Bar */}
        <div data-testid="transits-legend-bar" className="flex flex-wrap items-center justify-between gap-2.5 bg-white rounded-xl py-1 px-3 text-[11px] font-body shadow-2xs border-none">
          <div className="flex items-center gap-1.5 text-on-surface font-semibold shrink-0">
            <span className="material-symbols-outlined text-sm text-on-surface">info</span>
            <span>Legend:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-5">
            <div className="flex items-center gap-1">
              <span title={`${t.retrograde} (Vakri)`} className="inline-flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[15px]">sync_alt</span>
              </span>
              <span className="text-on-surface/80 text-[11px] font-medium">{t.retrograde} <span className="text-on-surface/60 text-[10px]">(Vakri)</span></span>
            </div>
            <div className="flex items-center gap-1">
              <span title={`${t.combust} (Asta)`} className="inline-flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
              </span>
              <span className="text-on-surface/80 text-[11px] font-medium">{t.combust} <span className="text-on-surface/60 text-[10px]">(Asta)</span></span>
            </div>
            <div className="flex items-center gap-1">
              <span title={`${t.direct} (Forward)`} className="inline-flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </span>
              <span className="text-on-surface/80 text-[11px] font-medium">{t.direct} <span className="text-on-surface/60 text-[10px]">(Forward)</span></span>
            </div>
            <div className="flex items-center gap-1">
              <span title={t.currentTransit} className="inline-flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[13px]">adjust</span>
              </span>
              <span className="text-on-surface/80 text-[11px] font-medium">{t.currentTransit}</span>
            </div>
          </div>
        </div>

        {/* Transits List Grid */}
        <div data-testid="transits-grid" className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
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
              <div key={planetName} className="bg-white border border-outline rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Card Header: Name + Badges + Position */}
                  <div className="border-b border-outline/10 pb-2.5 flex flex-col space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 data-testid="transit-card-title" className="text-xl font-headline font-bold text-on-surface flex items-baseline gap-2">
                        {planetName} <span className="font-hindi text-base font-normal text-on-surface/70">({planetSanskrit})</span>
                      </h3>

                      {currentPos && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {currentPos.isRetrograde && (
                            <span title={`${t.retrograde} (Vakri)`} className="inline-flex items-center justify-center text-on-surface">
                              <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                            </span>
                          )}
                          {currentPos.isCombust && (
                            <span title={`${t.combust} (Asta)`} className="inline-flex items-center justify-center text-on-surface">
                              <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                            </span>
                          )}
                          {!currentPos.isRetrograde && !currentPos.isCombust && planetName !== "Sun" && planetName !== "Moon" && planetName !== "Rahu" && planetName !== "Ketu" && (
                            <span title={`${t.direct} (Forward)`} className="inline-flex items-center justify-center text-on-surface">
                              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-0.5">
                    {/* Column 1: Rashi Transits */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-label uppercase font-bold tracking-wider text-accent border-b border-outline/10 pb-1">
                        {t.rashiTransits}
                      </h4>
                      {rashiEvents.length > 0 ? (
                        <ul className="space-y-1.5">
                          {(() => {
                            let lastPastIdx = -1;
                            for (let idx = 0; idx < rashiEvents.length; idx++) {
                              if (rashiEvents[idx].date.getTime() <= referenceDate.getTime()) {
                                lastPastIdx = idx;
                              }
                            }
                            return rashiEvents.map((ev, i) => {
                              const isCurrent = lastPastIdx !== -1 && i === lastPastIdx;

                              return (
                                <li
                                  key={i}
                                  className={`text-sm font-body text-on-surface flex items-start gap-2 transition-all ${
                                    isCurrent
                                      ? 'p-2 rounded-lg bg-accent/10 border border-accent/30 shadow-2xs font-medium'
                                      : 'p-1 rounded-md'
                                  }`}
                                >
                                  <span className={`text-base leading-none select-none mt-0.5 ${isCurrent ? 'text-accent font-bold' : 'text-accent/70'}`}>•</span>
                                  <div className="w-full space-y-0.5">
                                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                                      <div className="font-semibold text-on-surface">
                                        {ev.fromValue} {RASHI_SYMBOLS[ev.fromValue] ? <span className="font-normal text-on-surface/70">{RASHI_SYMBOLS[ev.fromValue]}</span> : ''} &rarr; {ev.toValue} {RASHI_SYMBOLS[ev.toValue] ? <span className="font-normal text-on-surface/70">{RASHI_SYMBOLS[ev.toValue]}</span> : ''}
                                      </div>
                                      {isCurrent && (
                                        <span title={t.currentTransit} className="inline-flex items-center justify-center text-on-surface">
                                          <span className="material-symbols-outlined text-[15px]">adjust</span>
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-on-surface/70">{formatISTDate(ev.date)}</div>
                                  </div>
                                </li>
                              );
                            });
                          })()}
                        </ul>
                      ) : (
                        <p className="text-xs text-on-surface/60 italic font-body">{t.noRashiTransit}</p>
                      )}
                    </div>

                    {/* Column 2: Nakshatra Transits */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-label uppercase font-bold tracking-wider text-accent border-b border-outline/10 pb-1">
                        {t.nakshatraTransits}
                      </h4>
                      {nakshatraEvents.length > 0 ? (
                        <ul className="space-y-1.5">
                          {(() => {
                            let lastPastIdx = -1;
                            for (let idx = 0; idx < nakshatraEvents.length; idx++) {
                              if (nakshatraEvents[idx].date.getTime() <= referenceDate.getTime()) {
                                lastPastIdx = idx;
                              }
                            }
                            return nakshatraEvents.map((ev, i) => {
                              const isCurrent = lastPastIdx !== -1 && i === lastPastIdx;

                              return (
                                <li
                                  key={i}
                                  className={`text-sm font-body text-on-surface flex items-start gap-2 transition-all ${
                                    isCurrent
                                      ? 'p-2 rounded-lg bg-accent/10 border border-accent/30 shadow-2xs font-medium'
                                      : 'p-1 rounded-md'
                                  }`}
                                >
                                  <span className={`text-base leading-none select-none mt-0.5 ${isCurrent ? 'text-accent font-bold' : 'text-accent/70'}`}>•</span>
                                  <div className="w-full space-y-0.5">
                                    <div className="flex items-center justify-between gap-1.5 flex-wrap">
                                      <div className="font-semibold text-on-surface">
                                        {ev.fromValue} &rarr; {ev.toValue}
                                      </div>
                                      {isCurrent && (
                                        <span title={t.currentTransit} className="inline-flex items-center justify-center text-on-surface">
                                          <span className="material-symbols-outlined text-[15px]">adjust</span>
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs text-on-surface/70">{formatISTDate(ev.date)}</div>
                                  </div>
                                </li>
                              );
                            });
                          })()}
                        </ul>
                      ) : (
                        <p className="text-xs text-on-surface/60 italic font-body">{t.noNakshatraTransit}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Retrograde & Combustion Detailed Cards */}
                {(retroDetails || combustDetails) && (
                  <div className="pt-3 border-t border-outline/10 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-body">
                      {/* Retrograde Box */}
                      {retroDetails && (() => {
                        const retroInsight = RETROGRADE_INSIGHTS[planetName];
                        const currOrNextBadge = getPhaseStatusBadge(retroDetails.currentOrNext.start, retroDetails.currentOrNext.end, referenceDate, "retro");
                        const currOrNextDuration = getDaysDuration(retroDetails.currentOrNext.start, retroDetails.currentOrNext.end);
                        const prevDuration = getDaysDuration(retroDetails.previous.start, retroDetails.previous.end);

                        const periods = [
                          { ...retroDetails.currentOrNext, duration: currOrNextDuration },
                          { ...retroDetails.previous, duration: prevDuration }
                        ].filter((p): p is { start: Date; end: Date; duration: number | null } => p.start !== null && p.end !== null)
                         .sort((a, b) => a.start.getTime() - b.start.getTime());

                        return (
                          <div className="bg-transparent border border-outline/40 rounded-xl p-2.5 md:p-3 space-y-2 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs uppercase tracking-wider text-on-surface font-label font-bold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px]">sync_alt</span>
                                  {t.retrogradeTitle}
                                </span>
                                {currOrNextBadge && (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currOrNextBadge.className}`}>
                                    {currOrNextBadge.label}
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1 pt-1 border-t border-outline/20">
                                {periods.map((p, pIdx) => {
                                  if (!p.start || !p.end) return null;
                                  const refMs = referenceDate.getTime();
                                  const isActive = refMs >= p.start.getTime() && refMs <= p.end.getTime();

                                  return (
                                    <div
                                      key={pIdx}
                                      className={`p-1.5 rounded-lg transition-all ${
                                        isActive
                                          ? 'bg-surface border border-outline/30 shadow-2xs font-semibold'
                                          : 'bg-surface/50 border border-outline/20'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-on-surface">
                                            {formatCombustionDate(p.start)} &rarr; {formatCombustionDate(p.end)}
                                          </span>
                                          {isActive && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-surface text-on-surface border border-outline/40">
                                              {t.activeNow}
                                            </span>
                                          )}
                                        </div>
                                        {p.duration && (
                                          <span className="text-[11px] text-on-surface/80 font-medium shrink-0">
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
                              <div className="pt-1.5 border-t border-outline/20 text-[11px] text-on-surface space-y-0.5">
                                <p className="leading-snug">{retroInsight.summary}</p>
                                <p className="text-[10px] text-on-surface/80 font-medium leading-snug flex items-start gap-1">
                                  <span className="material-symbols-outlined text-[13px] leading-none shrink-0 mt-[1px]">lightbulb</span>
                                  <span>{retroInsight.guidance}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Combustion Box */}
                      {combustDetails && (() => {
                        const combustInsight = COMBUSTION_INSIGHTS[planetName];
                        const orbInfo = COMBUSTION_ORB_LIMITS[planetName];
                        const currOrNextBadge = getPhaseStatusBadge(combustDetails.currentOrNext.start, combustDetails.currentOrNext.end, referenceDate);
                        const currOrNextDuration = getDaysDuration(combustDetails.currentOrNext.start, combustDetails.currentOrNext.end);
                        const prevDuration = getDaysDuration(combustDetails.previous.start, combustDetails.previous.end);

                        const periods = [
                          { ...combustDetails.currentOrNext, duration: currOrNextDuration },
                          { ...combustDetails.previous, duration: prevDuration }
                        ].filter((p): p is { start: Date; end: Date; duration: number | null } => p.start !== null && p.end !== null)
                         .sort((a, b) => a.start.getTime() - b.start.getTime());

                        return (
                          <div className="bg-transparent border border-outline/40 rounded-xl p-2.5 md:p-3 space-y-2 flex flex-col justify-between">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs uppercase tracking-wider text-on-surface font-label font-bold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[15px] text-on-surface">local_fire_department</span>
                                  {t.combustTitle}
                                </span>
                                {currOrNextBadge && (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${currOrNextBadge.className}`}>
                                    {currOrNextBadge.label}
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1 pt-1 border-t border-outline/20">
                                {periods.map((p, pIdx) => {
                                  if (!p.start || !p.end) return null;
                                  const refMs = referenceDate.getTime();
                                  const isActive = refMs >= p.start.getTime() && refMs <= p.end.getTime();

                                  return (
                                    <div
                                      key={pIdx}
                                      className={`p-1.5 rounded-lg transition-all ${
                                        isActive
                                          ? 'bg-surface border border-outline/30 shadow-2xs font-semibold'
                                          : 'bg-surface/50 border border-outline/20'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <span className="text-on-surface">
                                            {formatCombustionDate(p.start)} &rarr; {formatCombustionDate(p.end)}
                                          </span>
                                          {isActive && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-surface text-on-surface border border-outline/40">
                                              {t.activeNow}
                                            </span>
                                          )}
                                        </div>
                                        {p.duration && (
                                          <span className="text-[11px] text-on-surface/80 font-medium shrink-0">
                                            {p.duration} {t.durationDays}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}

                                {orbInfo && (
                                  <div className="text-[10px] text-on-surface/80 font-medium pt-0.5">
                                    {t.combustionOrb}: <span className="font-semibold text-on-surface">within {orbInfo.direct}° of Sun</span> {orbInfo.retro ? `(${orbInfo.retro}° in retro)` : ''}
                                  </div>
                                )}
                              </div>
                            </div>

                            {combustInsight && (
                              <div className="pt-1.5 border-t border-outline/20 text-[11px] text-on-surface space-y-0.5">
                                <p className="leading-snug">{combustInsight.summary}</p>
                                <p className="text-[10px] text-on-surface/80 font-medium leading-snug flex items-start gap-1">
                                  <span className="material-symbols-outlined text-[13px] leading-none shrink-0 mt-[1px]">local_fire_department</span>
                                  <span>{combustInsight.guidance}</span>
                                </p>
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

      {/* Educational Section */}
      <section className="py-6 md:py-10 bg-white border-y border-outline/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-headline text-on-surface">{t.eduTitle}</h2>
          <p className="text-sm md:text-base text-on-surface font-body leading-relaxed max-w-2xl mx-auto">
            {t.eduIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-left not-prose pt-2">
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.sunTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.sunDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.moonTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.moonDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.marsTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.marsDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.mercuryTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.mercuryDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.jupiterTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.jupiterDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.venusTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.venusDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.saturnTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.saturnDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.rahuKetuTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.rahuKetuDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.uranusTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.uranusDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1">
              <h3 className="text-base font-semibold text-on-surface">{t.neptuneTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.neptuneDesc}</p>
            </div>
            <div className="p-3.5 md:p-4 bg-surface rounded-xl border border-outline/40 space-y-1 md:col-span-2 md:max-w-xl md:mx-auto md:w-full">
              <h3 className="text-base font-semibold text-on-surface">{t.plutoTitle}</h3>
              <p className="text-sm text-on-surface font-body leading-relaxed">{t.plutoDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <ExploreTools currentPath="/transits" className="my-6 md:my-8" />

      <Footer />
    </main>
  );
};

export default TransitsClientPage;
