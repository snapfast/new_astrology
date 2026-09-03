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


const TRANSLATIONS = {
  en: {
    heroTitle: "Daily Panchang",
    heroSubtitle: "Vedic Timekeeping",
    heroDesc: "View Vedic Panchang details for New Delhi, India.",
    elementsTitle: "Panchang Elements",
    timingsTitle: "Muhurtas & Kaal",
    celestialTitle: "Sun & Moon Timings",
    extraTitle: "Current Period Details",
    tithi: "Tithi",
    nakshatra: "Nakshatra",
    yoga: "Yoga",
    karana: "Karana",
    vara: "Vara",
    paksha: "Paksha",
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
    endsAt: "Ends at",
    fullDay: "Full Day",
    prevDay: "Previous Day",
    nextDay: "Next Day",
    today: "Today",
    selectDate: "Select Date",
    selectedDate: "Selected Date",
    shareableTitle: "Shareable Daily Panchang",
    copyBtn: "Copy Text",
    copied: "Copied!",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    festivalsTitle: "Hindu Festivals & Fasting",
    festivalsSubtitle: "Auspicious Observances, Vrats & Holy Days",
    festivalsTodayTitle: "Festivals & Fasting Today",
    filterAll: "All Observances",
    filterMajor: "Major Festivals",
    filterVrat: "Vrat & Fasting",
    noFestivalsMsg: "No major festivals or mandatory fasts recorded for this selected timeframe.",
    monthNames: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    eduTitle: "Understanding Panchang",
    eduPara1: "The Panchang is a traditional Vedic calendar that serves as an essential guide for daily life in Indian culture. Derived from the Sanskrit words 'Pancha' (five) and 'Anga' (limbs), it consists of five key astronomical elements: Tithi, Vara, Nakshatra, Yoga, and Karana.",
    tithiTitle: "1. Tithi",
    tithiDesc: "The lunar day based on the angular distance between the Sun and the Moon. It is crucial for determining festivals and rituals.",
    varaTitle: "2. Vara",
    varaDesc: "The solar day of the week. Each day is ruled by a specific planet, influencing the energy of the activities performed.",
    nakshatraTitle: "3. Nakshatra",
    nakshatraDesc: "The lunar mansion where the Moon is positioned. Nakshatras define the psychological and emotional temperament of the time.",
    yogaTitle: "4. Yoga",
    yogaDesc: "A specific relationship between the Sun and Moon positions that indicates the general prevailing energy or 'joining'.",
    karanaTitle: "5. Karana",
    karanaDesc: "Half of a Tithi. Each Tithi consists of two Karanas. It represents the active energy and is significant for worldly tasks and determining the outcome of actions.",
    eduPara2: "Beyond these five limbs, the Panchang also provides information on Auspicious Timings (Muhurtas) like Abhijit Muhurta, which is ideal for starting new ventures, and Inauspicious Periods like Rahu Kaal, during which significant new actions are traditionally avoided.",
    ctaTitle: "Plan Your Day with Expert Guidance",
    ctaDesc: "While the daily Panchang provides general guidance, a Personalized Muhurta based on your individual birth chart (Kundli) ensures the highest level of success for your specific endeavors."
  }};

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

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentMonth(selectedDate.getUTCMonth());
    setCurrentYear(selectedDate.getUTCFullYear());
  }, [selectedDate]);

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

  const handleCopyText = () => {
    if (panchang.formattedText) {
      navigator.clipboard.writeText(panchang.formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    // Normalize to IST then to UTC midnight to ensure consistency with the date picker
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    const utcMidnight = new Date(Date.UTC(istTime.getUTCFullYear(), istTime.getUTCMonth(), istTime.getUTCDate()));
    setSelectedDate(utcMidnight);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      // When picking from <input type="date">, it returns YYYY-MM-DD
      // new Date("YYYY-MM-DD") creates a UTC midnight date.
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
    // Use fixed time 12:00 for daily panchang if not "today" or just use current time if it's today?
    // Actually, usually daily panchang is calculated for sunrise or a specific time.
    // The previous code used "now". Let's keep current time for today, and 12:00 for other days?
    // Or just 12:00 for all to be consistent.
    // Wait, the previous code was:
    // const istTime = new Date(now.getTime() + istOffset);
    // const dob = istTime.toISOString().split('T')[0];
    // const tob = istTime.toISOString().split('T')[1].substring(0, 5);

    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const todayIST = new Date(now.getTime() + istOffset).toISOString().split('T')[0];

    let tob = "12:00";
    if (selectedDate.toISOString().split('T')[0] === todayIST) {
       tob = new Date(now.getTime() + istOffset).toISOString().split('T')[1].substring(0, 5);
    }

    // Default to New Delhi coordinates
    const data = generateAstrologyData(dob, tob, "28.6139", "77.2090");
    return data.panchang;
  }, [selectedDate]);

  const selectedDateFestivals = useMemo(() => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    return getFestivalsForDate(dateKey, panchang);
  }, [selectedDate, panchang]);


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
    "description": `Detailed Vedic Panchang for today. Tithi: ${panchang.tithi}, Nakshatra: ${panchang.nakshatra}, Yoga: ${panchang.yoga}, Rahu Kaal: ${panchang.rahuKaal}.`,
    "author": {
      "@type": "Person",
      "name": "Pandit Rahul Bali"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rahul Bali Astrology"
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

      {/* Panchang Details */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Date Sequencer & Calendar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-outline/80 rounded-[2rem] p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-accent hover:bg-surface-container-high transition-colors border border-outline/30"
              title={t.prevDay}
              aria-label={t.prevDay}
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <button
              onClick={handleToday}
              className="px-6 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors text-[10px] md:text-xs font-label uppercase tracking-widest"
            >
              {t.today}
            </button>
            <button
              onClick={handleNextDay}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-accent hover:bg-surface-container-high transition-colors border border-outline/30"
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
                className="w-full md:w-48 px-4 py-2.5 rounded-xl bg-white border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10"
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
            <div className="hidden sm:block sm:w-60 shrink-0">
              <p className="text-xs font-label text-accent uppercase mb-0.5 tracking-widest">{t.selectedDate}</p>
              <p className="text-sm font-body tabular-nums text-on-surface whitespace-nowrap">
                {DATE_FORMATTER.format(selectedDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panchang Card */}
          <div className="lg:col-span-2 bg-white border border-outline/80 rounded-[2rem] p-5 md:p-6 shadow-sm">
            {selectedDateFestivals.length > 0 && (
              <div className="mb-5 p-3.5 rounded-2xl bg-accent/10 border border-accent/30 space-y-1.5">
                <div className="flex items-center gap-2 text-accent font-bold font-label uppercase text-xs tracking-wider">
                  <span className="material-symbols-outlined text-lg">festival</span>
                  <span>{t.festivalsTodayTitle}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {selectedDateFestivals.map((fest) => (
                    <div key={fest.id} className="bg-white border border-accent/30 px-3 py-1 rounded-xl shadow-xs">
                      <p className="text-sm font-headline text-on-surface font-bold">
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

            <h2 className="text-lg font-bold text-accent uppercase tracking-[0.15em] font-label mb-4">{t.elementsTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.tithi}</p>
                {(panchang.tithisList || [{ name: panchang.tithi, sanskrit: panchang.tithiSanskrit, end: panchang.tithiEnd }]).map((item, idx) => (
                  <div key={idx} className="border-l-2 border-accent/20 pl-2 space-y-0.5">
                    <p className="text-lg font-headline text-on-surface font-semibold">
                      {`${panchang.paksha} ${item.name}`}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : t.fullDay}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.nakshatra}</p>
                {(panchang.nakshatrasList || [{ name: panchang.nakshatra, sanskrit: panchang.nakshatraSanskrit, end: panchang.nakshatraEnd }]).map((item, idx) => (
                  <div key={idx} className="border-l-2 border-accent/20 pl-2 space-y-0.5">
                    <p className="text-lg font-headline text-on-surface font-semibold">
                      {item.name}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : t.fullDay}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.yoga}</p>
                {(panchang.yogasList || [{ name: panchang.yoga, sanskrit: panchang.yogaSanskrit, end: panchang.yogaEnd }]).map((item, idx) => (
                  <div key={idx} className="border-l-2 border-accent/20 pl-2 space-y-0.5">
                    <p className="text-lg font-headline text-on-surface font-semibold">
                      {item.name}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : t.fullDay}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.karana}</p>
                {(panchang.karanasList || [{ name: panchang.karana, sanskrit: panchang.karanaSanskrit, end: panchang.karanaEnd }]).map((item, idx) => (
                  <div key={idx} className="border-l-2 border-accent/20 pl-2 space-y-0.5">
                    <p className="text-lg font-headline text-on-surface font-semibold">
                      {item.name}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : t.fullDay}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.vara}</p>
                <div className="border-l-2 border-accent/20 pl-2 space-y-0.5">
                  <p className="text-lg font-headline text-on-surface font-semibold">{panchang.vara}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-outline/20 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.sunSign}</p>
                <p className="text-sm font-headline text-on-surface font-semibold">{panchang.sunSign}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.moonSign}</p>
                <p className="text-sm font-headline text-on-surface font-semibold">{panchang.moonSign}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.ritu}</p>
                <p className="text-sm font-headline text-on-surface font-semibold">{panchang.ritu}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.ayana}</p>
                <p className="text-sm font-headline text-on-surface font-semibold">{panchang.ayana}</p>
              </div>
            </div>
          </div>

          {/* Timings Card */}
          <div className="bg-white border border-outline/80 rounded-[2rem] p-5 md:p-6 shadow-sm h-full">
            <h2 className="text-lg font-bold text-accent uppercase tracking-[0.15em] font-label mb-4">{t.timingsTitle}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-lg">sunny</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.abhijit}</p>
                  <p className="text-base font-body tabular-nums text-on-surface">{panchang.abhijitMuhurta}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-lg">wb_twilight</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.brahma}</p>
                  <p className="text-base font-body tabular-nums text-on-surface">{panchang.brahmaMuhurta}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-error/10 rounded-full flex items-center justify-center text-error shrink-0">
                  <span className="material-symbols-outlined text-lg">block</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.rahu}</p>
                  <p className="text-base font-body tabular-nums text-on-surface">{panchang.rahuKaal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.gulika}</p>
                  <p className="text-base font-body tabular-nums text-on-surface">{panchang.gulikaKaal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-lg">history</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.yamaganda}</p>
                  <p className="text-base font-body tabular-nums text-on-surface">{panchang.yamagandaKaal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Celestial Timings Card */}
           <div className="bg-white border border-outline/80 rounded-[2rem] p-5 md:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-accent uppercase tracking-[0.15em] font-label mb-4">{t.celestialTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.sunrise}</p>
                <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.sunrise}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.sunset}</p>
                <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.sunset}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.moonrise}</p>
                <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.moonrise}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.moonset}</p>
                <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.moonset}</p>
              </div>
            </div>
          </div>

          {/* Current Period Details Card */}
          <div className="bg-white border border-outline/80 rounded-[2rem] p-5 md:p-6 shadow-sm">
            <h2 className="text-lg font-bold text-accent uppercase tracking-[0.15em] font-label mb-4">{t.extraTitle}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.month}</p>
                <p className="text-base font-headline text-on-surface font-semibold">{panchang.lunarMonth}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.samvatsara}</p>
                <p className="text-base font-headline text-on-surface font-semibold">{panchang.samvatsara}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.vikram}</p>
                <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.vikramSamvat}</p>
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.shaka}</p>
                <p className="text-base font-body tabular-nums text-on-surface font-semibold">{panchang.shakaSamvat}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shareable Plain-Text Card */}
        {panchang.formattedText && (
          <div className="bg-white border border-outline/80 rounded-[2.5rem] p-5 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-outline/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-accent uppercase tracking-[0.2em] font-label">{t.shareableTitle}</h2>
              </div>
              <button
                onClick={handleCopyText}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-full text-xs uppercase font-label tracking-wider hover:bg-accent/90 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-sm">{copied ? "done" : "content_copy"}</span>
                {copied ? t.copied : t.copyBtn}
              </button>
            </div>
            <pre className="bg-surface p-6 rounded-2xl font-mono text-sm text-on-surface whitespace-pre-wrap leading-relaxed select-all border border-outline/30">
              {panchang.formattedText}
            </pre>
          </div>
        )}
      </section>

      {/* Dedicated Hindu Festivals & Fasting Section */}
      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="bg-white border border-outline/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
          {/* Header Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-outline/10">
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
              {/* Month/Year Nav */}
              <div className="flex items-center gap-2 bg-surface p-1 rounded-full border border-outline/30">
                <button
                  onClick={handlePrevMonth}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-accent hover:bg-accent/10 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-accent hover:bg-accent/10 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title={t.nextMonth}
                  aria-label={t.nextMonth}
                >
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 bg-surface p-1 rounded-full border border-outline/30">
                <button
                  onClick={() => setFestivalFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider transition-all duration-200 ${
                    festivalFilter === 'all'
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  {t.filterAll}
                </button>
                <button
                  onClick={() => setFestivalFilter('major')}
                  className={`px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider transition-all duration-200 ${
                    festivalFilter === 'major'
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  {t.filterMajor}
                </button>
                <button
                  onClick={() => setFestivalFilter('vrat')}
                  className={`px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider transition-all duration-200 ${
                    festivalFilter === 'vrat'
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-on-surface/70 hover:text-on-surface'
                  }`}
                >
                  {t.filterVrat}
                </button>
              </div>
            </div>
          </div>

          {/* Festival Cards List */}
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
                    className="p-5 rounded-3xl bg-surface/50 border border-outline/40 hover:border-accent/60 hover:bg-white transition-all text-left group flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md"
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
                        <p className="text-xs font-hindi text-on-surface/70">
                          {item.festival.nameHi}
                        </p>
                      </div>

                      <div className="shrink-0 text-right bg-white px-3 py-1.5 rounded-2xl border border-outline/30 group-hover:border-accent/40">
                        <p className="text-lg font-extrabold font-body text-accent leading-none">{item.day}</p>
                        <p className="text-[10px] font-label uppercase text-on-surface/60 font-bold">{t.monthNames[item.month].substring(0, 3)}</p>
                      </div>
                    </div>

                    <p className="text-xs font-body text-on-surface/70 leading-relaxed line-clamp-2">
                      {lang === 'en' ? item.festival.descriptionEn : item.festival.descriptionHi}
                    </p>

                    <div className="pt-2 border-t border-outline/10 flex items-center justify-between text-[11px] text-accent font-label uppercase font-bold tracking-wider">
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

      {/* Educational Content Section */}
      <section className="py-8 md:py-16 bg-white border-y border-outline/30">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-normal mb-8 font-headline text-on-surface text-center">{t.eduTitle}</h2>
          <div className="prose prose-sm md:prose-base max-w-none text-on-surface font-body leading-relaxed space-y-8">
            <p>
              {t.eduPara1}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 not-prose">
              <div className="bg-white p-6 rounded-[2rem] border border-outline/80 shadow-sm">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.tithiTitle}</h3>
                <p className="text-sm">{t.tithiDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-outline/80 shadow-sm">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.varaTitle}</h3>
                <p className="text-sm">{t.varaDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-outline/80 shadow-sm">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.nakshatraTitle}</h3>
                <p className="text-sm">{t.nakshatraDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-outline/80 shadow-sm">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.yogaTitle}</h3>
                <p className="text-sm">{t.yogaDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-outline/80 shadow-sm">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.karanaTitle}</h3>
                <p className="text-sm">{t.karanaDesc}</p>
              </div>
            </div>

            <p>
              {t.eduPara2}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="bg-white border border-outline/80 rounded-[3rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">{t.ctaTitle}</h2>
            <p className="text-sm md:text-base text-on-surface font-body mb-10 leading-relaxed max-w-2xl mx-auto">
              {t.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/free-horoscope"
                className="px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs uppercase font-label tracking-[0.1em]"
              >
                Generate Free Kundli
              </a>
              <a
                href="/services"
                className="px-8 py-4 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs uppercase font-label tracking-[0.1em]"
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
