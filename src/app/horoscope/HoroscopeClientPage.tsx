'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KundliChart from '@/components/KundliChart';
import VimshottariDasha from '@/components/VimshottariDasha';
import BookConsultationModal from '@/components/BookConsultationModal';
import { generateAstrologyData, getSignInsight } from '@/lib/astrology';
import { sendGAEvent } from '@next/third-parties/google';
import { sanitize, sanitizeCoord, sanitizeDate, sanitizeTime } from '@/lib/security';

const TRANSLATIONS = {
  en: {
    birthInfo: "Birth Information",
    name: "Name",
    date: "Date",
    time: "Time",
    place: "Place",
    panchang: "Vedic Panchang",
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
    timings: "Muhurtas & Kaal",
    abhijit: "Abhijit Muhurta",
    rahu: "Rahu Kaal",
    gulika: "Gulika Kaal",
    yamaganda: "Yamaganda Kaal",
    d1Chart: "Lagna Chart (D1)",
    d3Chart: "Drekkana Chart (D3)",
    d7Chart: "Saptamsha Chart (D7)",
    d9Chart: "Navamsha Chart (D9)",
    d10Chart: "Dashamsha Chart (D10)",
    d60Chart: "Shashtiamsha Chart (D60)",
    planet: "Planet",
    house: "House",
    rasi: "Rasi",
    rasiLord: "Rasi Lord",
    degree: "Degree",
    nakLord: "Nak Lord",
    pada: "Pada",
    planetaryPositions: "Planetary Positions",
    vimshottariDasha: "Vimshottari Dasha",
    sunSignInsight: "Sun Sign Insight",
    moonSignInsight: "Moon Sign Insight",
    generateNew: "Generate New Chart",
    pageTitle: "Your Birth Chart",
    compactView: "Compact Dashboard",
    ctaTitle: "Seeking Verified Information?",
    ctaDesc: "This digital chart provides a visualization based on standard algorithms. For high-precision verified information—including exact planetary degrees, specific Ayanamsa, and personalized karmic insights—a manual expert review is essential.",
    ctaBtn: "Book Verified Personal Consultation"
  },
  hi: {
    birthInfo: "जन्म विवरण",
    name: "नाम",
    date: "दिनांक",
    time: "समय",
    place: "स्थान",
    panchang: "वैदिक पंचांग",
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
    timings: "मुहूर्त और काल",
    abhijit: "अभिजीत मुहूर्त",
    rahu: "राहु काल",
    gulika: "गुलिक काल",
    yamaganda: "यमगण्ड काल",
    d1Chart: "लग्न चार्ट (D1)",
    d3Chart: "द्रेष्काण चार्ट (D3)",
    d7Chart: "सप्तमंश चार्ट (D7)",
    d9Chart: "नवांश चार्ट (D9)",
    d10Chart: "दशमांश चार्ट (D10)",
    d60Chart: "षष्ट्यंश चार्ट (D60)",
    planet: "ग्रह",
    house: "भाव",
    rasi: "राशि",
    rasiLord: "राशि स्वामी",
    degree: "अंश",
    nakLord: "नक्षत्र स्वामी",
    pada: "पद",
    planetaryPositions: "ग्रहों की स्थिति",
    vimshottariDasha: "विंशोत्तरी दशा",
    sunSignInsight: "सूर्य राशि अंतर्दृष्टि",
    moonSignInsight: "चंद्र राशि अंतर्दृष्टि",
    generateNew: "नई कुंडली बनाएं",
    pageTitle: "आपकी जन्म कुंडली",
    compactView: "कॉम्पैक्ट डैशबोर्ड",
    ctaTitle: "सत्यापित जानकारी खोज रहे हैं?",
    ctaDesc: "यह डिजिटल चार्ट मानक एल्गोरिदम पर आधारित एक विज़ुअलाइज़ेशन प्रदान करता है। सटीक सत्यापित जानकारी के लिए—जिसमें सटीक ग्रह अंश, विशिष्ट अयनांश और व्यक्तिगत कर्म संबंधी अंतर्दृष्टि शामिल है—एक विशेषज्ञ समीक्षा आवश्यक है।",
    ctaBtn: "सत्यापित व्यक्तिगत परामर्श बुक करें"
  }
};

