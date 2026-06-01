'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { generateAstrologyData } from '@/lib/astrology';

const DailyPanchang = () => {
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
    <section className="py-24 bg-surface-bright relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="bg-white border border-outline/40 rounded-[3rem] p-8 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] font-label block mb-4">Panchang</span>
              <h2 className="text-3xl md:text-5xl font-normal font-headline text-on-surface mb-6 leading-tight">Today&apos;s Panchang</h2>
              <p className="text-secondary font-body leading-relaxed mb-8 max-w-lg">
                Align your daily activities with the cosmic rhythm. Follow the daily Tithi, Nakshatra, and auspicious Muhurtas for success and spiritual harmony.
              </p>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest font-label">Auspicious Muhurta</p>
                  <p className="text-lg font-headline text-on-surface">{panchang.abhijitMuhurta}</p>
                </div>
              </div>
              <Link
                href="/panchang"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
              >
                View Full Daily Panchang
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline/20">
                <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em] font-label block mb-2">Tithi (Lunar Day)</span>
                <p className="text-xl font-headline text-on-surface mb-1">{panchang.tithi}</p>
                <p className="text-xs text-accent font-medium">{panchang.tithiSanskrit}</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline/20">
                <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em] font-label block mb-2">Nakshatra</span>
                <p className="text-xl font-headline text-on-surface mb-1">{panchang.nakshatra}</p>
                <p className="text-xs text-accent font-medium">{panchang.nakshatraSanskrit}</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline/20">
                <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em] font-label block mb-2">Yoga</span>
                <p className="text-xl font-headline text-on-surface mb-1">{panchang.yoga}</p>
                <p className="text-xs text-accent font-medium">{panchang.yogaSanskrit}</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline/20">
                <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.2em] font-label block mb-2">Moon Sign</span>
                <p className="text-xl font-headline text-on-surface mb-1">{panchang.moonSign}</p>
                <p className="text-xs text-accent font-medium">{panchang.moonSignSanskrit}</p>
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
