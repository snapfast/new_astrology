'use client';

import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import { generateAstrologyData } from '@/lib/astrology';
import JsonLd from '@/components/JsonLd';
import { useLanguage } from '@/context/LanguageContext';

// Performance Optimization: Pre-instantiate formatters outside the component
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
});

const TRANSLATIONS = {
  en: {
    heroTitle: "Daily Panchang",
    heroSubtitle: "Vedic Timekeeping",
    heroDesc: "Align your daily activities with the cosmic rhythm. Accurate Vedic Panchang details for New Delhi, India.",
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
    prevDay: "Previous Day",
    nextDay: "Next Day",
    today: "Today",
    selectDate: "Select Date",
    selectedDate: "Selected Date",
    switchLanguage: "Switch Language / भाषा बदलें",
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
  },
  hi: {
    heroTitle: "दैनिक पंचांग",
    heroSubtitle: "वैदिक काल गणना",
    heroDesc: "अपनी दैनिक गतिविधियों को ब्रह्मांडीय लय के साथ जोड़ें। नई दिल्ली, भारत के लिए सटीक वैदिक पंचांग विवरण।",
    elementsTitle: "पंचांग तत्व",
    timingsTitle: "मुहूर्त और काल",
    celestialTitle: "सूर्य और चंद्रमा का समय",
    extraTitle: "वर्तमान काल विवरण",
    tithi: "तिथि",
    nakshatra: "नक्षत्र",
    yoga: "योग",
    karana: "करण",
    vara: "वार",
    paksha: "पक्ष",
    sunSign: "सूर्य राशि",
    moonSign: "चंद्र राशि",
    ritu: "ऋतु",
    ayana: "अयन",
    abhijit: "अभिजीत मुहूर्त",
    brahma: "ब्रह्म मुहूर्त",
    rahu: "राहु काल",
    gulika: "गुलिका काल",
    yamaganda: "यमगण्ड काल",
    sunrise: "सूर्योदय",
    sunset: "सूर्यास्त",
    moonrise: "चंद्रोदय",
    moonset: "चंद्रास्त",
    vikram: "विक्रम संवत",
    shaka: "शक संवत",
    month: "चंद्र मास",
    samvatsara: "संवत्सर",
    endsAt: "समाप्ति समय",
    prevDay: "पिछला दिन",
    nextDay: "अगला दिन",
    today: "आज",
    selectDate: "तारीख चुनें",
    selectedDate: "चुनी हुई तारीख",
    switchLanguage: "भाषा बदलें / Switch Language",
    eduTitle: "पंचांग को समझना",
    eduPara1: "पंचांग एक पारंपरिक वैदिक कैलेंडर है जो भारतीय संस्कृति में दैनिक जीवन के लिए एक आवश्यक मार्गदर्शक के रूप में कार्य करता है। संस्कृत शब्दों 'पंच' (पांच) और 'अंग' से बना, इसमें पांच प्रमुख खगोलीय तत्व शामिल हैं: तिथि, वार, नक्षत्र, योग और करण।",
    tithiTitle: "1. तिथि",
    tithiDesc: "सूर्य और चंद्रमा के बीच की कोणीय दूरी के आधार पर चंद्र दिवस। यह त्योहारों और अनुष्ठानों के निर्धारण के लिए महत्वपूर्ण है।",
    varaTitle: "2. वार",
    varaDesc: "सप्ताह का सौर दिन। प्रत्येक दिन एक विशिष्ट ग्रह द्वारा शासित होता है, जो किए गए कार्यों की ऊर्जा को प्रभावित करता है।",
    nakshatraTitle: "3. नक्षत्र",
    nakshatraDesc: "चंद्र नक्षत्र जहां चंद्रमा स्थित है। नक्षत्र समय के मनोवैज्ञानिक और भावनात्मक स्वभाव को परिभाषित करते हैं।",
    yogaTitle: "4. योग",
    yogaDesc: "सूर्य और चंद्रमा की स्थिति के बीच एक विशिष्ट संबंध जो सामान्य प्रचलित ऊर्जा या 'मिलन' को दर्शाता है।",
    karanaTitle: "5. करण",
    karanaDesc: "एक तिथि का आधा भाग। प्रत्येक तिथि में दो करण होते हैं। यह सक्रिय ऊर्जा का प्रतिनिधित्व करता है और सांसारिक कार्यों और कार्यों के परिणाम निर्धारित करने के लिए महत्वपूर्ण है।",
    eduPara2: "इन पांच अंगों के अलावा, पंचांग अभिजीत मुहूर्त जैसे शुभ समय (मुहूर्त) की भी जानकारी प्रदान करता है, जो नए उद्यम शुरू करने के लिए आदर्श है, और राहु काल जैसे अशुभ काल की भी जानकारी देता है, जिसके दौरान पारंपरिक रूप से महत्वपूर्ण नए कार्यों से बचा जाता है।",
    ctaTitle: "विशेषज्ञ मार्गदर्शन के साथ अपने दिन की योजना बनाएं",
    ctaDesc: "जबकि दैनिक पंचांग सामान्य मार्गदर्शन प्रदान करता है, आपकी व्यक्तिगत जन्म कुंडली (कुण्डली) पर आधारित एक व्यक्तिगत मुहूर्त आपके विशिष्ट प्रयासों के लिए उच्चतम स्तर की सफलता सुनिश्चित करता है।"
  }
};