const HoroscopeContent = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferred_lang') as 'en' | 'hi';
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    localStorage.setItem('preferred_lang', newLang);
  };

  const goToCompact = () => {
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_go_compact' });
    const params = new URLSearchParams(searchParams.toString());
    window.location.href = `/horoscope/compact?${params.toString()}`;
  };

  const t = TRANSLATIONS[lang];
  const searchParams = useSearchParams();
  const name = sanitize(searchParams.get('name'), 100) || 'Guest';
  const dob = sanitizeDate(searchParams.get('dob')) || '';
  const formattedDob = useMemo(() => {
    if (!dob) return '';
    const parts = dob.split('-');
    if (parts.length !== 3) return '';
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  }, [dob]);
  const tob = sanitizeTime(searchParams.get('tob')) || '';
  const pob = sanitize(searchParams.get('pob'), 100) || '';
  const lat = sanitizeCoord(searchParams.get('lat')) || '';
  const lon = sanitizeCoord(searchParams.get('lon')) || '';

  const chartData = useMemo(() => generateAstrologyData(dob, tob, lat, lon), [dob, tob, lat, lon]);

  const sunSign = chartData.panchang.sunSign;
  const moonSign = chartData.panchang.moonSign;

  const handleShare = async () => {
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_share_click' });
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Horoscope for ${name}`,
          text: `Check out my Vedic birth chart! Sun Sign: ${sunSign}, Moon Sign: ${moonSign}.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookNow = () => {
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_page_book_now' });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & User Details */}
      <div className="mb-12 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div className="space-y-4">
            <a
              href="/free-horoscope"
              className="flex items-center gap-2 text-xs font-medium text-accent hover:text-accent/80 transition-colors uppercase tracking-widest font-label"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              {t.generateNew}
            </a>
            <h1 className="text-3xl md:text-4xl font-normal font-headline text-on-surface">{t.pageTitle}</h1>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <button
              onClick={goToCompact}
              className="hidden lg:flex h-10 items-center justify-center px-4 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors active:scale-95 border border-accent/20 shadow-sm mr-2"
              title="Switch to High-Density Compact Dashboard"
            >
              <span className="material-symbols-outlined text-[20px] mr-2">dashboard</span>
              <span className="text-[10px] font-bold uppercase tracking-widest font-label">{t.compactView}</span>
            </button>
            <button
              onClick={toggleLang}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 border border-outline/50 shadow-sm"
              title="Switch Language / भाषा बदलें"
            >
              <span className="material-symbols-outlined text-[20px]">translate</span>
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 border border-outline/50 shadow-sm"
              title="Share Report"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>

        {/* New: Personality Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-accent/5 border border-accent/20 rounded-3xl p-6 text-left relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] font-label block mb-2">{t.sunSignInsight}</span>
              <h3 className="text-xl font-headline text-on-surface mb-3">{lang === 'en' ? sunSign : chartData.panchang.sunSignSanskrit}</h3>
              <p className="text-sm text-secondary font-body leading-relaxed">{getSignInsight(sunSign, lang)}</p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-accent/5 select-none group-hover:scale-110 transition-transform duration-700">light_mode</span>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 text-left relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-label block mb-2">{t.moonSignInsight}</span>
              <h3 className="text-xl font-headline text-on-surface mb-3">{lang === 'en' ? moonSign : chartData.panchang.moonSignSanskrit}</h3>
              <p className="text-sm text-secondary font-body leading-relaxed">{getSignInsight(moonSign, lang)}</p>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-primary/5 select-none group-hover:scale-110 transition-transform duration-700">dark_mode</span>
          </div>
        </div>

        <div className="space-y-3 text-left">
          {/* Section: Birth Information */}
          <div className="bg-white border border-outline/80 rounded-3xl p-4 md:p-5 relative shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-bold text-accent uppercase tracking-[0.2em] font-label ${lang === 'hi' ? 'text-[12px]' : 'text-[10px]'}`}>{t.birthInfo}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <div className="space-y-1">
                <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.name}</p>
                <p className="text-sm md:text-base font-headline text-on-surface leading-tight min-h-[1.5rem] flex items-center">{name}</p>
              </div>
              <div className="space-y-1">
                <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.date}</p>
                <p className="text-sm md:text-base font-headline text-on-surface leading-tight min-h-[1.5rem] flex items-center">{formattedDob}</p>
              </div>
              <div className="space-y-1">
                <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.time}</p>
                <p className="text-sm md:text-base font-headline text-on-surface leading-tight min-h-[1.5rem] flex items-center">{tob}</p>
              </div>
              <div className="space-y-1">
                <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.place}</p>
                <p className="text-sm md:text-base font-headline text-on-surface leading-tight min-h-[1.5rem] flex items-center">{pob}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Section: Vedic Panchang */}
            <div className="lg:col-span-2 bg-white border border-outline/80 rounded-3xl p-4 md:p-5 shadow-sm">
              <h2 className={`font-bold text-accent uppercase tracking-[0.2em] font-label mb-3 ${lang === 'hi' ? 'text-[12px]' : 'text-[10px]'}`}>{t.panchang}</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-3">
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.tithi}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.tithi : chartData.panchang.tithiSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.paksha}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.paksha : chartData.panchang.pakshaSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.vara}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.vara : chartData.panchang.varaSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.nakshatra}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.nakshatra : chartData.panchang.nakshatraSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.yoga}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.yoga : chartData.panchang.yogaSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.karana}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.karana : chartData.panchang.karanaSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.sunSign}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.sunSign : chartData.panchang.sunSignSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.moonSign}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.moonSign : chartData.panchang.moonSignSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.ritu}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.ritu : chartData.panchang.rituSanskrit}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.ayana}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{lang === 'en' ? chartData.panchang.ayana : chartData.panchang.ayanaSanskrit}</p>
                </div>
              </div>
            </div>

            {/* Section: Time Divisions */}
            <div className="bg-white border border-outline/80 rounded-3xl p-4 md:p-5 shadow-sm">
              <h2 className={`font-bold text-accent uppercase tracking-[0.2em] font-label mb-3 ${lang === 'hi' ? 'text-[12px]' : 'text-[10px]'}`}>{t.timings}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3">
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.abhijit}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{chartData.panchang.abhijitMuhurta}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.rahu}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{chartData.panchang.rahuKaal}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.gulika}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{chartData.panchang.gulikaKaal}</p>
                </div>
                <div className="space-y-1">
                  <p className={`text-on-surface/70 uppercase tracking-widest font-label leading-none flex items-center ${lang === 'hi' ? 'text-[11px] font-bold h-4' : 'text-[9px] font-medium h-3'}`}>{t.yamaganda}</p>
                  <p className={`text-on-surface leading-tight min-h-[1rem] flex items-center ${lang === 'hi' ? 'text-[14px] font-bold' : 'text-[12px] font-medium'}`}>{chartData.panchang.yamagandaKaal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-8 mb-12">
        {/* Row 1: D1 & D9 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.d1Chart}</h2>
            <KundliChart data={chartData.d1} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.d9Chart}</h2>
            <KundliChart data={chartData.d9} />
          </div>
        </div>

        {/* Row 2: D3 & D10 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.d3Chart}</h2>
            <KundliChart data={chartData.d3} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.d10Chart}</h2>
            <KundliChart data={chartData.d10} />
          </div>
        </div>

        {/* Row 3: D7 & D60 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.d7Chart}</h2>
            <KundliChart data={chartData.d7} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.d60Chart}</h2>
            <KundliChart data={chartData.d60} />
          </div>
        </div>
        <p className="text-xs text-secondary text-center italic pt-4">Traditional North Indian Style Representation of Divisional Charts</p>
      </div>


      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.planetaryPositions}</h2>
        <div className="overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline">
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">{t.planet}</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label text-center">{t.house}</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">{t.rasi}</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">{t.rasiLord}</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">{t.degree}</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">{t.nakshatra}</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">{t.nakLord}</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label text-center">{t.pada}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline">
              {chartData.planets.map((p, idx) => (
                <tr key={idx} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-4 py-2.5 text-sm font-medium text-on-surface">
                    {p.name}
                    {p.isRetrograde && <span className="ml-1">*</span>}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-on-surface text-center">{p.house}</td>
                  <td className="px-4 py-2.5 text-sm text-on-surface">{p.rasi}</td>
                  <td className="px-4 py-2.5 text-sm text-on-surface">{p.rasiLord}</td>
                  <td className="px-4 py-2.5 text-sm text-on-surface font-body whitespace-nowrap">{p.degree}</td>
                  <td className="px-4 py-2.5 text-sm text-on-surface">{p.nakshatra}</td>
                  <td className="px-4 py-2.5 text-sm text-on-surface">{p.nakshatraLord}</td>
                  <td className="px-4 py-2.5 text-sm text-on-surface text-center font-bold">{p.pada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Vimshottari Dasha Section */}
      <div className="space-y-8 mb-16">
        <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">{t.vimshottariDasha}</h2>

        {/* Interactive Vimshottari Dasha System */}
        <VimshottariDasha mahadashas={chartData.mahadashas} />
      </div>

      {/* Verification CTA Section */}
      <div className="bg-surface-container-low rounded-[2.5rem] md:rounded-[4rem] border border-outline/50 p-8 md:p-16 text-center relative overflow-hidden max-w-5xl mx-auto print:hidden">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">{t.ctaTitle}</h3>
          <p className="text-sm md:text-base text-secondary font-body mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.ctaDesc}
          </p>
          <button
            onClick={handleBookNow}
            className="inline-block bg-primary text-white px-12 py-5 rounded-full font-medium text-xs md:text-sm tracking-[0.1em] uppercase font-label"
          >
            {t.ctaBtn}
          </button>
        </div>
        {/* Subtle Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-0"></div>
      </div>
      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};


export default function HoroscopeClientPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center">Loading your destiny...</div>}>
        <HoroscopeContent />
      </Suspense>
      <Footer />
    </main>
  );
}
