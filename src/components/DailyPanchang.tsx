'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { generateAstrologyData } from '@/lib/astrology';

interface DailyPanchangProps {
  className?: string;
}

const TRANSLATIONS = {
  en: {
    title: "Today's Panchang",
    viewFull: "View Full Daily Panchang",
    tithi: "Tithi",
    nakshatra: "Nakshatra",
    yoga: "Yoga",
    karana: "Karana",
    vara: "Vara",
    abhijit: "Auspicious Muhurta",
    rahu: "Rahu Kaal",
    endsAt: "Ends at"
  },
  hi: {
    title: "आज का पंचांग",
    viewFull: "पूरा पंचांग देखें",
    tithi: "तिथि",
    nakshatra: "नक्षत्र",
    yoga: "योग",
    karana: "करण",
    vara: "वार",
    abhijit: "शुभ मुहूर्त",
    rahu: "राहु काल",
    endsAt: "समाप्ति समय"
  }
};

const DailyPanchang = ({ className = "" }: DailyPanchangProps) => {
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

  const t = TRANSLATIONS[lang];

  const panchang = useMemo(() => {
    const now = new Date();
    // Convert to IST (UTC+5:30) for calculation
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);

    const dob = istTime.toISOString().split('T')[0];
    const tob = istTime.toISOString().split('T')[1].substring(0, 5);

    // Default to New Delhi coordinates
    const data = generateAstrologyData(dob, tob, "28.6139", "77.2090");
    return data.panchang;
  }, []);

  return (
    <section className={`py-24 bg-surface-bright relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="bg-white border border-outline/80 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-12 relative">
            {/* Language Toggle Button */}
            <div className="absolute top-0 right-0 z-20">
              <button
                onClick={toggleLang}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95 border border-outline/50 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                title="Switch Language / भाषा बदलें"
                aria-label="Switch Language / भाषा बदलें"
              >
                <span className="material-symbols-outlined text-[20px]">translate</span>
              </button>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-normal font-headline text-on-surface mb-8 leading-tight">{t.title}</h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                    <span className="material-symbols-outlined text-xl">sunny</span>
                  </div>
                  <div>
                    <p className={`font-bold text-secondary uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.abhijit}</p>
                    <p className="text-lg font-body tabular-nums text-on-surface">{panchang.abhijitMuhurta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center text-error shrink-0">
                    <span className="material-symbols-outlined text-xl">block</span>
                  </div>
                  <div>
                    <p className={`font-bold text-secondary uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.rahu}</p>
                    <p className="text-lg font-body tabular-nums text-on-surface">{panchang.rahuKaal}</p>
                  </div>
                </div>
              </div>
              <Link
                href="/panchang"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
              >
                {t.viewFull}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="lg:w-1/2 w-full grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-1">
                <p className={`font-bold text-secondary uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.tithi}</p>
                <p className="text-xl font-headline text-on-surface">
                  {lang === 'en'
                    ? `${panchang.paksha} ${panchang.tithi}`
                    : `${panchang.pakshaSanskrit} ${panchang.tithiSanskrit}`}
                </p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.tithiEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-secondary opacity-90 font-medium">{panchang.pakshaSanskrit} {panchang.tithiSanskrit}</p>}
              </div>

              <div className="space-y-1">
                <p className={`font-bold text-secondary uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.nakshatra}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.nakshatra : panchang.nakshatraSanskrit}</p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.nakshatraEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-secondary opacity-90 font-medium">{panchang.nakshatraSanskrit}</p>}
              </div>

              <div className="space-y-1">
                <p className={`font-bold text-secondary uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.yoga}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.yoga : panchang.yogaSanskrit}</p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.yogaEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-secondary opacity-90 font-medium">{panchang.yogaSanskrit}</p>}
              </div>

              <div className="space-y-1">
                <p className={`font-bold text-secondary uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.karana}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.karana : panchang.karanaSanskrit}</p>
                <p className="text-xs text-accent font-medium tabular-nums">{t.endsAt}: {panchang.karanaEnd}</p>
                {lang === 'en' && <p className="text-[10px] text-secondary opacity-90 font-medium">{panchang.karanaSanskrit}</p>}
              </div>

              <div className="space-y-1">
                <p className={`font-bold text-secondary uppercase font-label ${lang === 'hi' ? 'text-[11px]' : 'text-[9px] tracking-widest'}`}>{t.vara}</p>
                <p className="text-xl font-headline text-on-surface">{lang === 'en' ? panchang.vara : panchang.varaSanskrit}</p>
                {lang === 'en' && <p className="text-[10px] text-secondary opacity-90 font-medium">{panchang.varaSanskrit}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative subtle background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[0.5px] border-outline/5 rounded-full -z-0"></div>
    </section>
  );
};

export default DailyPanchang;