const PanchangPage = () => {
  const { lang } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    return new Date(now.getTime() + istOffset);
  });

  const t = TRANSLATIONS[lang];

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
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Date Sequencer & Calendar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-outline/80 rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevDay}
                className={`px-4 py-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors border border-outline/30 text-[10px] md:text-xs font-label uppercase flex items-center gap-2 group ${lang === 'en' ? 'tracking-widest' : ''}`}
              title={t.prevDay}
            >
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
              {t.prevDay}
            </button>
            <button
              onClick={handleToday}
                className={`px-6 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors text-[10px] md:text-xs font-label uppercase ${lang === 'en' ? 'tracking-widest' : ''}`}
            >
              {t.today}
            </button>
            <button
              onClick={handleNextDay}
                className={`px-4 py-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors border border-outline/30 text-[10px] md:text-xs font-label uppercase flex items-center gap-2 group ${lang === 'en' ? 'tracking-widest' : ''}`}
              title={t.nextDay}
            >
              {t.nextDay}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-outline/20 pt-6 md:pt-0 md:pl-8">
            <div className="relative flex-1 md:flex-none">
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="w-full md:w-48 px-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline/50 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-on-surface outline-none transition-all appearance-none"
                aria-label={t.selectDate}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl">calendar_month</span>
            </div>
            <div className="hidden sm:block">
              <p className={`text-xs font-label text-accent uppercase mb-0.5 ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.selectedDate}</p>
              <p className="text-sm font-body tabular-nums text-on-surface whitespace-nowrap">
                {DATE_FORMATTER.format(selectedDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Panchang Card */}
          <div className="lg:col-span-2 bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-xl font-bold text-accent uppercase tracking-[0.2em] font-label mb-8">{t.elementsTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.tithi}</p>
                <p className="text-xl font-headline text-on-surface">
                  {lang === 'en'
                    ? `${panchang.paksha} ${panchang.tithi}`
                    : `${panchang.pakshaSanskrit} ${panchang.tithiSanskrit}`}
                </p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.tithiEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-on-surface font-hindi">{panchang.pakshaSanskrit} {panchang.tithiSanskrit}</p>}
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.nakshatra}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.nakshatra : panchang.nakshatraSanskrit}</p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.nakshatraEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-on-surface font-hindi">{panchang.nakshatraSanskrit}</p>}
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.yoga}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.yoga : panchang.yogaSanskrit}</p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.yogaEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-on-surface font-hindi">{panchang.yogaSanskrit}</p>}
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.karana}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.karana : panchang.karanaSanskrit}</p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.karanaEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-on-surface font-hindi">{panchang.karanaSanskrit}</p>}
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.vara}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.vara : panchang.varaSanskrit}</p>
                {lang === 'en' && <p className="text-[10px] text-on-surface font-hindi">{panchang.varaSanskrit}</p>}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-outline/20 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.sunSign}</p>
                <p className="text-base font-headline text-on-surface">{lang === 'en' ? panchang.sunSign : panchang.sunSignSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.moonSign}</p>
                <p className="text-base font-headline text-on-surface">{lang === 'en' ? panchang.moonSign : panchang.moonSignSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.ritu}</p>
                <p className="text-base font-headline text-on-surface">{lang === 'en' ? panchang.ritu : panchang.rituSanskrit}</p>
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.ayana}</p>
                <p className="text-base font-headline text-on-surface">{lang === 'en' ? panchang.ayana : panchang.ayanaSanskrit}</p>
              </div>
            </div>
          </div>

          {/* Timings Card */}
          <div className="bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm h-full">
            <h2 className="text-xl font-bold text-accent uppercase tracking-[0.2em] font-label mb-8">{t.timingsTitle}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">sunny</span>
                </div>
                <div>
                  <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.abhijit}</p>
                  <p className="text-lg font-body tabular-nums text-on-surface">{panchang.abhijitMuhurta}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                  <span className="material-symbols-outlined text-xl">wb_twilight</span>
                </div>
                <div>
                  <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.brahma}</p>
                  <p className="text-lg font-body tabular-nums text-on-surface">{panchang.brahmaMuhurta}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center text-error shrink-0">
                  <span className="material-symbols-outlined text-xl">block</span>
                </div>
                <div>
                  <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.rahu}</p>
                  <p className="text-lg font-body tabular-nums text-on-surface">{panchang.rahuKaal}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-xl">schedule</span>
                </div>
                <div>
                  <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.gulika}</p>
                  <p className="text-lg font-body tabular-nums text-on-surface">{panchang.gulikaKaal}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-on-surface shrink-0">
                  <span className="material-symbols-outlined text-xl">history</span>
                </div>
                <div>
                  <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.yamaganda}</p>
                  <p className="text-lg font-body tabular-nums text-on-surface">{panchang.yamagandaKaal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Celestial Timings Card */}
           <div className="bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-xl font-bold text-accent uppercase tracking-[0.2em] font-label mb-8">{t.celestialTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.sunrise}</p>
                <p className="text-lg font-body tabular-nums text-on-surface">{panchang.sunrise}</p>
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.sunset}</p>
                <p className="text-lg font-body tabular-nums text-on-surface">{panchang.sunset}</p>
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.moonrise}</p>
                <p className="text-lg font-body tabular-nums text-on-surface">{panchang.moonrise}</p>
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.moonset}</p>
                <p className="text-lg font-body tabular-nums text-on-surface">{panchang.moonset}</p>
              </div>
            </div>
          </div>

          {/* Current Period Details Card */}
          <div className="bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <h2 className="text-xl font-bold text-accent uppercase tracking-[0.2em] font-label mb-8">{t.extraTitle}</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.month}</p>
                <p className="text-base font-headline text-on-surface">{lang === 'en' ? panchang.lunarMonth : panchang.lunarMonthSanskrit}</p>
                {lang === 'en' && <p className="text-[10px] text-on-surface font-hindi">{panchang.lunarMonthSanskrit}</p>}
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.samvatsara}</p>
                <p className="text-base font-headline text-on-surface">{lang === 'en' ? panchang.samvatsara : panchang.samvatsaraSanskrit}</p>
                {lang === 'en' && <p className="text-[10px] text-on-surface font-hindi">{panchang.samvatsaraSanskrit}</p>}
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.vikram}</p>
                <p className="text-base font-body tabular-nums text-on-surface">{panchang.vikramSamvat}</p>
              </div>
              <div className="space-y-1">
                <p className={`font-bold text-on-surface uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.shaka}</p>
                <p className="text-base font-body tabular-nums text-on-surface">{panchang.shakaSamvat}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-24 bg-surface-container-low border-y border-outline/30">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 font-headline text-on-surface text-center">{t.eduTitle}</h2>
          <div className="prose prose-sm md:prose-base max-w-none text-on-surface font-body leading-relaxed space-y-8">
            <p>
              {t.eduPara1}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 not-prose">
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.tithiTitle}</h3>
                <p className="text-sm">{t.tithiDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.varaTitle}</h3>
                <p className="text-sm">{t.varaDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.nakshatraTitle}</h3>
                <p className="text-sm">{t.nakshatraDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
                <h3 className="text-lg font-headline text-on-surface mb-2">{t.yogaTitle}</h3>
                <p className="text-sm">{t.yogaDesc}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-outline/20">
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
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="bg-surface-container-low border border-outline/50 rounded-[3rem] p-10 md:p-16">
            <h2 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">{t.ctaTitle}</h2>
            <p className="text-sm md:text-base text-on-surface font-body mb-10 leading-relaxed max-w-2xl mx-auto">
              {t.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/free-horoscope"
                className={`px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs uppercase font-label ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
              >
                {lang === 'en' ? 'Generate Free Kundli' : 'मुफ्त कुंडली बनाएं'}
              </a>
              <a
                href="/services"
                className={`px-8 py-4 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs uppercase font-label ${lang === 'en' ? 'tracking-[0.1em]' : ''}`}
              >
                {lang === 'en' ? 'Book Consultation' : 'परामर्श बुक करें'}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PanchangPage;
