'use client';

import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { getPlanetTransits, PLANET_NAMES, getFutureCombustions, CombustionPeriod, TransitEvent } from '@/lib/astrology';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroTitle: "Planetary Transits",
    heroSubtitle: "Gochar Tracker",
    heroDesc: "Track past and future planetary movements across signs (Rashi) and asterisms (Nakshatra). Predict shift in cosmic energies.",
    referenceTime: "Reference Date & Time (IST)",
    pastMovements: "Past 3 Movements",
    futureTransits: "Future 3 Transits",
    planet: "Planet",
    rashiTransit: "Sign Transit",
    nakshatraTransit: "Nakshatra Transit",
    motionTransit: "Direction Transit",
    from: "From",
    to: "To",
    date: "Date & Time (IST)",
    noTransits: "No movements found in search window.",
    selectDate: "Select Date",
    selectTime: "Select Time",
    calculating: "Calculating transits...",
    go: "Recalculate",
    movementDetails: "Movement Details",
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
    combustionTitle: "Planetary Combustion (Asta) Periods",
    combustionSubtitle: "Combustion occurs when a planet transits too close to the Sun, temporarily weakening its material expression and highlighting internal or spiritual lessons.",
    combustionLabel: "Combustion Period",
    currentlyCombust: "Currently Combust (Asta)",
    upcomingCombustion: "Upcoming Combustion",
    combustFrom: "From",
    combustTo: "To",
    noCombustions: "No upcoming combustion periods found in the near future."
  },
  hi: {
    heroTitle: "ग्रह गोचर",
    heroSubtitle: "गोचर ट्रैकर",
    heroDesc: "राशियों और नक्षत्रों में ग्रहों के पिछले और भविष्य के गोचर को ट्रैक करें। ब्रह्मांडीय ऊर्जा के बदलाव का पूर्वानुमान लगाएं।",
    referenceTime: "संदर्भ तिथि और समय (IST)",
    pastMovements: "पिछले 3 गोचर",
    futureTransits: "भविष्य के 3 गोचर",
    planet: "ग्रह",
    rashiTransit: "राशि गोचर",
    nakshatraTransit: "नक्षत्र गोचर",
    motionTransit: "चाल बदलाव",
    from: "से",
    to: "तक",
    date: "तिथि और समय (IST)",
    noTransits: "सर्च विंडो में कोई गोचर नहीं मिला।",
    selectDate: "तिथि चुनें",
    selectTime: "समय चुनें",
    calculating: "गोचर की गणना हो रही है...",
    go: "पुनर्गणना",
    movementDetails: "गोचर विवरण",
    eduTitle: "वैदिक ग्रह गोचर (Gochara)",
    eduIntro: "वैदिक ज्योतिष में, राशियों में ग्रहों के भ्रमण को गोचर कहा जाता है। जबकि आपकी जन्म कुंडली आपके जीवन का खाका दर्शाती है, गोचर घटनाओं के समय और वर्तमान ऊर्जा के प्रवाह को निर्धारित करते हैं।",
    sunTitle: "सूर्य (Surya)",
    sunDesc: "लगभग 30 दिनों में एक राशि पार करता है। करियर, जीवन शक्ति, अधिकार और प्रतिष्ठा में बदलाव लाता है।",
    moonTitle: "चंद्र (Chandra)",
    moonDesc: "सबसे तेज़ गति वाला ग्रह, 2.25 दिनों में एक राशि बदलता है। दैनिक मूड, अंतर्ज्ञान और मानसिक स्थिति को नियंत्रित करता।",
    marsTitle: "मंगल (Mangala)",
    marsDesc: "लगभग 45 दिनों में राशि बदलता है। कार्रवाई, महत्वाकांक्षा, साहस, शारीरिक ऊर्जा और संभावित संघर्षों को प्रेरित करता है।",
    mercuryTitle: "बुध (Budha)",
    mercuryDesc: "लगभग 15-20 दिनों में राशि बदलता है। वाणी, तर्क, व्यावसायिक सौदों और विश्लेषणात्मक निर्णयों को नियंत्रित करता है।",
    jupiterTitle: "गुरु (Guru)",
    jupiterDesc: "लगभग 1 वर्ष में एक राशि बदलता है। भारी प्रगति, भाग्य, ज्ञान और आध्यात्मिक उन्नति लाता है।",
    venusTitle: "शुक्र (Shukra)",
    venusDesc: "लगभग 30 दिनों में राशि पार करता है। रिश्तों, रचनात्मकता, विलासिता, धन और सुख-सुविधाओं को प्रभावित करता है।",
    saturnTitle: "शनि (Shani)",
    saturnDesc: "सबसे धीमा ग्रह, 2.5 वर्ष में राशि बदलता है। अनुशासन, ध्यान, संरचनात्मक सबक और दृढ़ता की मांग करता है।",
    rahuKetuTitle: "राहु और केतु",
    rahuKetuDesc: "छाया ग्रह 1.5 वर्ष में राशि बदलते हैं। राहु तीव्र इच्छाओं को बढ़ाता है, जबकि केतु वैराग्य और मोक्ष की ओर ले जाता है।",
    combustionTitle: "ग्रह अस्त (Asta) अवधि",
    combustionSubtitle: "जब कोई ग्रह सूर्य के अत्यंत निकट आ जाता है, तो वह अस्त हो जाता है। इससे उसकी बाहरी और भौतिक शक्ति कम हो जाती है, जबकि आंतरिक या आध्यात्मिक ऊर्जा जागृत होती है।",
    combustionLabel: "अस्त अवधि",
    currentlyCombust: "वर्तमान में अस्त (Asta)",
    upcomingCombustion: "आगामी अस्त काल",
    combustFrom: "से",
    combustTo: "तक",
    noCombustions: "निकट भविष्य में कोई आगामी अस्त काल नहीं मिला।"
  }
};

