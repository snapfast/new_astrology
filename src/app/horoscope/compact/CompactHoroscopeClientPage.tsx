'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import KundliChart from '@/components/KundliChart';
import VimshottariDasha from '@/components/VimshottariDasha';
import { generateAstrologyData, DivisionalChartData } from '@/lib/astrology';
import ExploreTools from '@/components/ExploreTools';
import { useLanguage } from '@/context/LanguageContext';
import { sendGAEvent } from '@next/third-parties/google';
import { sanitize, sanitizeCoord, sanitizeDate, sanitizeTime } from '@/lib/security';

const TRANSLATIONS = {
  en: {
    birthInfo: "Birth Info",
    name: "Name",
    date: "Date",
    time: "Time",
    place: "Place",
    panchang: "Panchang",
    tithi: "Tithi",
    paksha: "Paksha",
    vara: "Vara",
    nakshatra: "Nakshatra",
    yoga: "Yoga",
    karana: "Karana",
    sunSign: "Sun Sign",
    moonSign: "Moon Sign",
    ritu: "Ritu",
    ayana: "Ayana",
    timings: "Muhurtas",
    abhijit: "Abhijit",
    rahu: "Rahu Kaal",
    gulika: "Gulika",
    yamaganda: "Yamaganda",
    d1Chart: "Lagna (D1)",
    d3Chart: "Drekkana (D3)",
    d7Chart: "Saptamsha (D7)",
    d9Chart: "Navamsha (D9)",
    d10Chart: "Dashamsha (D10)",
    d60Chart: "Shashtiamsha (D60)",
    planet: "Planet",
    house: "H",
    rasi: "Rasi",
    rasiLord: "Lord",
    degree: "Degree",
    nakLord: "NL",
    pada: "P",
    planetaryPositions: "Planetary Positions",
    vimshottariDasha: "Vimshottari Dasha",
    sunSignInsight: "Sun Sign",
    moonSignInsight: "Moon Sign",
    backToStandard: "Standard View",
    desktopOnly: "Desktop Recommended",
    mobileMsg: "This compact dashboard is designed for desktop screens to provide a professional high-density view. Please visit this page from a PC or laptop for the best experience.",
    goBackBtn: "Go to Standard View",
    linkCopied: "Link Copied!",
    bookBtn: "Book Consultation",
    activeDasha: "Active",
    loading: "Loading Dashboard...",
    generateNew: "New Chart",
    switchLanguage: "Language / भाषा",
    shareReport: "Share Report"
  },
  hi: {
    birthInfo: "जन्म विवरण",
    name: "नाम",
    date: "दिनांक",
    time: "समय",
    place: "स्थान",
    panchang: "पंचांग",
    tithi: "तिथि",
    paksha: "पक्ष",
    vara: "वार",
    nakshatra: "नक्षत्र",
    yoga: "योग",
    karana: "करण",
    sunSign: "सूर्य राशि",
    moonSign: "चंद्र राशि",
    ritu: "ऋतु",
    ayana: "अयन",
    timings: "मुहूर्त",
    abhijit: "अभिजीत",
    rahu: "राहु काल",
    gulika: "गुलिक",
    yamaganda: "यमगण्ड",
    d1Chart: "लग्न (D1)",
    d3Chart: "द्रेष्काण (D3)",
    d7Chart: "सप्तमंश (D7)",
    d9Chart: "नवांश (D9)",
    d10Chart: "दशमांश (D10)",
    d60Chart: "षष्ट्यंश (D60)",
    planet: "ग्रह",
    house: "भाव",
    rasi: "राशि",
    rasiLord: "स्वामी",
    degree: "अंश",
    nakLord: "नक्षत्र स्वामी",
    pada: "पद",
    planetaryPositions: "ग्रह स्थिति",
    vimshottariDasha: "विंशोत्तरी दशा",
    sunSignInsight: "सूर्य राशि",
    moonSignInsight: "चंद्र राशि",
    backToStandard: "सामान्य दृश्य",
    desktopOnly: "केवल डेस्कटॉप",
    mobileMsg: "यह कॉम्पैक्ट डैशबोर्ड डेस्कटॉप स्क्रीन के लिए डिज़ाइन किया गया है। सर्वोत्तम अनुभव के लिए कृपया इसे पीसी या लैपटॉप पर देखें।",
    goBackBtn: "सामान्य दृश्य पर जाएं",
    linkCopied: "लिंक कॉपी किया गया!",
    bookBtn: "परामर्श बुक करें",
    activeDasha: "सक्रिय",
    loading: "डैशबोर्ड लोड हो रहा है...",
    generateNew: "नई कुंडली",
    switchLanguage: "भाषा / Language",
    shareReport: "रिपोर्ट साझा करें"
  }
};

