'use client';

import { useMemo, memo } from 'react';
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
  }
};

const DailyPanchangComponent = ({ className = "" }: DailyPanchangProps) => {
  const t = TRANSLATIONS.en;

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
    <section className={`py-16 bg-surface-bright relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="bg-white border border-outline/20 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row items-center gap-12 relative">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-normal font-headline text-on-surface mb-8 leading-tight">{t.title}</h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0">
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">sunny</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.abhijit}</p>
                    <p className="text-lg font-body tabular-nums text-on-surface">{panchang.abhijitMuhurta}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center text-error shrink-0">
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">block</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.rahu}</p>
                    <p className="text-lg font-body tabular-nums text-on-surface">{panchang.rahuKaal}</p>
                  </div>
                </div>
              </div>
              <Link
                href="/panchang"
                className="group/btn inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label shadow-lg hover:shadow-xl active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {t.viewFull}
                <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

            <div className="lg:w-1/2 w-full grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-3 hover:bg-on-surface/[0.02] p-2 -m-2 rounded-xl transition-colors duration-300">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.tithi}</p>
                {(panchang.tithisList || [{ name: panchang.tithi, sanskrit: panchang.tithiSanskrit, end: panchang.tithiEnd }]).map((item, idx) => (
                  <div key={idx} className="space-y-0.5 border-l border-accent/10 pl-2">
                    <p className="text-xl font-headline text-on-surface">
                      {`${panchang.paksha} ${item.name}`}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : `${t.endsAt}: --:--`}
                    </p>
                    <p className="text-xs md:text-sm text-on-surface/80 font-hindi">{panchang.pakshaSanskrit} {item.sanskrit}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 hover:bg-on-surface/[0.02] p-2 -m-2 rounded-xl transition-colors duration-300">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.nakshatra}</p>
                {(panchang.nakshatrasList || [{ name: panchang.nakshatra, sanskrit: panchang.nakshatraSanskrit, end: panchang.nakshatraEnd }]).map((item, idx) => (
                  <div key={idx} className="space-y-0.5 border-l border-accent/10 pl-2">
                    <p className="text-xl font-headline text-on-surface">
                      {item.name}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : `${t.endsAt}: --:--`}
                    </p>
                    <p className="text-xs md:text-sm text-on-surface/80 font-hindi">{item.sanskrit}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 hover:bg-on-surface/[0.02] p-2 -m-2 rounded-xl transition-colors duration-300">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.yoga}</p>
                {(panchang.yogasList || [{ name: panchang.yoga, sanskrit: panchang.yogaSanskrit, end: panchang.yogaEnd }]).map((item, idx) => (
                  <div key={idx} className="space-y-0.5 border-l border-accent/10 pl-2">
                    <p className="text-xl font-headline text-on-surface">
                      {item.name}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : `${t.endsAt}: --:--`}
                    </p>
                    <p className="text-xs md:text-sm text-on-surface/80 font-hindi">{item.sanskrit}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 hover:bg-on-surface/[0.02] p-2 -m-2 rounded-xl transition-colors duration-300">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.karana}</p>
                {(panchang.karanasList || [{ name: panchang.karana, sanskrit: panchang.karanaSanskrit, end: panchang.karanaEnd }]).map((item, idx) => (
                  <div key={idx} className="space-y-0.5 border-l border-accent/10 pl-2">
                    <p className="text-xl font-headline text-on-surface">
                      {item.name}
                    </p>
                    <p className="text-xs text-accent font-medium tabular-nums">
                      {item.end ? `${t.endsAt}: ${item.end}` : `${t.endsAt}: --:--`}
                    </p>
                    <p className="text-xs md:text-sm text-on-surface/80 font-hindi">{item.sanskrit}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 hover:bg-on-surface/[0.02] p-2 -m-2 rounded-xl transition-colors duration-300">
                <p className="font-bold text-on-surface uppercase font-label text-[9px] tracking-widest">{t.vara}</p>
                <div className="space-y-0.5 border-l border-accent/10 pl-2">
                  <p className="text-xl font-headline text-on-surface">{panchang.vara}</p>
                  <p className="text-xs md:text-sm text-on-surface/80 font-hindi">{panchang.varaSanskrit}</p>
                </div>
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

const DailyPanchang = memo(DailyPanchangComponent);
DailyPanchang.displayName = 'DailyPanchang';

export default DailyPanchang;
