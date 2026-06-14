'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import KundliChart from '@/components/KundliChart';
import VimshottariDasha from '@/components/VimshottariDasha';
import BookConsultationModal from '@/components/BookConsultationModal';
import { generateAstrologyData, DivisionalChartData } from '@/lib/astrology';
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
    goBack: "Go to Standard View"
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
    goBack: "सामान्य दृश्य पर जाएं"
  }
};

const CompactHoroscopeContent = () => {
  const router = useRouter();
  const { lang } = useLanguage();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const t = TRANSLATIONS[lang];
  const searchParams = useSearchParams();
  const name = sanitize(searchParams.get('name'), 100) || 'Guest';
  const dob = sanitizeDate(searchParams.get('dob')) || '';
  const formattedDob = useMemo(() => {
    if (!dob) return '';
    const parts = dob.split('-');
    if (parts.length !== 3) return '';
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }, [dob]);
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
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const goToStandard = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/horoscope?${params.toString()}`);
  };

  return (
    <div className="h-screen flex flex-col bg-surface text-on-surface overflow-hidden">
      {/* Mobile Blocker Overlay */}
      <div className="md:hidden fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center">
        <span className="material-symbols-outlined text-6xl text-accent mb-4">desktop_windows</span>
        <h2 className="text-2xl font-headline mb-4">{t.desktopOnly}</h2>
        <p className="text-on-surface font-body mb-8 text-sm">{t.mobileMsg}</p>
        <button
          onClick={goToStandard}
          className="bg-primary text-white px-8 py-3 rounded-full font-label text-sm uppercase tracking-wider"
        >
          {t.goBack}
        </button>
      </div>

      {/* Header */}
      <header className="flex-none bg-white border-b border-outline/50 px-4 py-2 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-6">
          <button
            onClick={goToStandard}
            className="flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-wider font-label hover:text-accent"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            {t.backToStandard}
          </button>
          <div className="h-4 w-px bg-outline/30"></div>
          <div className="flex items-center gap-4 text-xs">
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
            <div className="flex gap-2 max-w-[200px] truncate">
              <span className="text-on-surface font-label uppercase tracking-tighter">{t.place}:</span>
              <span className="font-bold truncate">{pob}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors border border-outline/50"
            title="Share"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="ml-2 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest font-label"
          >
            Book Consultation
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-grow overflow-hidden p-3 grid grid-cols-12 grid-rows-12 gap-3">

        {/* Left Column: Panchang & Muhurtas */}
        <div className="col-span-2 row-span-12 flex flex-col gap-3">
          {/* Panchang */}
          <section className="flex-grow bg-white border border-outline/80 rounded-2xl p-3 shadow-sm overflow-y-auto no-scrollbar">
            <h2 className={`text-[10px] font-bold text-accent uppercase font-label mb-3 border-b border-outline/30 pb-1 ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.panchang}</h2>
            <div className="space-y-2.5">
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
                  <span className="text-[9px] text-on-surface font-label uppercase tracking-tighter leading-none mb-1">{item.label}</span>
                  <span className={`text-xs font-bold leading-tight ${lang === 'hi' || (i <= 9 && item.val.match(/[अ-ह]/)) ? 'font-hindi' : ''}`}>{item.val}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Muhurtas */}
          <section className="bg-white border border-outline/80 rounded-2xl p-3 shadow-sm">
            <h2 className={`text-[10px] font-bold text-accent uppercase font-label mb-3 border-b border-outline/30 pb-1 ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.timings}</h2>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { label: t.abhijit, val: chartData.panchang.abhijitMuhurta, color: 'text-success' },
                { label: t.rahu, val: chartData.panchang.rahuKaal, color: 'text-error' },
                { label: t.gulika, val: chartData.panchang.gulikaKaal, color: 'text-on-surface' },
                { label: t.yamaganda, val: chartData.panchang.yamagandaKaal, color: 'text-on-surface' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[9px] text-on-surface font-label uppercase tracking-tighter leading-none mb-1">{item.label}</span>
                  <span className={`text-[11px] font-bold leading-tight tabular-nums font-body ${item.color}`}>{item.val}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Middle: 6 Charts Grid */}
        <div className="col-span-6 row-span-12 grid grid-cols-3 grid-rows-2 gap-3">
          <ChartBox title={t.d1Chart} data={chartData.d1} lang={lang} />
          <ChartBox title={t.d9Chart} data={chartData.d9} lang={lang} />
          <ChartBox title={t.d3Chart} data={chartData.d3} lang={lang} />
          <ChartBox title={t.d10Chart} data={chartData.d10} lang={lang} />
          <ChartBox title={t.d7Chart} data={chartData.d7} lang={lang} />
          <ChartBox title={t.d60Chart} data={chartData.d60} lang={lang} />
        </div>

        {/* Right Column: Table & Dasha */}
        <div className="col-span-4 row-span-12 flex flex-col gap-3">
          {/* Planetary Table */}
          <section className="flex-[3] bg-white border border-outline/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="bg-surface-container-low px-3 py-1.5 border-b border-outline/50">
              <h2 className={`text-[10px] font-bold text-on-surface uppercase font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.planetaryPositions}</h2>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white shadow-sm z-10">
                  <tr className="border-b border-outline/30">
                    <th className="px-2 py-1.5 text-[9px] font-bold text-on-surface uppercase font-label">{t.planet}</th>
                    <th className="px-1 py-1.5 text-[9px] font-bold text-on-surface uppercase font-label text-center">{t.house}</th>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-on-surface uppercase font-label">{t.rasi}</th>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-on-surface uppercase font-label">{t.degree}</th>
                    <th className="px-2 py-1.5 text-[9px] font-bold text-on-surface uppercase font-label">{t.nakshatra}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/10">
                  {chartData.planets.map((p, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-lowest transition-colors font-body">
                      <td className="px-2 py-1.5 text-[11px] font-medium text-on-surface">
                        {p.name}{p.isRetrograde && '*'}
                      </td>
                      <td className="px-1 py-1.5 text-[11px] text-on-surface text-center font-bold tabular-nums">{p.house}</td>
                      <td className="px-2 py-1.5 text-[11px] text-on-surface">{p.rasi}</td>
                      <td className="px-2 py-1.5 text-[10px] text-on-surface whitespace-nowrap tabular-nums">{p.degree}</td>
                      <td className="px-2 py-1.5 text-[10px] text-on-surface truncate max-w-[80px]">{p.nakshatra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dasha (Condensed) */}
          <section className="flex-[2] bg-white border border-outline/80 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-0">
             <div className="bg-surface-container-low px-3 py-1.5 border-b border-outline/50 flex justify-between items-center">
              <h2 className={`text-[10px] font-bold text-on-surface uppercase font-label ${lang === 'en' ? 'tracking-widest' : ''}`}>{t.vimshottariDasha}</h2>
              <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                 <span className="text-[8px] font-bold text-accent uppercase tracking-tighter font-label">Active</span>
              </div>
            </div>
            <div className="flex-grow overflow-hidden condensed-dasha">
               <VimshottariDasha mahadashas={chartData.mahadashas} />
            </div>
          </section>
        </div>
      </main>

      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .condensed-dasha .miller-container {
          border: none;
          border-radius: 0;
          box-shadow: none;
          height: 100%;
        }
        .condensed-dasha .miller-container > div {
          width: 140px; /* Force smaller width for columns */
          font-size: 10px;
        }
        .condensed-dasha h3 {
           font-size: 8px !important;
           padding: 4px 8px !important;
        }
        .condensed-dasha .px-4 {
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }
        .condensed-dasha .py-3 {
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
        }
        .condensed-dasha .text-base {
          font-size: 0.875rem !important;
        }
        .condensed-dasha .text-xs {
          font-size: 9px !important;
        }
      `}</style>
    </div>
  );
};

const ChartBox = ({ title, data, lang }: { title: string, data: DivisionalChartData, lang: string }) => (
  <section className="bg-white border border-outline/80 rounded-2xl flex flex-col shadow-sm overflow-hidden">
    <div className="bg-surface-container-low px-3 py-1 border-b border-outline/30">
      <h2 className={`text-[9px] font-bold text-on-surface uppercase font-label truncate ${lang === 'en' ? 'tracking-widest' : ''}`}>{title}</h2>
    </div>
    <div className="flex-grow flex items-center justify-center p-1 overflow-hidden">
      <div className="w-full h-full max-w-[280px] max-h-[280px]">
        <KundliChart data={data} />
      </div>
    </div>
  </section>
);

export default function CompactHoroscopeClientPage() {
  return (
    <div className="font-body">
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-surface">Loading Dashboard...</div>}>
        <CompactHoroscopeContent />
      </Suspense>
    </div>
  );
}
