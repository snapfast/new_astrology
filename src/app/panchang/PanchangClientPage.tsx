'use client';

import { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { generateAstrologyData } from '@/lib/astrology';
import { getFestivalsForDate, Festival } from '@/lib/festivals';
import JsonLd from '@/components/JsonLd';
import { useLanguage } from '@/context/LanguageContext';
import ExploreTools from '@/components/ExploreTools';
import DeepamIcon from '@/components/DeepamIcon';

interface TimelineItem {
  time: string;
  type: 'sunrise' | 'sunset' | 'tithi' | 'nakshatra' | 'yoga' | 'karana' | 'moonsign';
  title: string;
  titleSanskrit?: string;
  badge: string;
  description: string;
}

const TRANSLATIONS = {
  en: {
    heroTitle: "Daily Panchang",
    heroSubtitle: "Vedic Timekeeping",
    heroDesc: "Chronological schedule of Panchang changes and daily timings (Sunrise to Sunrise) for New Delhi, India.",
    timingsTitle: "Key Muhurtas & Kaal",
    celestialTitle: "Sun & Moon Timings",
    extraTitle: "Current Period Details",
    sunSign: "Sun Sign",
    moonSign: "Moon Sign",
    ritu: "Ritu (Season)",
    ayana: "Ayana",
    abhijit: "Abhijit Muhurta",
    brahma: "Brahma Muhurta",
    rahu: "Rahu Kaal",
    gulika: "Gulika Kaal",
    yamaganda: "Yamaganda Kaal",
    sunrise: "Sunrise",
    sunset: "Sunset",
    moonrise: "Moonrise",
    moonset: "Moonset",
    vikram: "Vikram Samvat",
    shaka: "Shaka Samvat",
    month: "Lunar Month",
    samvatsara: "Samvatsara",
    prevDay: "Previous Day",
    nextDay: "Next Day",
    today: "Today",
    selectDate: "Select Date",
    selectedDate: "Selected Date",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    festivalsTitle: "Hindu Festivals & Fasting",
    festivalsSubtitle: "Auspicious Observances, Vrats & Holy Days",
    festivalsTodayTitle: "Festivals & Fasting Today",
    filterAll: "All Observances",
    filterMajor: "Major Festivals",
    filterVrat: "Vrat & Fasting",
    noFestivalsMsg: "No major festivals or mandatory fasts recorded for this selected timeframe.",
    timelineTitle: "Timeline of Panchang Changes",
    monthNames: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    ctaTitle: "Plan Your Day with Expert Guidance",
    ctaDesc: "While the daily Panchang provides general guidance, a Personalized Muhurta based on your individual birth chart (Kundli) ensures the highest level of success for your specific endeavors."
  }
};

const PanchangPage = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS.en;

  const DATE_FORMATTER = useMemo(() => new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }), []);

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    return new Date(Date.UTC(istTime.getUTCFullYear(), istTime.getUTCMonth(), istTime.getUTCDate()));
  });

  const [currentMonth, setCurrentMonth] = useState<number>(() => selectedDate.getUTCMonth());
  const [currentYear, setCurrentYear] = useState<number>(() => selectedDate.getUTCFullYear());
  const [festivalFilter, setFestivalFilter] = useState<'all' | 'major' | 'vrat'>('all');

  useEffect(() => {
    setCurrentMonth(selectedDate.getUTCMonth());
    setCurrentYear(selectedDate.getUTCFullYear());
  }, [selectedDate]);

  const handlePrevDay = () => {
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setUTCDate(next.getUTCDate() - 1);
      return next;
    });
  };

  const handleNextDay = () => {
    setSelectedDate(prev => {
      const next = new Date(prev);
      next.setUTCDate(next.getUTCDate() + 1);
      return next;
    });
  };

  const handleToday = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const utcMidnight = new Date(Date.UTC(istTime.getUTCFullYear(), istTime.getUTCMonth(), istTime.getUTCDate()));
    setSelectedDate(utcMidnight);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSelectedDate(new Date(e.target.value));
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(Number(e.target.value));
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(Number(e.target.value));
  };

  const panchang = useMemo(() => {
    const dob = selectedDate.toISOString().split('T')[0];
    const tob = "12:00";
    const data = generateAstrologyData(dob, tob, "28.6139", "77.2090");
    return data.panchang;
  }, [selectedDate]);

  const selectedDateFestivals = useMemo(() => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    return getFestivalsForDate(dateKey, panchang);
  }, [selectedDate, panchang]);

  const timelineEvents = useMemo(() => {
    const p = panchang;
    const events: TimelineItem[] = [];

    // 1. Sunrise (Start of Panchang Day)
    events.push({
      time: p.sunrise,
      type: 'sunrise',
      title: `Sunrise — ${p.vara}`,
      titleSanskrit: p.varaSanskrit,
      badge: 'Day Start',
      description: `Day starts with ${p.paksha} ${p.tithi} Tithi & ${p.nakshatra} Nakshatra.`
    });

    // 2. Tithi Changes
    if (p.tithisList && p.tithisList.length > 0) {
      p.tithisList.forEach((item, idx) => {
        if (item.end) {
          const nextItem = p.tithisList?.[idx + 1];
          const nextTitle = nextItem ? `${nextItem.paksha || p.paksha} ${nextItem.name}` : p.tithi;
          const nextSanskrit = nextItem ? `${nextItem.pakshaSanskrit || p.pakshaSanskrit} ${nextItem.sanskrit}` : p.tithiSanskrit;
          events.push({
            time: item.end,
            type: 'tithi',
            title: `Tithi Change: ${item.paksha || p.paksha} ${item.name} Ends`,
            titleSanskrit: `${item.pakshaSanskrit || p.pakshaSanskrit} ${item.sanskrit}`,
            badge: 'Tithi',
            description: `Transitions to ${nextTitle} (${nextSanskrit})`
          });
        }
      });
    }

    // 3. Nakshatra Changes
    if (p.nakshatrasList && p.nakshatrasList.length > 0) {
      p.nakshatrasList.forEach((item, idx) => {
        if (item.end) {
          const nextItem = p.nakshatrasList?.[idx + 1];
          const nextTitle = nextItem ? nextItem.name : p.nakshatra;
          const nextSanskrit = nextItem ? nextItem.sanskrit : p.nakshatraSanskrit;
          events.push({
            time: item.end,
            type: 'nakshatra',
            title: `Nakshatra Change: ${item.name} Ends`,
            titleSanskrit: item.sanskrit,
            badge: 'Nakshatra',
            description: `Moon enters ${nextTitle} (${nextSanskrit})`
          });
        }
      });
    }

    // 4. Yoga Changes
    if (p.yogasList && p.yogasList.length > 0) {
      p.yogasList.forEach((item, idx) => {
        if (item.end) {
          const nextItem = p.yogasList?.[idx + 1];
          const nextTitle = nextItem ? nextItem.name : p.yoga;
          const nextSanskrit = nextItem ? nextItem.sanskrit : p.yogaSanskrit;
          events.push({
            time: item.end,
            type: 'yoga',
            title: `Yoga Change: ${item.name} Ends`,
            titleSanskrit: item.sanskrit,
            badge: 'Yoga',
            description: `Transitions to ${nextTitle} (${nextSanskrit})`
          });
        }
      });
    }

    // 5. Karana Changes
    if (p.karanasList && p.karanasList.length > 0) {
      p.karanasList.forEach((item, idx) => {
        if (item.end) {
          const nextItem = p.karanasList?.[idx + 1];
          const nextTitle = nextItem ? nextItem.name : p.karana;
          const nextSanskrit = nextItem ? nextItem.sanskrit : p.karanaSanskrit;
          events.push({
            time: item.end,
            type: 'karana',
            title: `Karana Change: ${item.name} Ends`,
            titleSanskrit: item.sanskrit,
            badge: 'Karana',
            description: `Transitions to ${nextTitle} (${nextSanskrit})`
          });
        }
      });
    }

    // 6. Sunset
    events.push({
      time: p.sunset,
      type: 'sunset',
      title: 'Sunset',
      badge: 'Night Start',
      description: `Evening transition into ${p.lunarMonth} (${p.lunarMonthSanskrit}) month.`
    });

    const parseTimeToMinutes = (tStr: string): number => {
      const isNextDay = tStr.includes(',');
      const clean = tStr.split(',')[0].trim();
      const [time, period] = clean.split(' ');
      if (!time || !period) return 0;
      const [rawH, m] = time.split(':').map(Number);
      let h = rawH;
      if (period.toUpperCase() === 'PM' && h < 12) h += 12;
      if (period.toUpperCase() === 'AM' && h === 12) h = 0;
      let totalMins = h * 60 + m;
      if (isNextDay) totalMins += 24 * 60;
      return totalMins;
    };

    events.sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));

    return events;
  }, [panchang]);

  // Precalculate festivals list for current month
  const monthlyFestivalsList = useMemo(() => {
    const list: Array<{ dateKey: string; day: number; month: number; year: number; festival: Festival }> = [];
    const totalDays = new Date(Date.UTC(currentYear, currentMonth + 1, 0)).getUTCDate();

    for (let d = 1; d <= totalDays; d++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const data = generateAstrologyData(dateKey, "12:00", "28.6139", "77.2090");
      const fList = getFestivalsForDate(dateKey, data.panchang);

      for (const f of fList) {
        list.push({
          dateKey,
          day: d,
          month: currentMonth,
          year: currentYear,
          festival: f
        });
      }
    }
    return list;
  }, [currentMonth, currentYear]);

  const filteredMonthlyFestivals = useMemo(() => {
    if (festivalFilter === 'major') {
      return monthlyFestivalsList.filter(item => item.festival.category === 'major' || item.festival.category === 'jayanti');
    }
    if (festivalFilter === 'vrat') {
      return monthlyFestivalsList.filter(item => item.festival.category === 'vrat');
    }
    return monthlyFestivalsList;
  }, [monthlyFestivalsList, festivalFilter]);

  const panchangSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Daily Panchang - Today's Vedic Tithi, Nakshatra & Muhurta",
    "description": `Detailed Vedic Panchang timeline for today. Tithi: ${panchang.tithi}, Nakshatra: ${panchang.nakshatra}, Yoga: ${panchang.yoga}, Rahu Kaal: ${panchang.rahuKaal}.`,
    "author": {
      "@type": "Person",
      "name": "Pandit Rahul Bali"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bali Astrology"
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <JsonLd data={panchangSchema} />

      <PageHeader
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        description={t.heroDesc}
      />

      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Date Sequencer & Calendar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-outline/20 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-accent hover:bg-surface-container-high transition-colors border border-outline/20"
              title={t.prevDay}
              aria-label={t.prevDay}
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <button
              onClick={handleToday}
              className="px-6 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors text-[10px] md:text-xs font-label tracking-widest"
            >
              {t.today}
            </button>
            <button
              onClick={handleNextDay}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-accent hover:bg-surface-container-high transition-colors border border-outline/20"
              title={t.nextDay}
              aria-label={t.nextDay}
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-outline/20 pt-6 md:pt-0 md:pl-8">
            <div className="relative flex-1 md:flex-none">
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="w-full md:min-w-[12rem] md:w-auto px-4 py-2.5 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10"
                aria-label={t.selectDate}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface text-sm font-body z-20">
                {(() => {
                  const dateStr = selectedDate.toISOString().split('T')[0];
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl z-20">calendar_month</span>
            </div>
            <div className="hidden sm:block sm:min-w-[15rem] shrink-0">
              <p className="text-xs font-label text-accent uppercase mb-0.5 tracking-widest">{t.selectedDate}</p>
              <p className="text-sm font-body tabular-nums text-on-surface whitespace-nowrap">
                {DATE_FORMATTER.format(selectedDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Festivals Banner for Selected Date */}
        {selectedDateFestivals.length > 0 && (
          <div className="p-4 md:p-6 rounded-2xl bg-accent/10 border border-accent/30 space-y-2">
            <div className="flex items-center gap-2 text-accent font-bold font-label uppercase text-xs tracking-wider">
              <span className="material-symbols-outlined text-xl">festival</span>
              <span>{t.festivalsTodayTitle}</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              {selectedDateFestivals.map((fest) => (
                <div key={fest.id} className="bg-white border border-accent/30 px-4 py-2 rounded-xl shadow-xs">
                  <p className="text-base font-headline text-on-surface font-bold">
                    {fest.nameEn}
                  </p>
                  <p className="text-xs text-on-surface/70 font-body">
                    {fest.descriptionEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Grid: Left Timeline + Right Key Timings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Timeline of Changes (2 Columns) */}
          <div className="lg:col-span-2 bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-outline/10 pb-4">
              <h2 className="text-lg font-bold text-accent uppercase tracking-widest font-label flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">schedule</span>
                <span>{t.timelineTitle}</span>
              </h2>
              <span className="text-xs font-body text-on-surface/60">
                Sunrise to Sunrise
              </span>
            </div>

            <div className="relative border-l-2 border-accent/20 pl-6 ml-3 space-y-6 pt-2">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative group">
                  <div className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    evt.type === 'sunrise' || evt.type === 'sunset'
                      ? 'bg-accent border-white ring-2 ring-accent/30'
                      : 'bg-white border-accent'
                  }`} />

                  <div className="bg-surface/30 border border-outline/20 rounded-2xl p-4 md:p-5 shadow-2xs hover:border-accent/40 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-sm md:text-base font-bold text-accent font-body tabular-nums">
                        {evt.time}
                      </span>
                      <span className="text-[10px] font-label font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white text-on-surface/80 border border-outline/10 shadow-2xs">
                        {evt.badge}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base md:text-lg font-bold font-headline text-on-surface">
                        {evt.title}
                      </h3>
                      {evt.titleSanskrit && (
                        <span className="text-sm md:text-base text-on-surface font-hindi font-medium">
                          {evt.titleSanskrit}
                        </span>
                      )}
                    </div>

                    <p className="text-xs md:text-sm text-on-surface/70 font-body mt-1 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Timings & Period Details (1 Column) */}
          <div className="space-y-6">

            {/* Key Timings Card */}
            <div className="bg-white border border-outline/20 rounded-3xl p-6 shadow-sm space-y-5">
              <h2 className="text-base font-bold text-accent uppercase tracking-widest font-label border-b border-outline/10 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">schedule</span>
                <span>{t.timingsTitle}</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DeepamIcon width={22} height={22} className="shrink-0" />
                  <div>
                    <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.abhijit}</p>
                    <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.abhijitMuhurta}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-accent shrink-0">wb_twilight</span>
                  <div>
                    <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.brahma}</p>
                    <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.brahmaMuhurta}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-error shrink-0">block</span>
                  <div>
                    <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.rahu}</p>
                    <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.rahuKaal}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-on-surface/70 shrink-0">schedule</span>
                  <div>
                    <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.gulika}</p>
                    <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.gulikaKaal}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-on-surface/70 shrink-0">history</span>
                  <div>
                    <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.yamaganda}</p>
                    <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.yamagandaKaal}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sun & Moon Celestial Timings */}
            <div className="bg-white border border-outline/20 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-accent uppercase tracking-widest font-label border-b border-outline/10 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">wb_sunny</span>
                <span>{t.celestialTitle}</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.sunrise}</p>
                  <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.sunrise}</p>
                </div>
                <div>
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.sunset}</p>
                  <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.sunset}</p>
                </div>
                <div>
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.moonrise}</p>
                  <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.moonrise}</p>
                </div>
                <div>
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.moonset}</p>
                  <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.moonset}</p>
                </div>
              </div>
            </div>

            {/* Period Details */}
            <div className="bg-white border border-outline/20 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-accent uppercase tracking-widest font-label border-b border-outline/10 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>{t.extraTitle}</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-0.5">
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.month}</p>
                  <p className="text-sm font-headline text-on-surface font-semibold">{panchang.lunarMonth}</p>
                  <p className="text-xs text-on-surface font-hindi font-medium">{panchang.lunarMonthSanskrit}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.samvatsara}</p>
                  <p className="text-sm font-headline text-on-surface font-semibold">{panchang.samvatsara}</p>
                  <p className="text-xs text-on-surface font-hindi font-medium">{panchang.samvatsaraSanskrit}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.sunSign}</p>
                  <p className="text-sm font-headline text-on-surface font-semibold">{panchang.sunSign}</p>
                  <p className="text-xs text-on-surface font-hindi font-medium">{panchang.sunSignSanskrit}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.moonSign}</p>
                  <p className="text-sm font-headline text-on-surface font-semibold">{panchang.moonSign}</p>
                  <p className="text-xs text-on-surface font-hindi font-medium">{panchang.moonSignSanskrit}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.vikram}</p>
                  <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.vikramSamvat}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.shaka}</p>
                  <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.shakaSamvat}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dedicated Hindu Festivals & Fasting Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="bg-white border border-outline/20 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-outline/20">
            <div>
              <h2 className="text-2xl font-bold text-accent uppercase tracking-wider font-label flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">festival</span>
                <span>{t.festivalsTitle}</span>
              </h2>
              <p className="text-xs text-on-surface/70 font-body mt-0.5">
                {t.festivalsSubtitle} — {t.monthNames[currentMonth]} {currentYear}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-surface p-1 rounded-full border border-outline/20">
                <button
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-accent hover:bg-accent/10 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title={t.prevMonth}
                  aria-label={t.prevMonth}
                >
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>

                <select
                  value={currentMonth}
                  onChange={handleMonthSelect}
                  className="bg-transparent border-none text-sm font-label uppercase font-bold text-on-surface focus:outline-none px-2 cursor-pointer appearance-none text-center"
                  aria-label="Select Month"
                >
                  {t.monthNames.map((name, i) => (
                    <option key={i} value={i} className="normal-case text-on-surface">{name}</option>
                  ))}
                </select>

                <select
                  value={currentYear}
                  onChange={handleYearSelect}
                  className="bg-transparent border-none text-sm font-label uppercase font-bold text-on-surface focus:outline-none px-2 cursor-pointer appearance-none text-center"
                  aria-label="Select Year"
                >
                  {Array.from({ length: 201 }, (_, i) => 1900 + i).map((year) => (
                    <option key={year} value={year} className="text-on-surface">{year}</option>
                  ))}
                </select>

                <button
                  onClick={handleNextMonth}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-accent hover:bg-accent/10 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title={t.nextMonth}
                  aria-label={t.nextMonth}
                >
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 bg-surface p-1 rounded-full border border-outline/20">
                <button
                  onClick={() => setFestivalFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-label tracking-wider transition-all duration-200 ${
                    festivalFilter === 'all'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  {t.filterAll}
                </button>
                <button
                  onClick={() => setFestivalFilter('major')}
                  className={`px-4 py-1.5 rounded-full text-xs font-label tracking-wider transition-all duration-200 ${
                    festivalFilter === 'major'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  {t.filterMajor}
                </button>
                <button
                  onClick={() => setFestivalFilter('vrat')}
                  className={`px-4 py-1.5 rounded-full text-xs font-label tracking-wider transition-all duration-200 ${
                    festivalFilter === 'vrat'
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  {t.filterVrat}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {filteredMonthlyFestivals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMonthlyFestivals.map((item, idx) => (
                  <button
                    key={`${item.dateKey}-${item.festival.id}-${idx}`}
                    onClick={() => {
                      const targetDate = new Date(Date.UTC(item.year, item.month, item.day));
                      setSelectedDate(targetDate);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="p-5 rounded-3xl bg-surface/50 border border-outline/40 hover:border-accent/60 hover:bg-white transition-all text-left group flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3 w-full">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-label font-bold uppercase px-2 py-0.5 rounded-md ${
                            item.festival.category === 'major'
                              ? 'bg-accent text-white'
                              : item.festival.category === 'jayanti'
                              ? 'bg-primary text-white'
                              : 'bg-secondary/20 text-on-surface'
                          }`}>
                            {item.festival.category === 'major'
                              ? 'Major Festival'
                              : item.festival.category === 'jayanti'
                              ? 'Jayanti'
                              : 'Vrat & Fasting'}
                          </span>
                        </div>
                        <h4 className="text-base font-bold font-headline text-on-surface group-hover:text-accent transition-colors">
                          {item.festival.nameEn}
                        </h4>
                        <p className="text-sm font-hindi font-medium text-on-surface">
                          {item.festival.nameHi}
                        </p>
                      </div>

                      <div className="shrink-0 text-right bg-white px-3 py-1.5 rounded-2xl border border-outline/20 group-hover:border-accent/40">
                        <p className="text-lg font-extrabold font-body text-accent leading-none">{item.day}</p>
                        <p className="text-[10px] font-label uppercase text-on-surface/60 font-bold">{t.monthNames[item.month].substring(0, 3)}</p>
                      </div>
                    </div>

                    <p className="text-xs font-body text-on-surface/70 leading-relaxed line-clamp-2">
                      {lang === 'en' ? item.festival.descriptionEn : item.festival.descriptionHi}
                    </p>

                    <div className="pt-2 border-t border-outline/20 flex items-center justify-between text-[11px] text-accent font-label uppercase font-bold tracking-wider">
                      <span>View Panchang</span>
                      <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-surface border border-outline/20">
                <p className="text-sm font-body text-on-surface/60">{t.noFestivalsMsg}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="bg-white border border-outline/20 rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">{t.ctaTitle}</h2>
            <p className="text-sm md:text-base text-on-surface font-body mb-10 leading-relaxed max-w-2xl mx-auto">
              {t.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/free-horoscope"
                className="px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs font-label tracking-[0.1em]"
              >
                Generate Free Kundli
              </a>
              <a
                href="/about"
                className="btn-primary px-8 py-4 text-[10px] md:text-xs tracking-[0.1em]"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <ExploreTools currentPath="/panchang" className="mb-12" />

      <Footer />
    </main>
  );
};

export default PanchangPage;