const CompactHoroscopeContent = () => {
  const router = useRouter();
  const { lang, toggleLang } = useLanguage();
  const [showCopied, setShowCopied] = useState(false);

  const t = TRANSLATIONS[lang];
  const searchParams = useSearchParams();
  const name = sanitize(searchParams.get('name'), 100) || 'Guest';
  const dob = sanitizeDate(searchParams.get('dob')) || '';
  const formattedDob = useMemo(() => {
    if (!dob) return '';
    const parts = dob.split('-');
    if (parts.length !== 3) return '';
    const [year, month, day] = parts;
    const monthIdx = parseInt(month, 10) - 1;
    if (monthIdx < 0 || monthIdx > 11) return '';

    const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsHi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    const months = lang === 'hi' ? monthsHi : monthsEn;

    return `${day} ${months[monthIdx]} ${year}`;
  }, [dob, lang]);
  const tob = sanitizeTime(searchParams.get('tob')) || '';
  const pob = sanitize(searchParams.get('pob'), 100) || '';
  const lat = sanitizeCoord(searchParams.get('lat')) || '';
  const lon = sanitizeCoord(searchParams.get('lon')) || '';

  const chartData = useMemo(() => generateAstrologyData(dob, tob, lat, lon), [dob, tob, lat, lon]);

  const handleShare = async () => {
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_compact_share_click' });
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Horoscope for ${name}`,
          text: `Check out my Vedic birth chart compact dashboard!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  const goToStandard = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/horoscope?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface overflow-y-auto">
      {/* Mobile Blocker Overlay */}
      <div className="md:hidden fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center">
        <span className="material-symbols-outlined text-6xl text-accent mb-4">desktop_windows</span>
        <h2 className={`text-2xl mb-4 ${lang === 'hi' ? 'font-hindi font-bold' : 'font-headline'}`}>{t.desktopOnly}</h2>
        <p className="text-on-surface font-body mb-8 text-sm">{t.mobileMsg}</p>
        <button
          onClick={goToStandard}
          className={cn(
            "bg-primary text-white px-8 py-3 rounded-full font-label text-sm uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95 hover:bg-primary/90",
            lang === 'hi' ? "tracking-normal text-base" : "tracking-wider"
          )}
        >
          {t.goBackBtn}
        </button>
      </div>

      {/* Header */}
      <header className="flex-none bg-white border-b border-outline/50 px-4 py-2 xl:px-6 xl:py-3.5 flex items-center justify-between shadow-sm z-10 print:hidden">
        <div className="flex items-center gap-4 xl:gap-6">
          <button
            onClick={goToStandard}
            className={cn(
              "flex items-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold bg-accent text-on-accent uppercase font-label hover:bg-accent/90 rounded-full px-2.5 py-1.5 xl:px-4 xl:py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95",
              lang === 'hi' ? "tracking-normal text-[11px] xl:text-[12px] 2xl:text-[13px]" : "tracking-wider"
            )}
            aria-label={t.backToStandard}
          >
            <span className="material-symbols-outlined text-[14px] xl:text-[16px] 2xl:text-[18px]" aria-hidden="true">arrow_back</span>
            {t.backToStandard}
          </button>

          <Link
            href="/free-horoscope"
            className={cn(
              "flex items-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold bg-accent text-on-accent uppercase font-label hover:bg-accent/90 rounded-full px-2.5 py-1.5 xl:px-4 xl:py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95",
              lang === 'hi' ? "tracking-normal text-[11px] xl:text-[12px] 2xl:text-[13px]" : "tracking-wider"
            )}
            aria-label={t.generateNew}
          >
            <span className="material-symbols-outlined text-[14px] xl:text-[16px] 2xl:text-[18px]" aria-hidden="true">add_circle</span>
            {t.generateNew}
          </Link>

          <div className="h-4 xl:h-6 w-px bg-outline/30"></div>
          <div className="flex items-center gap-4 xl:gap-6 text-xs xl:text-sm 2xl:text-base">
            <div className="flex gap-2">
              <span className="text-on-surface font-label uppercase tracking-tighter">{t.name}:</span>
              <span className="font-bold">{name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-on-surface font-label uppercase tracking-tighter">{t.date}:</span>
              <span className="font-bold">{formattedDob}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-on-surface font-label uppercase tracking-tighter">{t.time}:</span>
              <span className="font-bold">{tob}</span>
            </div>
            <div className="flex gap-2 max-w-[200px] xl:max-w-[300px] 2xl:max-w-[400px] truncate">
              <span className="text-on-surface font-label uppercase tracking-tighter">{t.place}:</span>
              <span className="font-bold truncate">{pob}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 xl:gap-5 relative">
          {showCopied && (
            <div
              aria-live="polite"
              className={`absolute -bottom-10 right-0 bg-on-surface text-surface text-[9px] xl:text-[11px] px-3 py-1.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2 duration-300 z-50 whitespace-nowrap font-medium font-label uppercase ${lang === 'en' ? 'tracking-widest' : ''}`}
            >
              {t.linkCopied}
            </div>
          )}

          {/* Segmented Language Toggle */}
          <div
            className="flex items-center bg-surface-container-high/50 p-0.5 rounded-full border border-outline/30 shadow-sm h-7 xl:h-9"
            role="group"
            aria-label={t.switchLanguage}
          >
            <button
              onClick={() => lang !== 'en' && toggleLang()}
              aria-pressed={lang === 'en'}
              aria-label="English"
              className={cn(
                "w-8 h-6 xl:w-10 xl:h-8 rounded-full transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 active:scale-95",
                lang === 'en'
                  ? 'bg-white text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.08)] font-bold'
                  : 'text-on-surface/40 hover:text-on-surface hover:bg-black/[0.03]'
              )}
            >
              <span className="text-[9px] xl:text-[11px] font-bold tracking-tight">EN</span>
            </button>
            <button
              onClick={() => lang !== 'hi' && toggleLang()}
              aria-pressed={lang === 'hi'}
              aria-label="हिन्दी"
              className={cn(
                "w-8 h-6 xl:w-10 xl:h-8 rounded-full transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 active:scale-95",
                lang === 'hi'
                  ? 'bg-white text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.08)] font-bold'
                  : 'text-on-surface/40 hover:text-on-surface hover:bg-black/[0.03]'
              )}
            >
              <span className="text-[12px] xl:text-[14px] font-hindi font-bold leading-none translate-y-[0.5px]">हि</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-all border border-outline/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95"
            title={t.shareReport}
            aria-label={t.shareReport}
          >
            <span className="material-symbols-outlined text-[18px] xl:text-[22px]" aria-hidden="true">share</span>
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openBookingModal'))}
            className={cn(
              "ml-1 bg-primary text-white px-4 py-1.5 xl:px-6 xl:py-2.5 rounded-full text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold uppercase font-label transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-95 hover:bg-primary/90",
              lang === 'en' ? 'tracking-widest' : ''
            )}
          >
            {t.bookBtn}
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-grow overflow-hidden p-3 xl:p-4 2xl:p-6 grid grid-cols-12 grid-rows-12 gap-3 xl:gap-4 2xl:gap-5 md:h-[calc(100vh-56px)] xl:md:h-[calc(100vh-70px)] md:max-h-[calc(100vh-56px)] xl:md:max-h-[calc(100vh-70px)] md:min-h-[680px]">

        {/* Left Column: Panchang & Muhurtas */}
        <div className="col-span-3 row-span-12 flex flex-col gap-3 xl:gap-4 2xl:gap-5 md:h-full md:overflow-hidden">
          {/* Panchang */}
          <section className="flex-grow bg-white border border-outline/80 rounded-2xl p-4 xl:p-6 shadow-sm overflow-y-auto no-scrollbar">
            <h2 className={`text-xs xl:text-sm font-bold text-accent uppercase font-label mb-4 xl:mb-6 border-b border-outline/30 pb-1.5 xl:pb-2.5 ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.panchang}</h2>
            <div className="grid grid-cols-2 gap-x-4 xl:gap-x-6 gap-y-3.5 xl:gap-y-5">
              {[
                { label: t.tithi, val: lang === 'en' ? chartData.panchang.tithi : chartData.panchang.tithiSanskrit },
                { label: t.paksha, val: lang === 'en' ? chartData.panchang.paksha : chartData.panchang.pakshaSanskrit },
                { label: t.vara, val: lang === 'en' ? chartData.panchang.vara : chartData.panchang.varaSanskrit },
                { label: t.nakshatra, val: lang === 'en' ? chartData.panchang.nakshatra : chartData.panchang.nakshatraSanskrit },
                { label: t.yoga, val: lang === 'en' ? chartData.panchang.yoga : chartData.panchang.yogaSanskrit },
                { label: t.karana, val: lang === 'en' ? chartData.panchang.karana : chartData.panchang.karanaSanskrit },
                { label: t.sunSign, val: lang === 'en' ? chartData.panchang.sunSign : chartData.panchang.sunSignSanskrit },
                { label: t.moonSign, val: lang === 'en' ? chartData.panchang.moonSign : chartData.panchang.moonSignSanskrit },
                { label: t.ritu, val: lang === 'en' ? chartData.panchang.ritu : chartData.panchang.rituSanskrit },
                { label: t.ayana, val: lang === 'en' ? chartData.panchang.ayana : chartData.panchang.ayanaSanskrit },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] xl:text-[11px] 2xl:text-[12px] text-on-surface font-label uppercase tracking-tighter leading-none mb-1.5 xl:mb-2">{item.label}</span>
                  <span className={`text-xs md:text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold leading-snug ${lang === 'hi' || (i <= 9 && item.val.match(/[अ-ह]/)) ? 'font-hindi' : ''}`}>{item.val}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Muhurtas */}
          <section className="bg-white border border-outline/80 rounded-2xl p-4 xl:p-6 shadow-sm">
            <h2 className={`text-xs xl:text-sm font-bold text-accent uppercase font-label mb-4 xl:mb-6 border-b border-outline/30 pb-1.5 xl:pb-2.5 ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.timings}</h2>
            <div className="grid grid-cols-2 gap-x-4 xl:gap-x-6 gap-y-3.5 xl:gap-y-5">
              {[
                { label: t.abhijit, val: chartData.panchang.abhijitMuhurta, color: 'text-success' },
                { label: t.rahu, val: chartData.panchang.rahuKaal, color: 'text-error' },
                { label: t.gulika, val: chartData.panchang.gulikaKaal, color: 'text-on-surface' },
                { label: t.yamaganda, val: chartData.panchang.yamagandaKaal, color: 'text-on-surface' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] xl:text-[11px] 2xl:text-[12px] text-on-surface font-label uppercase tracking-tighter leading-none mb-1.5 xl:mb-2">{item.label}</span>
                  <span className={`text-xs md:text-[13px] xl:text-[14px] 2xl:text-[16px] font-bold leading-snug tabular-nums font-body ${item.color}`}>{item.val}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Middle: 6 Charts Grid */}
        <div className="col-span-5 row-span-12 grid grid-cols-2 grid-rows-3 gap-3 xl:gap-4 2xl:gap-5 md:h-full md:overflow-hidden">
          <ChartBox title={t.d1Chart} data={chartData.d1} lang={lang} />
          <ChartBox title={t.d9Chart} data={chartData.d9} lang={lang} />
          <ChartBox title={t.d3Chart} data={chartData.d3} lang={lang} />
          <ChartBox title={t.d10Chart} data={chartData.d10} lang={lang} />
          <ChartBox title={t.d7Chart} data={chartData.d7} lang={lang} />
          <ChartBox title={t.d60Chart} data={chartData.d60} lang={lang} />
        </div>

        {/* Right Column: Table & Dasha */}
        <div className="col-span-4 row-span-12 flex flex-col gap-3 xl:gap-4 2xl:gap-5 md:h-full md:overflow-hidden">
          {/* Planetary Table */}
          <section className="flex-[2] bg-white border border-outline/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="bg-white px-4 py-2 xl:px-6 xl:py-3.5 border-b border-outline/50 flex justify-between items-center">
              <h2 className={`text-xs xl:text-sm font-bold text-on-surface uppercase font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.planetaryPositions}</h2>
              <div className={`flex items-center gap-3 text-[10px] xl:text-[11px] text-on-surface/70 font-body ${lang === 'hi' ? 'font-hindi font-bold' : ''}`}>
                <span className="flex items-center gap-0.5">
                  <span className="text-black font-normal">*</span>
                  <span>{lang === 'hi' ? 'वक्री' : 'Retro'}</span>
                </span>
                <span className="flex items-center gap-0.5">
                  <span className="text-black font-normal">^</span>
                  <span>{lang === 'hi' ? 'अस्त' : 'Combust'}</span>
                </span>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white shadow-sm z-10">
                  <tr className="border-b border-outline/30">
                    <th className="px-3 py-2 xl:px-4 xl:py-3.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold text-on-surface uppercase font-label">{t.planet}</th>
                    <th className="px-2 py-2 xl:px-3 xl:py-3.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold text-on-surface uppercase font-label text-center">{t.house}</th>
                    <th className="px-3 py-2 xl:px-4 xl:py-3.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold text-on-surface uppercase font-label">{t.rasi}</th>
                    <th className="px-3 py-2 xl:px-4 xl:py-3.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold text-on-surface uppercase font-label">{t.degree}</th>
                    <th className="px-3 py-2 xl:px-4 xl:py-3.5 text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold text-on-surface uppercase font-label">{t.nakshatra}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/10">
                  {chartData.planets.map((p, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-lowest transition-colors font-body">
                      <td className={`px-3 py-2 xl:px-4 xl:py-3 text-[12px] xl:text-[13px] 2xl:text-[14px] font-semibold text-on-surface ${lang === 'hi' ? 'font-hindi' : ''}`}>
                        {lang === 'hi' ? p.nameSanskrit : p.name}{p.isRetrograde && <span className="ml-0.5 text-black font-normal">*</span>}
                        {p.isCombust && <span className="ml-0.5 text-[10px] text-black font-normal">^</span>}
                      </td>
                      <td className="px-2 py-2 xl:px-3 xl:py-3 text-[12px] xl:text-[13px] 2xl:text-[14px] text-on-surface text-center font-bold tabular-nums">{p.house}</td>
                      <td className={`px-3 py-2 xl:px-4 xl:py-3 text-[12px] xl:text-[13px] 2xl:text-[14px] text-on-surface ${lang === 'hi' ? 'font-hindi' : ''}`}>{lang === 'hi' ? p.rasiSanskrit : p.rasi}</td>
                      <td className="px-3 py-2 xl:px-4 xl:py-3 text-[11px] xl:text-[12px] 2xl:text-[13px] text-on-surface whitespace-nowrap tabular-nums">{p.degree}</td>
                      <td className={`px-3 py-2 xl:px-4 xl:py-3 text-[11px] xl:text-[12px] 2xl:text-[13px] text-on-surface truncate max-w-[100px] xl:max-w-[150px] ${lang === 'hi' ? 'font-hindi' : ''}`}>{lang === 'hi' ? p.nakshatraSanskrit : p.nakshatra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`bg-surface-container-lowest px-4 py-1.5 xl:py-2.5 border-t border-outline/20 flex gap-4 text-[10px] xl:text-[11px] text-on-surface/60 font-body ${lang === 'hi' ? 'font-hindi' : ''}`}>
              <span className="flex items-center gap-0.5">
                <span className="text-black font-normal">*</span>
                <span>{lang === 'hi' ? 'वक्र' : 'Retrograde'}</span>
              </span>
              <span className="flex items-center gap-0.5">
                <span className="text-black font-normal">^</span>
                <span>{lang === 'hi' ? 'अस्त' : 'Combust'}</span>
              </span>
            </div>
          </section>

          {/* Dasha (Condensed) */}
          <section className="flex-[2] bg-white border border-outline/80 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-0">
             <div className="bg-white px-4 py-2 border-b border-outline/50 flex justify-between items-center">
              <h2 className={`text-xs font-bold text-on-surface uppercase font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.vimshottariDasha}</h2>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                 <span className={`text-[10px] font-bold text-accent uppercase font-label ${lang === 'en' ? 'tracking-tighter' : ''}`}>{t.activeDasha}</span>
              </div>
            </div>
            <div className="flex-grow overflow-hidden condensed-dasha">
               <VimshottariDasha mahadashas={chartData.mahadashas} lang={lang} />
            </div>
          </section>
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .condensed-dasha {
          height: 100%;
        }
        .condensed-dasha > div {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 0 !important;
        }
        .condensed-dasha .relative.group\/miller {
          height: 100% !important;
          flex-grow: 1 !important;
          min-height: 0 !important;
        }
        .condensed-dasha .miller-container {
          border: none;
          border-radius: 0;
          box-shadow: none;
          height: 100% !important;
        }
        .condensed-dasha .miller-container > div {
          width: 142px; /* Force smaller width for columns */
          font-size: 10px;
        }
        @media (min-width: 1280px) {
          .condensed-dasha .miller-container > div {
            width: 180px;
            font-size: 12px;
          }
        }
        @media (min-width: 1536px) {
          .condensed-dasha .miller-container > div {
            width: 220px;
            font-size: 13px;
          }
        }
        .condensed-dasha .dasha-active-indicator {
          display: none !important;
        }
        .condensed-dasha .miller-container > div > div:first-child {
          padding: 6px 8px !important;
        }
        @media (min-width: 1280px) {
          .condensed-dasha .miller-container > div > div:first-child {
            padding: 10px 14px !important;
          }
        }
        .condensed-dasha h3 {
           font-size: 9px !important;
           padding: 0 !important;
           margin: 0 !important;
           line-height: 1.2 !important;
        }
        @media (min-width: 1280px) {
          .condensed-dasha h3 {
             font-size: 11px !important;
          }
        }
        @media (min-width: 1536px) {
          .condensed-dasha h3 {
             font-size: 12px !important;
          }
        }
        .condensed-dasha .px-4 {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }
        @media (min-width: 1280px) {
          .condensed-dasha .px-4 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        .condensed-dasha .py-3 {
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
        }
        @media (min-width: 1280px) {
          .condensed-dasha .py-3 {
            padding-top: 0.75rem !important;
            padding-bottom: 0.75rem !important;
          }
        }
        .condensed-dasha .text-base {
          font-size: 0.875rem !important;
        }
        @media (min-width: 1280px) {
          .condensed-dasha .text-base {
            font-size: 1rem !important;
          }
        }
        .condensed-dasha .text-xs {
          font-size: 9px !important;
        }
        @media (min-width: 1280px) {
          .condensed-dasha .text-xs {
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
};

const ChartBox = ({ title, data, lang }: { title: string, data: DivisionalChartData, lang: string }) => (
  <section className="bg-white border border-outline/80 rounded-2xl flex flex-col shadow-sm overflow-hidden">
    <div className="bg-white px-3 py-1.5 border-b border-outline/30 xl:px-4 xl:py-2.5">
      <h2 className={`text-xs md:text-sm xl:text-base font-bold text-on-surface uppercase font-label truncate ${lang === 'en' ? 'tracking-widest' : ''}`}>{title}</h2>
    </div>
    <div className="flex-grow flex items-center justify-center p-1 overflow-hidden">
      <div className="w-full h-full max-w-[400px] max-h-[400px] xl:max-w-[480px] xl:max-h-[480px] 2xl:max-w-[550px] 2xl:max-h-[550px]">
        <KundliChart data={data} />
      </div>
    </div>
  </section>
);

export default function CompactHoroscopeClientPage() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  return (
    <div className="font-body">
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-surface">{t.loading}</div>}>
        <CompactHoroscopeContent />
      </Suspense>
    </div>
  );
}
