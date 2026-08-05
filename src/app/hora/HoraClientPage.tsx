'use client';

import { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { getHoraData } from '@/lib/astrology';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';
import ExploreTools from '@/components/ExploreTools';

const TRANSLATIONS = {
  en: {
    heroTitle: "Planetary Hours",
    heroSubtitle: "Vedic Hora Calculator",
    heroDesc: "Align your actions with cosmic alignments based on Brihat Parasara Hora Shastra. Every hour of the day is ruled by a planet, determining the auspiciousness of your endeavors.",
    selectDate: "Select Date",
    selectedDate: "Selected Date",
    today: "Today",
    sunrise: "Sunrise",
    sunset: "Sunset",
    nextSunrise: "Next Sunrise",
    hoursTitle: "Hora Timeline (24 Hours)",
    hoursSubtitle: "From Sunrise to next Sunrise",
    noHoras: "No Hora calculations found.",
    currentHoraTitle: "Currently Active Hora",
    currentHoraDesc: "Real-time planetary hour tracking",
    lord: "Hora Lord",
    type: "Period Type",
    nature: "Nature",
    timePeriod: "Time Period",
    timeLeft: "Time Left",
    minutes: "minutes",
    seconds: "seconds",
    completed: "Completed",
    benefic: "Benefic (Soumya / Gentle)",
    malefic: "Malefic (Krura / Cruel)",
    activitiesTitle: "Auspicious Activities",
    avoidTitle: "Activities to Avoid",
    day: "Daytime",
    night: "Nighttime",
    scheduleHeader: {
      num: "No.",
      lord: "Hora Lord",
      time: "Interval",
      nature: "Nature",
      actions: "Properties"
    },
    educationalTitle: "About Vedic Hora (Planetary Hours)",
    educationalText1: "The word 'Hora' originates from the Sanskrit word 'Ahoratra' (meaning Day and Night) by omitting the first and last syllables. It represents a planetary hour. In the timeless masterpiece Brihat Parasara Hora Shastra, Sage Parasara describes the precise calculation and application of Horas.",
    educationalText2: "Unlike standard 60-minute hours, a Vedic Hora is proportional. The daytime (Sunrise to Sunset) is divided into 12 equal hours, and the nighttime (Sunset to next Sunrise) is divided into 12 equal hours. Since day and night lengths change with seasons, the duration of day and night Horas fluctuates accordingly.",
    educationalText3: "The ruling planet of the first Hora of any day is the lord of the weekday (Vara) itself. The subsequent Hora lords are determined by counting backward every second planet in the Chaldean order of planetary speed (decreasing speed): Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars. Understanding and using these planetary hours provides a daily system of mini-muhurtas to ensure victory and peace in all worldly actions.",
    viewScheduledDate: "Viewing Hora chart for selected date"
  }};

const HoraClientPage = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const y = istDate.getUTCFullYear();
    const m = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const d = String(istDate.getUTCDate()).padStart(2, '0');
    setSelectedDateStr(`${y}-${m}-${d}`);
    setCurrentTime(now);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const horaData = useMemo(() => {
    if (!selectedDateStr) return null;
    return getHoraData(selectedDateStr, "28.6139", "77.2090"); // New Delhi default
  }, [selectedDateStr]);

  const liveActiveHora = useMemo(() => {
    if (!horaData || !currentTime) return null;
    const nowMs = currentTime.getTime();
    const active = horaData.horas.find(h => nowMs >= h.start.getTime() && nowMs < h.end.getTime());
    return active || null;
  }, [horaData, currentTime]);

  const activeProgress = useMemo(() => {
    if (!liveActiveHora || !currentTime) return 0;
    const startMs = liveActiveHora.start.getTime();
    const endMs = liveActiveHora.end.getTime();
    const currentMs = currentTime.getTime();
    const total = endMs - startMs;
    const elapsed = currentMs - startMs;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }, [liveActiveHora, currentTime]);

  const activeTimeLeft = useMemo(() => {
    if (!liveActiveHora || !currentTime) return null;
    const diffMs = liveActiveHora.end.getTime() - currentTime.getTime();
    if (diffMs <= 0) return { minutes: 0, seconds: 0 };
    const totalSeconds = Math.floor(diffMs / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return { minutes: mins, seconds: secs };
  }, [liveActiveHora, currentTime]);

  const isTodaySelected = useMemo(() => {
    if (!selectedDateStr) return false;
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const y = istDate.getUTCFullYear();
    const m = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const d = String(istDate.getUTCDate()).padStart(2, '0');
    return selectedDateStr === `${y}-${m}-${d}`;
  }, [selectedDateStr]);

  const formatTimeStr = (date: Date) => {
    // Format to IST timezone formatted string
    const istMs = date.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const hrs = istDate.getUTCHours();
    const mins = istDate.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    const hrs12 = hrs % 12 || 12;
    return `${hrs12}:${mins} ${ampm}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSelectedDateStr(e.target.value);
      sendGAEvent({ event: 'action_click', action_name: 'hora_date_change', selected_date: e.target.value });
    }
  };

  const handleToday = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const y = istDate.getUTCFullYear();
    const m = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const d = String(istDate.getUTCDate()).padStart(2, '0');
    setSelectedDateStr(`${y}-${m}-${d}`);
    sendGAEvent({ event: 'action_click', action_name: 'hora_today_reset' });
  };

  const DATE_FORMATTER = useMemo(() => new Intl.DateTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }), [lang]);

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateStr) return '';
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    const utcDate = new Date(Date.UTC(y, m - 1, d));
    return DATE_FORMATTER.format(utcDate);
  }, [selectedDateStr, DATE_FORMATTER]);

  return (
    <main className="min-h-screen bg-surface antialiased text-on-surface">
      <Navbar />

      <PageHeader
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
      />

      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Unified Control Bar (Compact p-4) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-outline rounded-[1.5rem] p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToday}
              className={`px-5 py-2 rounded-full bg-accent text-white hover:bg-accent/95 transition-all text-xs font-label uppercase tracking-wider`}
            >
              {t.today}
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-outline/20 pt-4 md:pt-0 md:pl-6">
            <div className="relative flex-1 md:flex-none">
              <input
                type="date"
                value={selectedDateStr}
                onChange={handleDateChange}
                className="w-full md:w-44 px-3 py-2 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10"
                aria-label={t.selectDate}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-on-surface text-sm font-body z-20">
                {(() => {
                  if (!selectedDateStr) return '';
                  const [y, m, d] = selectedDateStr.split('-');
                  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const monthIdx = parseInt(m, 10) - 1;
                  if (monthIdx >= 0 && monthIdx < 12) {
                    return `${parseInt(d, 10)} ${months[monthIdx]} ${y}`;
                  }
                  return selectedDateStr;
                })()}
              </div>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-lg z-20" aria-hidden="true">calendar_month</span>
            </div>
            <div className="hidden sm:block sm:w-52 shrink-0">
              <p className="text-[10px] font-label text-accent uppercase mb-0.5 tracking-widest">{t.selectedDate}</p>
              <p className={`text-xs font-body tabular-nums text-on-surface whitespace-nowrap ${lang === 'hi' ? 'font-hindi' : ''}`}>
                {formattedSelectedDate}
              </p>
            </div>
          </div>
        </div>

        {horaData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Highlight Card or Date Info Card (Compact p-5) */}
            <div className="lg:col-span-1 space-y-4">
              {isTodaySelected && liveActiveHora ? (
                <div className="bg-white border-2 border-accent rounded-[2rem] p-5 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[9px] bg-accent text-white font-label uppercase px-2 py-0.5 rounded-full tracking-widest block w-fit mb-3">
                      {lang === 'en' ? 'LIVE NOW' : 'लाइव'}
                    </span>
                    <h2 className="text-lg font-bold text-accent uppercase tracking-wider font-label">{t.currentHoraTitle}</h2>
                    <p className="text-xs text-on-surface/70 font-body mt-0.5">{t.currentHoraDesc}</p>
                  </div>

                  <div className="py-2 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-2xl font-headline font-bold text-on-surface">
                          {lang === 'en' ? liveActiveHora.lord : liveActiveHora.lordSanskrit}
                        </span>
                        {lang === 'en' && (
                          <span className="text-xs font-hindi text-on-surface/80 ml-1.5">
                            {liveActiveHora.lordSanskrit}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-label uppercase text-on-surface/70">
                        Hora {liveActiveHora.number}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-accent h-full rounded-full transition-all duration-1000"
                        style={{ width: `${activeProgress}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs font-body tabular-nums text-on-surface/80">
                      <span>{formatTimeStr(liveActiveHora.start)}</span>
                      <span>{formatTimeStr(liveActiveHora.end)}</span>
                    </div>

                    {activeTimeLeft && (
                      <div className="bg-surface-container-low/30 rounded-xl p-3 flex items-center justify-between">
                        <span className="text-xs font-label uppercase tracking-wider text-on-surface/80">{t.timeLeft}:</span>
                        <span className="text-xs font-bold font-body tabular-nums text-accent">
                          {activeTimeLeft.minutes}m {activeTimeLeft.seconds}s
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-outline/10 pt-3 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-label uppercase text-on-surface/80">{t.type}:</span>
                      <span className="font-bold text-on-surface">{liveActiveHora.type === 'day' ? t.day : t.night}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-label uppercase text-on-surface/80">{t.nature}:</span>
                      <span className={`font-bold ${liveActiveHora.nature === 'benefic' ? 'text-success' : 'text-accent'}`}>
                        {liveActiveHora.nature === 'benefic' ? t.benefic : t.malefic}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-outline rounded-[2rem] p-5 shadow-sm space-y-4">
                  <div>
                    <span className="text-[9px] bg-primary/10 text-primary font-label uppercase px-2 py-0.5 rounded-full tracking-widest block w-fit mb-3 font-bold">
                      {lang === 'en' ? 'HISTORICAL' : 'इतिहास'}
                    </span>
                    <h2 className="text-lg font-bold text-accent uppercase tracking-wider font-label">{t.viewScheduledDate}</h2>
                  </div>

                  <div className="space-y-3 text-xs font-body leading-relaxed text-on-surface/80">
                    <div className="flex justify-between border-b border-outline/10 pb-1.5">
                      <span>{t.sunrise}:</span>
                      <span className="font-bold tabular-nums text-on-surface">{formatTimeStr(horaData.sunrise)}</span>
                    </div>
                    <div className="flex justify-between border-b border-outline/10 pb-1.5">
                      <span>{t.sunset}:</span>
                      <span className="font-bold tabular-nums text-on-surface">{formatTimeStr(horaData.sunset)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.nextSunrise}:</span>
                      <span className="font-bold tabular-nums text-on-surface">{formatTimeStr(horaData.nextSunrise)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Activities details (Compact padding p-5) */}
              {((isTodaySelected && liveActiveHora) || horaData.horas[0]) && (
                <div className="bg-white border border-outline rounded-[2rem] p-5 shadow-sm space-y-4">
                  {(() => {
                    const active = isTodaySelected && liveActiveHora ? liveActiveHora : horaData.horas[0];
                    const acts = lang === 'en' ? active.activities.en : active.activities.hi;
                    const avoids = lang === 'en' ? active.avoid.en : active.avoid.hi;

                    return (
                      <>
                        <div>
                          <h3 className="text-sm font-headline font-bold text-on-surface mb-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-success !text-lg" aria-hidden="true">task_alt</span>
                            {t.activitiesTitle} ({lang === 'en' ? active.lord : active.lordSanskrit})
                          </h3>
                          <ul className="space-y-1 text-xs font-body leading-relaxed text-on-surface/90 list-disc pl-5">
                            {acts.map((act, i) => (
                              <li key={i}>{act}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-outline/10 pt-3">
                          <h3 className="text-sm font-headline font-bold text-on-surface mb-2 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-error !text-lg" aria-hidden="true">cancel</span>
                            {t.avoidTitle} ({lang === 'en' ? active.lord : active.lordSanskrit})
                          </h3>
                          <ul className="space-y-1 text-xs font-body leading-relaxed text-on-surface/90 list-disc pl-5">
                            {avoids.map((avoid, i) => (
                              <li key={i}>{avoid}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* 24 Hours Timeline Schedule (Compact paddings p-4 md:p-6, and compact table row paddings py-2 px-3) */}
            <div className="lg:col-span-2 bg-white border border-outline rounded-[2rem] p-4 md:p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-accent uppercase tracking-wider font-label">{t.hoursTitle}</h2>
                <p className="text-xs text-on-surface/60 font-body mt-0.5">{t.hoursSubtitle}</p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-outline/30">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface border-b border-outline/20 text-xs font-label uppercase tracking-wider text-accent/80">
                      <th className="py-2.5 px-3 font-bold">{t.scheduleHeader.num}</th>
                      <th className="py-2.5 px-3 font-bold">{t.scheduleHeader.lord}</th>
                      <th className="py-2.5 px-3 font-bold">{t.scheduleHeader.time}</th>
                      <th className="py-2.5 px-3 font-bold">{t.scheduleHeader.nature}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {horaData.horas.map((hora) => {
                      const isLive = isTodaySelected && liveActiveHora && liveActiveHora.number === hora.number;

                      return (
                        <tr
                          key={hora.number}
                          className={`border-b border-outline/10 text-xs font-body transition-all ${
                            isLive
                              ? 'bg-accent/10 font-bold border-l-4 border-l-accent'
                              : 'odd:bg-surface/20'
                          }`}
                        >
                          <td className="py-2 px-3 font-bold text-on-surface">
                            {hora.number}
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined !text-base" style={{ color: hora.nature === 'benefic' ? '#2e7d32' : '#ffae42' }}>
                                {hora.lord === "Sun" ? "sunny" :
                                 hora.lord === "Moon" ? "bedtime" :
                                 hora.lord === "Mars" ? "local_fire_department" :
                                 hora.lord === "Mercury" ? "edit" :
                                 hora.lord === "Jupiter" ? "school" :
                                 hora.lord === "Venus" ? "favorite" : "hourglass_empty"}
                              </span>
                              <div className="flex flex-col leading-tight">
                                <span className="font-bold text-on-surface">
                                  {lang === 'en' ? hora.lord : hora.lordSanskrit}
                                </span>
                                {lang === 'en' && (
                                  <span className="text-[9px] font-hindi text-on-surface/80">
                                    {hora.lordSanskrit}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-3 tabular-nums text-on-surface leading-tight">
                            <div>{formatTimeStr(hora.start)} &rarr;</div>
                            <div className="text-on-surface/80">{formatTimeStr(hora.end)}</div>
                          </td>
                          <td className="py-2 px-3 font-semibold">
                            <span className={hora.nature === 'benefic' ? 'text-success' : 'text-accent'}>
                              {hora.nature === 'benefic' ? (lang === 'en' ? 'Gentle' : 'सौम्य') : (lang === 'en' ? 'Cruel' : 'क्रूर')}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Educational Content Section (Compact padding p-5 md:p-6) */}
        <div className="bg-white border border-outline rounded-[2rem] p-5 md:p-6 shadow-sm space-y-4 max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-accent uppercase tracking-wider font-label text-center">
            {t.educationalTitle}
          </h2>
          <div className="prose prose-sm max-w-none text-on-surface font-body leading-relaxed space-y-3">
            <p>{t.educationalText1}</p>
            <p>{t.educationalText2}</p>
            <p>{t.educationalText3}</p>
          </div>
        </div>
      </section>

      <ExploreTools currentPath="/hora" className="my-12" />

      <Footer />
    </main>
  );
};

export default HoraClientPage;
