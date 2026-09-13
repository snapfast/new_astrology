'use client';

import { useMemo, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import KundliChart from '@/components/KundliChart';
import ExploreTools from '@/components/ExploreTools';
import { getTransitsPerAscendant, AscendantTransitData } from '@/lib/astrology';
import { sendGAEvent } from '@next/third-parties/google';

const TRANSLATIONS = {
  en: {
    heroTitle: "Transits per Ascendant",
    heroSubtitle: "Gochar per Lagna",
    heroDesc: "View today's transit planetary positions rotated across all 12 Ascendants (Lagnas) at the moment when the Ascendant degree reaches 15° for each sign.",
    referenceDate: "Selected Transit Date (IST)",
    dateDesc: "Select any date to view the 12 rotated Ascendant transit charts calculated when each sign's Lagna degree is 15°.",
    lagnaTime: "15° Lagna Time:",
    signLord: "Sign Lord:",
    eduTitle: "Understanding Rotated Ascendant Transits (Gochara)",
    eduIntro: "In Vedic Astrology, planetary transits trigger different houses depending on your Ascendant (Lagna). By analyzing planetary positions relative to each of the 12 Ascendants at mid-sign (15°), you can see how current cosmic energies affect all 12 life domains across every Lagna.",
    eduPoint1Title: "15° Midpoint Lagna",
    eduPoint1Desc: "The 15th degree represents the peak power of a sign on the eastern horizon during its daily 2-hour rising window.",
    eduPoint2Title: "House Activation",
    eduPoint2Desc: "Translating global planetary positions into specific house placements reveals current focus areas for relationships, career, finances, and health for each Lagna."
  }
};

const TransitsPerAscendantClientPage = () => {
  const t = TRANSLATIONS.en;

  // Static default for deterministic SSR/hydration
  const [selectedDate, setSelectedDate] = useState("2026-07-16");

  useEffect(() => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);

    const y = istDate.getUTCFullYear();
    const m = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const d = String(istDate.getUTCDate()).padStart(2, '0');

    setSelectedDate(`${y}-${m}-${d}`);
  }, []);

  const ascendantData: AscendantTransitData[] = useMemo(() => {
    if (!selectedDate) return [];
    return getTransitsPerAscendant(selectedDate);
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <PageHeader
        title={t.heroTitle}
        description={t.heroDesc}
      />

      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        {/* Date Selector Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-outline/20 rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <h2 className="text-xs uppercase font-label text-accent font-bold tracking-widest">{t.referenceDate}</h2>
            <p className="text-sm text-on-surface/80 font-body">{t.dateDesc}</p>
          </div>

          <div className="relative w-full sm:w-auto">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                sendGAEvent({ event: 'action_click', action_name: 'transits_ascendant_date_change', date: e.target.value });
              }}
              className="w-full sm:w-56 px-4 py-2.5 rounded-xl bg-white border border-outline/20 focus:ring-2 focus:ring-accent focus:border-accent font-body text-sm text-transparent outline-none transition-all appearance-none relative z-10 cursor-pointer"
              aria-label="Select Date"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-on-surface text-sm font-body z-20">
              {(() => {
                if (!selectedDate) return '';
                const [y, m, d] = selectedDate.split('-');
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthIdx = parseInt(m, 10) - 1;
                if (monthIdx >= 0 && monthIdx < 12) {
                  return `${parseInt(d, 10)} ${months[monthIdx]} ${y}`;
                }
                return selectedDate;
              })()}
            </div>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface pointer-events-none text-xl z-20">calendar_month</span>
          </div>
        </div>

        {/* 12 Charts Grid */}
        <div data-testid="ascendant-charts-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {ascendantData.map((item) => (
            <div
              key={item.signIndex}
              className="bg-white border border-outline/20 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="border-b border-outline/20 pb-3 flex flex-col space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-headline font-bold text-on-surface flex items-baseline gap-2">
                    {item.signName} <span className="font-hindi text-base font-normal text-on-surface/70">({item.signSanskrit})</span>
                  </h3>
                  <span className="text-xs font-label uppercase font-semibold text-accent tracking-wider">
                    Lagna #1
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-body text-on-surface/80 pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-accent">schedule</span>
                    <span>{t.lagnaTime} <strong className="text-on-surface font-semibold">{item.timeIST}</strong></span>
                  </span>
                  <span>
                    {t.signLord} <span className="font-semibold text-on-surface">{item.signLord}</span> <span className="font-hindi text-on-surface/70">({item.signLordSanskrit})</span>
                  </span>
                </div>
              </div>

              {/* Kundli Chart */}
              <div className="w-full aspect-square max-w-[340px] mx-auto py-1">
                <KundliChart data={item.chart.d1} compact={true} />
              </div>

              {/* Planets Summary Bar */}
              <div className="pt-2 border-t border-outline/10 text-xs font-body text-on-surface/80 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                {item.chart.planets.filter(p => p.name !== "Ascendant").map((p) => (
                  <span key={p.name} className="inline-flex items-center gap-0.5">
                    <strong className="text-on-surface">{p.symbol}:</strong> House {p.house} ({p.degree.split(' ')[0]})
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-8 md:py-12 bg-white border-y border-outline/20 my-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-headline text-on-surface">{t.eduTitle}</h2>
          <p className="text-sm md:text-base text-on-surface/90 font-body leading-relaxed max-w-2xl mx-auto">
            {t.eduIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-2">
            <div className="p-4 bg-surface rounded-xl border border-outline/20 space-y-1.5">
              <h3 className="text-base font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-lg">explore</span>
                {t.eduPoint1Title}
              </h3>
              <p className="text-sm text-on-surface/80 font-body leading-relaxed">{t.eduPoint1Desc}</p>
            </div>
            <div className="p-4 bg-surface rounded-xl border border-outline/20 space-y-1.5">
              <h3 className="text-base font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-accent text-lg">grid_view</span>
                {t.eduPoint2Title}
              </h3>
              <p className="text-sm text-on-surface/80 font-body leading-relaxed">{t.eduPoint2Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <ExploreTools currentPath="/transits-per-ascendant" className="my-6 md:my-8" />

      <Footer />
    </main>
  );
};

export default TransitsPerAscendantClientPage;
