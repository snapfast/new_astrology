'use client';

import { useMemo, memo } from 'react';
import Link from 'next/link';
import { generateAstrologyData } from '@/lib/astrology';
import DeepamIcon from './DeepamIcon';

interface DailyPanchangProps {
  className?: string;
}

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
    title: "Today's Panchang Schedule",
    subtitle: "Daily Panchang Changes & Key Timings (Sunrise to Sunrise)",
    viewFull: "View Full Daily Panchang",
    sunrise: "Sunrise",
    sunset: "Sunset",
    abhijit: "Abhijit Muhurta",
    rahu: "Rahu Kaal",
    timelineTitle: "Daily Timeline of Changes"
  }
};

const DailyPanchangComponent = ({ className = "" }: DailyPanchangProps) => {
  const t = TRANSLATIONS.en;

  const { panchang, timelineEvents } = useMemo(() => {
    const now = new Date();
    // Convert to IST (UTC+5:30) for calculation
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);

    const dob = istTime.toISOString().split('T')[0];
    const tob = "12:00";

    // Default to New Delhi coordinates
    const data = generateAstrologyData(dob, tob, "28.6139", "77.2090");
    const p = data.panchang;

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

    // Helper to convert time strings like "06:15 AM", "02:30 PM", or "02:30 PM, Jul 11" to minutes for sorting
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

    return { panchang: p, timelineEvents: events };
  }, []);

  return (
    <section className={`py-16 bg-surface-bright relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="bg-white border border-outline/20 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row items-start gap-12 relative">

            {/* Left Column: Title, Key Timings & CTA */}
            <div className="lg:w-5/12 w-full space-y-8">
              <div>
                <h2 className="text-2xl md:text-4xl font-normal font-headline text-on-surface mb-3 leading-tight">
                  {t.title}
                </h2>
                <p className="text-xs md:text-sm text-on-surface/70 font-body">
                  {t.subtitle}
                </p>
              </div>

              {/* Key Timings Card */}
              <div className="bg-surface/60 border border-outline/20 rounded-2xl p-6 space-y-5">
                <h3 className="text-xs font-bold text-accent uppercase font-label tracking-widest border-b border-outline/10 pb-3">
                  Key Daily Timings
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-accent shrink-0">wb_sunny</span>
                    <div>
                      <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.sunrise}</p>
                      <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.sunrise}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-accent shrink-0">wb_twilight</span>
                    <div>
                      <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.sunset}</p>
                      <p className="text-sm font-body tabular-nums text-on-surface font-semibold">{panchang.sunset}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DeepamIcon width={20} height={20} className="shrink-0" />
                    <div>
                      <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.abhijit}</p>
                      <p className="text-xs font-body tabular-nums text-on-surface font-medium">{panchang.abhijitMuhurta}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl text-error shrink-0">block</span>
                    <div>
                      <p className="font-bold text-on-surface/60 uppercase font-label text-[9px] tracking-widest">{t.rahu}</p>
                      <p className="text-xs font-body tabular-nums text-on-surface font-medium">{panchang.rahuKaal}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  prefetch={true}
                  href="/panchang"
                  className="btn-primary group/btn inline-flex items-center gap-2 px-8 py-4 text-[10px] md:text-xs tracking-[0.1em] shadow-lg hover:shadow-xl"
                >
                  {t.viewFull}
                  <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Chronological Timeline */}
            <div className="lg:w-7/12 w-full bg-surface/30 border border-outline/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-xs font-bold text-accent uppercase font-label tracking-widest border-b border-outline/10 pb-4 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span>{t.timelineTitle}</span>
              </h3>

              <div className="relative border-l-2 border-accent/20 pl-6 ml-3 space-y-6">
                {timelineEvents.map((evt, idx) => (
                  <div key={idx} className="relative group">
                    {/* Bullet marker */}
                    <div className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                      evt.type === 'sunrise' || evt.type === 'sunset'
                        ? 'bg-accent border-white ring-2 ring-accent/30'
                        : 'bg-white border-accent'
                    }`} />

                    <div className="bg-white border border-outline/20 rounded-xl p-4 shadow-2xs hover:border-accent/40 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs md:text-sm font-bold text-accent font-body tabular-nums">
                          {evt.time}
                        </span>
                        <span className="text-[9px] font-label font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-surface text-on-surface/80 border border-outline/10">
                          {evt.badge}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="text-sm md:text-base font-bold font-headline text-on-surface">
                          {evt.title}
                        </h4>
                        {evt.titleSanskrit && (
                          <span className="text-xs md:text-sm text-on-surface font-hindi font-medium">
                            {evt.titleSanskrit}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-on-surface/70 font-body mt-1 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                ))}
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