const PLANETS_ORDER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

const TransitsClientPage = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  });

  const [selectedTime, setSelectedTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().substring(0, 5);
  });

  const [collapsedPlanets, setCollapsedPlanets] = useState<Record<string, boolean>>({});

  const togglePlanet = (planetName: string) => {
    setCollapsedPlanets(prev => ({
      ...prev,
      [planetName]: !prev[planetName]
    }));
  };

  const referenceDate = useMemo(() => {
    const [year, month, day] = selectedDate.split('-').map(Number);
    const [hour, minute] = selectedTime.split(':').map(Number);
    const localMs = Date.UTC(year, month - 1, day, hour, minute);
    return new Date(localMs - 5.5 * 60 * 60 * 1000);
  }, [selectedDate, selectedTime]);

  const transitsData = useMemo(() => {
    return PLANETS_ORDER.map(planet => {
      const result = getPlanetTransits(planet, referenceDate);
      return result;
    });
  }, [referenceDate]);

  const combustionPeriods: CombustionPeriod[] = useMemo(() => {
    return getFutureCombustions(referenceDate);
  }, [referenceDate]);

  const formatISTDate = (date: Date) => {
    const istMs = date.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsHi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    const d = istDate.getUTCDate();
    const m = lang === 'en' ? months[istDate.getUTCMonth()] : monthsHi[istDate.getUTCMonth()];
    const y = istDate.getUTCFullYear();
    const hrs = istDate.getUTCHours().toString().padStart(2, '0');
    const mins = istDate.getUTCMinutes().toString().padStart(2, '0');
    return `${d} ${m} ${y}, ${hrs}:${mins} IST`;
  };

  const formatCombustionDate = (date: Date) => {
    const istMs = date.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsHi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    const d = istDate.getUTCDate();
    const m = lang === 'en' ? months[istDate.getUTCMonth()] : monthsHi[istDate.getUTCMonth()];
    const y = istDate.getUTCFullYear();
    return `${d} ${m} ${y}`;
  };

  const getTransitIcon = (type: 'rashi' | 'nakshatra' | 'motion') => {
    switch (type) {
      case 'rashi':
        return <span className="material-symbols-outlined text-accent text-lg" aria-hidden="true">swap_horiz</span>;
      case 'nakshatra':
        return <span className="material-symbols-outlined text-accent text-lg" aria-hidden="true">star</span>;
      case 'motion':
        return <span className="material-symbols-outlined text-accent text-lg" aria-hidden="true">sync_alt</span>;
    }
  };

  type RenderEvent =
    | {
        type: 'single';
        event: TransitEvent;
      }
    | {
        type: 'grouped_nakshatra';
        events: TransitEvent[];
      };

  const getRenderEvents = (events: TransitEvent[]): RenderEvent[] => {
    const result: RenderEvent[] = [];
    const nakshatras = events.filter(e => e.type === 'nakshatra');
    const others = events.filter(e => e.type !== 'nakshatra');

    for (const ev of others) {
      result.push({ type: 'single', event: ev });
    }

    if (nakshatras.length > 0) {
      result.push({
        type: 'grouped_nakshatra',
        events: nakshatras
      });
    }

    return result.sort((a, b) => {
      const dateA = a.type === 'single' ? a.event.date.getTime() : a.events[0].date.getTime();
      const dateB = b.type === 'single' ? b.event.date.getTime() : b.events[0].date.getTime();
      return dateA - dateB;
    });
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
      />

      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Input Parameters Card */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-outline/80 rounded-[2rem] p-6 shadow-sm">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <h2 className="text-xs uppercase font-label text-accent font-bold tracking-widest">{t.referenceTime}</h2>
            <p className="text-sm text-on-surface/70 font-body">Change date or time to view movements relative to a specific moment.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-48 px-4 py-2.5 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10"
                aria-label={t.selectDate}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface text-sm font-body">
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
                aria-label={t.selectTime}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl">schedule</span>
            </div>
          </div>
        </div>

        {/* Transits Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {transitsData.map((transit) => {
            const planetName = transit.planet;
            const planetSanskrit = PLANET_NAMES[planetName]?.sanskrit || planetName;
            const nameDisplay = lang === 'en' ? planetName : planetSanskrit;
            const isCollapsed = collapsedPlanets[planetName] === true;

            const renderedPast = getRenderEvents(transit.past);
            const renderedFuture = getRenderEvents(transit.future);

            return (
              <div key={planetName} className="bg-white border border-outline/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <button
                    onClick={() => togglePlanet(planetName)}
                    className="w-full text-left flex items-center justify-between gap-3 border-b border-outline/10 pb-4 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
                    aria-expanded={!isCollapsed}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <span className="material-symbols-outlined text-xl">public</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-headline font-semibold text-on-surface">{nameDisplay}</h3>
                        {lang === 'en' && <p className="text-xs text-on-surface/60 font-hindi">{planetSanskrit}</p>}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface/60 shrink-0 select-none transition-transform duration-0">
                      {isCollapsed ? 'expand_more' : 'expand_less'}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-none">
                      {/* Past Transits */}
                      <div>
                        <h4 className="text-xs font-label font-bold text-on-surface/60 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-on-surface/40">arrow_back</span>
                          {t.pastMovements}
                        </h4>
                        <div className="space-y-4">
                          {transit.past.length === 0 ? (
                            <p className="text-xs text-on-surface/40 italic">{t.noTransits}</p>
                          ) : (
                            renderedPast.map((item, index) => {
                              if (item.type === 'single') {
                                const ev = item.event;
                                const isRashi = ev.type === 'rashi';
                                const title = isRashi ? t.rashiTransit : t.motionTransit;
                                const fromDisp = lang === 'en' ? ev.fromValue : ev.fromValueSanskrit;
                                const toDisp = lang === 'en' ? ev.toValue : ev.toValueSanskrit;

                                return (
                                  <div key={index} className="bg-surface p-4 rounded-2xl border border-outline/20 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-label font-bold text-accent uppercase tracking-wider">{title}</span>
                                      {getTransitIcon(ev.type)}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-headline text-on-surface">
                                      <span>{fromDisp}</span>
                                      <span className="material-symbols-outlined text-xs text-on-surface/30">arrow_forward</span>
                                      <span className="font-semibold text-accent">{toDisp}</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium text-[11px] tabular-nums w-fit shadow-sm">
                                      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">calendar_month</span>
                                      {formatISTDate(ev.date)}
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={index} className="bg-surface p-4 rounded-2xl border border-outline/20 space-y-3">
                                    <div className="flex items-center justify-between border-b border-outline/10 pb-2">
                                      <span className="text-[10px] font-label font-bold text-accent uppercase tracking-wider">{t.nakshatraTransit}</span>
                                      <span className="material-symbols-outlined text-accent text-lg" aria-hidden="true">star</span>
                                    </div>
                                    <div className="space-y-3">
                                      {item.events.map((ev, sIdx) => {
                                        const fromDisp = lang === 'en' ? ev.fromValue : ev.fromValueSanskrit;
                                        const toDisp = lang === 'en' ? ev.toValue : ev.toValueSanskrit;
                                        return (
                                          <div key={sIdx} className="flex flex-col gap-2 border-b border-outline/5 last:border-0 pb-3 last:pb-0">
                                            <div className="flex items-center gap-2 text-sm font-headline text-on-surface">
                                              <span>{fromDisp}</span>
                                              <span className="material-symbols-outlined text-xs text-on-surface/30">arrow_forward</span>
                                              <span className="font-semibold text-accent">{toDisp}</span>
                                            </div>
                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium text-[11px] tabular-nums w-fit shadow-sm">
                                              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">calendar_month</span>
                                              {formatISTDate(ev.date)}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              }
                            })
                          )}
                        </div>
                      </div>

                      {/* Future Transits */}
                      <div>
                        <h4 className="text-xs font-label font-bold text-accent uppercase tracking-wider mb-4 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-accent/60">arrow_forward</span>
                          {t.futureTransits}
                        </h4>
                        <div className="space-y-4">
                          {transit.future.length === 0 ? (
                            <p className="text-xs text-on-surface/40 italic">{t.noTransits}</p>
                          ) : (
                            renderedFuture.map((item, index) => {
                              if (item.type === 'single') {
                                const ev = item.event;
                                const isRashi = ev.type === 'rashi';
                                const title = isRashi ? t.rashiTransit : t.motionTransit;
                                const fromDisp = lang === 'en' ? ev.fromValue : ev.fromValueSanskrit;
                                const toDisp = lang === 'en' ? ev.toValue : ev.toValueSanskrit;

                                return (
                                  <div key={index} className="bg-surface p-4 rounded-2xl border border-outline/20 space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-label font-bold text-accent uppercase tracking-wider">{title}</span>
                                      {getTransitIcon(ev.type)}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-headline text-on-surface">
                                      <span>{fromDisp}</span>
                                      <span className="material-symbols-outlined text-xs text-on-surface/30">arrow_forward</span>
                                      <span className="font-semibold text-accent">{toDisp}</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium text-[11px] tabular-nums w-fit shadow-sm">
                                      <span className="material-symbols-outlined text-[13px]" aria-hidden="true">calendar_month</span>
                                      {formatISTDate(ev.date)}
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={index} className="bg-surface p-4 rounded-2xl border border-outline/20 space-y-3">
                                    <div className="flex items-center justify-between border-b border-outline/10 pb-2">
                                      <span className="text-[10px] font-label font-bold text-accent uppercase tracking-wider">{t.nakshatraTransit}</span>
                                      <span className="material-symbols-outlined text-accent text-lg" aria-hidden="true">star</span>
                                    </div>
                                    <div className="space-y-3">
                                      {item.events.map((ev, sIdx) => {
                                        const fromDisp = lang === 'en' ? ev.fromValue : ev.fromValueSanskrit;
                                        const toDisp = lang === 'en' ? ev.toValue : ev.toValueSanskrit;
                                        return (
                                          <div key={sIdx} className="flex flex-col gap-2 border-b border-outline/5 last:border-0 pb-3 last:pb-0">
                                            <div className="flex items-center gap-2 text-sm font-headline text-on-surface">
                                              <span>{fromDisp}</span>
                                              <span className="material-symbols-outlined text-xs text-on-surface/30">arrow_forward</span>
                                              <span className="font-semibold text-accent">{toDisp}</span>
                                            </div>
                                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-accent/10 border border-accent/20 text-accent font-medium text-[11px] tabular-nums w-fit shadow-sm">
                                              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">calendar_month</span>
                                              {formatISTDate(ev.date)}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              }
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Planetary Combustion Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white border border-outline/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
          <div className="border-b border-outline/10 pb-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-headline font-semibold text-on-surface">{t.combustionTitle}</h2>
            <p className="text-sm text-on-surface/70 font-body mt-1">{t.combustionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combustionPeriods.length === 0 ? (
              <p className="text-sm text-on-surface/60 italic col-span-full">{t.noCombustions}</p>
            ) : (
              combustionPeriods.map((period) => {
                const planetName = period.planet;
                const planetSanskrit = PLANET_NAMES[planetName]?.sanskrit || planetName;
                const nameDisplay = lang === 'en' ? planetName : planetSanskrit;

                return (
                  <div key={planetName} className="bg-surface p-5 rounded-3xl border border-outline/20 flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-headline font-semibold text-on-surface">{nameDisplay}</h3>
                        {lang === 'en' && <p className="text-xs text-on-surface/50 font-hindi">{planetSanskrit}</p>}
                      </div>
                      {period.isCurrent ? (
                        <span className="px-2.5 py-1 rounded-full bg-error/10 text-error font-medium text-xs font-body border border-error/20 shadow-sm">
                          {t.currentlyCombust}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium text-xs font-body border border-accent/20 shadow-sm">
                          {t.upcomingCombustion}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 border-t border-outline/5 pt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-on-surface/60 font-body">{t.combustFrom}:</span>
                        <span className="font-semibold text-on-surface font-body tabular-nums">{formatCombustionDate(period.start)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-on-surface/60 font-body">{t.combustTo}:</span>
                        <span className="font-semibold text-on-surface font-body tabular-nums">{formatCombustionDate(period.end)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-8 md:py-16 bg-white border-y border-outline/30">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-headline text-on-surface">{t.eduTitle}</h2>
          <p className="text-sm md:text-base text-on-surface/80 font-body leading-relaxed max-w-2xl mx-auto">
            {t.eduIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left not-prose pt-4">
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.sunTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.sunDesc}</p>
            </div>
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.moonTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.moonDesc}</p>
            </div>
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.marsTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.marsDesc}</p>
            </div>
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.mercuryTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.mercuryDesc}</p>
            </div>
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.jupiterTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.jupiterDesc}</p>
            </div>
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.venusTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.venusDesc}</p>
            </div>
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.saturnTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.saturnDesc}</p>
            </div>
            <div className="p-6 bg-surface rounded-3xl border border-outline/20 space-y-2 col-span-1 md:col-span-2 md:max-w-xl md:mx-auto">
              <h3 className="text-lg font-headline font-semibold text-on-surface">{t.rahuKetuTitle}</h3>
              <p className="text-sm text-on-surface/70 font-body leading-relaxed">{t.rahuKetuDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TransitsClientPage;
