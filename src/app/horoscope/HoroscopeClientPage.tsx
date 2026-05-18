'use client';

import { Suspense, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KundliChart from '@/components/KundliChart';
import VimshottariDasha from '@/components/VimshottariDasha';
import BookConsultationModal from '@/components/BookConsultationModal';
import { generateAstrologyData } from '@/lib/astrology';
import { sendGAEvent } from '@next/third-parties/google';
import { downloadHoroscopePDF } from '@/lib/pdf-utils';
import { sanitize, sanitizeCoord } from '@/lib/security';

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
    timings: "Auspicious & Inauspicious Timings",
    abhijit: "Abhijit Muhurta",
    rahu: "Rahu Kaal",
    gulika: "Gulika Kaal",
    yamaganda: "Yamaganda Kaal"
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
    timings: "शुभ और अशुभ समय",
    abhijit: "अभिजीत मुहूर्त",
    rahu: "राहु काल",
    gulika: "गुलिका काल",
    yamaganda: "यमगण्ड काल"
  }
};

const HoroscopeContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const t = TRANSLATIONS[lang];
  const searchParams = useSearchParams();
  const name = sanitize(searchParams.get('name'), 100) || 'Guest';
  const dob = sanitize(searchParams.get('dob'), 10) || '';
  const formattedDob = useMemo(() => {
    if (!dob) return '';
    const parts = dob.split('-');
    if (parts.length !== 3) return '';
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  }, [dob]);
  const tob = sanitize(searchParams.get('tob'), 5) || '';
  const pob = sanitize(searchParams.get('pob'), 100) || '';
  const lat = sanitizeCoord(searchParams.get('lat')) || '';
  const lon = sanitizeCoord(searchParams.get('lon')) || '';

  const chartData = useMemo(() => generateAstrologyData(dob, tob, lat, lon), [dob, tob, lat, lon]);

  const handleBookNow = () => {
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_page_book_now' });
    setIsBookingModalOpen(true);
  };

  const handleDownloadPDF = async () => {
    if (contentRef.current) {
      sendGAEvent({ event: 'action_click', action_name: 'horoscope_page_download_pdf' });
      const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      await downloadHoroscopePDF(contentRef.current, `horoscope_${safeName}`);
    }
  };

  return (
    <div ref={contentRef} data-pdf-content="true" className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* PDF-only Branding Header */}
      <div className="hidden pdf-only flex-col items-center mb-12 w-full text-center">
        <div className="text-3xl font-normal tracking-tight font-headline flex items-center justify-center gap-1">
          <span className="text-on-surface whitespace-nowrap">Rahul Bali</span>
          <span className="text-accent italic whitespace-nowrap">Astrology</span>
        </div>
        <p className="text-[10px] text-secondary tracking-widest uppercase font-label mt-2">rahulbaliastrology@gmail.com</p>
      </div>

      {/* Header & User Details */}
      <div className="mb-12 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="bg-surface-container-high border border-outline/30 px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-secondary font-label flex items-center gap-2 pdf-hide">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            Representative Digital Map
          </span>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline/30 text-on-surface font-medium text-[7px] md:text-[9px] tracking-[0.1em] uppercase hover:bg-surface-container-low transition-colors print:hidden pdf-hide"
          >
            <span className="material-symbols-outlined text-[12px] md:text-sm">download</span>
            Download PDF
          </button>
        </div>
        <h1 className="text-3xl md:text-4xl font-normal mb-8 font-headline text-on-surface">Your Birth Chart</h1>

        <div className="space-y-3 text-left">
          {/* Section: Birth Information */}
          <div className="bg-white border border-outline/80 rounded-2xl p-4 md:p-5 relative shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className={`font-bold text-accent uppercase tracking-[0.2em] font-label ${lang === 'hi' ? 'text-[12px]' : 'text-[10px]'}`}>{t.birthInfo}</h2>
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="pdf-hide w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 border border-outline/50"
                title="Switch Language / भाषा बदलें"
              >
                <span className="material-symbols-outlined text-[18px]">translate</span>
              </button>
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
            <div className="lg:col-span-2 bg-white border border-outline/80 rounded-2xl p-4 md:p-5 shadow-sm">
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
            <div className="bg-white border border-outline/80 rounded-2xl p-4 md:p-5 shadow-sm">
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
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">Lagna Chart (D1)</h2>
            <KundliChart data={chartData.d1} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">Navamsha Chart (D9)</h2>
            <KundliChart data={chartData.d9} />
          </div>
        </div>

        {/* Row 2: D3 & D10 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">Drekkana Chart (D3)</h2>
            <KundliChart data={chartData.d3} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">Dashamsha Chart (D10)</h2>
            <KundliChart data={chartData.d10} />
          </div>
        </div>
        <p className="text-xs text-secondary text-center italic pt-4">Traditional North Indian Style Representation of Divisional Charts</p>
      </div>


      <div className="space-y-6 mb-16">
        <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">Planetary Positions</h2>
        <div className="overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline">
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Planet</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label text-center">House</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Rasi</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Rasi Lord</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Degree</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Nakshatra</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Nak Lord</th>
                <th className="px-4 py-2.5 text-xs font-bold text-on-surface uppercase tracking-widest font-label text-center">Pada</th>
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
                  <td className="px-4 py-2.5 text-sm text-on-surface font-mono whitespace-nowrap">{p.degree}</td>
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
        <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-3">Vimshottri Dasha</h2>

        {/* Interactive Vimshottari Dasha System */}
        <VimshottariDasha mahadashas={chartData.mahadashas} />
      </div>

      {/* Verification CTA Section */}
      <div className="bg-surface-container-low rounded-[2.5rem] md:rounded-[4rem] border border-outline/50 p-8 md:p-16 text-center relative overflow-hidden max-w-5xl mx-auto print:hidden pdf-hide">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">Seeking Verified Information?</h3>
          <p className="text-sm md:text-base text-secondary font-body mb-10 max-w-2xl mx-auto leading-relaxed">
            This digital chart provides a representative visualization based on standard algorithms. For high-precision verified information—including exact planetary degrees, specific Ayanamsa, and personalized karmic insights—a manual expert review is essential.
          </p>
          <button
            onClick={handleBookNow}
            className="inline-block bg-primary text-white px-12 py-5 rounded-full font-medium text-xs md:text-sm tracking-[0.1em] uppercase font-label"
          >
            Book Verified Personal Consultation
          </button>
        </div>
        {/* Subtle Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-0"></div>
      </div>
      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* PDF-only Branding Footer */}
      <div className="hidden pdf-only flex-col items-center mt-20 pt-10 border-t border-outline/30 w-full text-center">
        <p className="text-[10px] tracking-widest uppercase font-medium text-secondary/60 font-label">
          Rahul Bali Astrology Services © 2025. All rights reserved.
        </p>
        <p className="text-[9px] text-secondary/40 mt-2 font-label tracking-wider uppercase">Professional Jyotish Shastra Consultations</p>
        <p className="text-[9px] text-accent mt-4 font-label tracking-widest uppercase font-bold">Contact: rahulbaliastrology@gmail.com</p>
      </div>
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
