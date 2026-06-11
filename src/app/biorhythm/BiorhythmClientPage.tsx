'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BiorhythmChart from '@/components/BiorhythmChart';
import MiniBiorhythmChart from '@/components/MiniBiorhythmChart';
import { calculateBiorhythms, calculateBiorhythmSeries } from '@/lib/biorhythm';
import { sendGAEvent } from '@next/third-parties/google';

const BiorhythmContent = () => {
  const [dob, setDob] = useState<string>('');
  const [targetDate, setTargetDate] = useState<Date>(new Date());

  useEffect(() => {
    const savedDob = localStorage.getItem('biorhythm_dob');
    if (savedDob) {
      setDob(savedDob);
    }
  }, []);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDob = e.target.value;
    setDob(newDob);
    localStorage.setItem('biorhythm_dob', newDob);
    sendGAEvent({ event: 'action_click', action_name: 'biorhythm_dob_change' });
  };

  const adjustDate = (days: number) => {
    const newDate = new Date(targetDate);
    newDate.setDate(newDate.getDate() + days);
    setTargetDate(newDate);
    sendGAEvent({ event: 'action_click', action_name: `biorhythm_date_adjust_${days}` });
  };

  const resetToday = () => {
    setTargetDate(new Date());
    sendGAEvent({ event: 'action_click', action_name: 'biorhythm_reset_today' });
  };

  const biorhythmData = useMemo(() => {
    if (!dob) return null;
    try {
      return calculateBiorhythms(new Date(dob), targetDate);
    } catch {
      return null;
    }
  }, [dob, targetDate]);

  const seriesData = useMemo(() => {
    if (!dob) return null;
    try {
      // Range 3 means -3 to +3, total 7 days
      return calculateBiorhythmSeries(new Date(dob), targetDate, 3);
    } catch {
      return null;
    }
  }, [dob, targetDate]);

  const formattedTargetDate = targetDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="pt-16 md:pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-normal font-headline text-on-surface mb-4">Personal Biorhythms</h1>
        <p className="text-secondary font-body max-w-2xl mx-auto">
          Understand your natural cycles. Physical, emotional, and intellectual rhythms influence your daily life from the moment of birth.
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-md mx-auto mb-12">
        <div className="bg-white border border-outline/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
          <label htmlFor="dob" className="block text-[10px] font-bold text-accent uppercase tracking-widest font-label mb-4 text-center">
            Enter Your Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={handleDobChange}
            className="w-full bg-surface-container-low border-none rounded-2xl px-6 py-4 text-on-surface font-body focus:ring-2 focus:ring-accent transition-all text-center"
          />
        </div>
      </div>

      {biorhythmData && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Subtle Date Selector */}
          <div className="flex items-center justify-center gap-2 md:gap-4 bg-surface-container-low/40 rounded-full py-2 px-4 border border-outline/30 w-fit mx-auto">
            <button
              onClick={() => adjustDate(-1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-accent hover:bg-surface-container-high transition-colors"
              title="Previous Day"
              aria-label="Previous Day"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>

            <div className="px-4 text-center">
              <h2 className="text-xs font-bold font-label text-on-surface uppercase tracking-widest">{formattedTargetDate}</h2>
            </div>

            <button
              onClick={() => adjustDate(1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-accent hover:bg-surface-container-high transition-colors"
              title="Next Day"
              aria-label="Next Day"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>

            <div className="w-px h-4 bg-outline/20 mx-1" />

            <button
              onClick={resetToday}
              className="w-8 h-8 rounded-full flex items-center justify-center text-accent hover:bg-surface-container-high transition-colors"
              title="Reset to Today"
              aria-label="Reset to Today"
            >
              <span className="material-symbols-outlined text-xl">today</span>
            </button>
          </div>

          {/* Chart Section */}
          {seriesData && (
            <div className="animate-in fade-in duration-1000 delay-300">
              <div className="mb-6">
                <h3 className="text-lg font-headline text-on-surface text-center">Cycle Overview (7 Days)</h3>
              </div>
              <BiorhythmChart series={seriesData} />
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biorhythmData.cycles.map((cycle) => (
              <div key={cycle.name} className="bg-white border border-outline/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-headline text-on-surface">{cycle.name}</h3>
                      <p className="text-[10px] text-secondary font-label uppercase tracking-widest mt-1">
                        {cycle.period} Day Cycle
                      </p>
                    </div>
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ color: cycle.color }}
                    >
                      {cycle.name === 'Physical' ? 'fitness_center' :
                       cycle.name === 'Emotional' ? 'favorite' :
                       cycle.name === 'Intellectual' ? 'psychology' :
                       cycle.name === 'Spiritual' ? 'self_improvement' :
                       cycle.name === 'Intuitional' ? 'auto_awesome' :
                       cycle.name === 'Aesthetic' ? 'palette' : 'visibility'}
                    </span>
                  </div>

                  <div className="mb-6 bg-surface-container-low/30 rounded-2xl p-4">
                    {seriesData && (
                      <MiniBiorhythmChart
                        series={seriesData}
                        cycleName={cycle.name}
                        color={cycle.color}
                      />
                    )}
                  </div>

                  <p className="text-sm text-secondary font-body leading-relaxed">
                    {cycle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-[2.5rem] p-6 md:p-8 text-center max-w-3xl mx-auto">
            <h4 className="text-lg font-headline text-on-surface mb-2">How to interpret these results?</h4>
            <p className="text-sm text-secondary font-body leading-relaxed">
              Values above the center line indicate a <strong>High Phase</strong>, where you likely feel more energetic and capable in that area.
              Values below the line are <strong>Low Phases</strong>, suitable for rest and caution.
              The most critical days are when the cycle crosses the center line, often marked by instability or transition.
            </p>
          </div>
        </div>
      )}

      {!biorhythmData && dob && (
         <div className="text-center py-20">
            <p className="text-secondary font-body">Calculating your rhythms...</p>
         </div>
      )}

      {!dob && (
        <div className="text-center py-20 animate-pulse">
           <p className="text-secondary font-body text-lg">Please enter your birth date to see your personal biorhythm cycles.</p>
           <span className="material-symbols-outlined text-accent text-6xl mt-8">calendar_today</span>
        </div>
      )}

      <div className="bg-white border border-outline/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm mt-12">
        <h4 className="text-xl font-headline text-on-surface mb-4">History & Origins</h4>
        <div className="space-y-4 text-sm text-secondary font-body leading-relaxed">
          <p>
            The theory of biorhythms originated in the late 19th century with Wilhelm Fliess, a Berlin physician who observed recurring 23-day physical and 28-day emotional cycles. He believed these rhythms were present from birth and influenced human behavior throughout life.
          </p>
          <p>
            In the early 20th century, Alfred Teltscher, a professor of engineering at the University of Innsbruck, added the 33-day intellectual cycle. He developed this theory after observing rhythmic patterns in his students&apos; academic performance, suggesting that mental alertness and ability to absorb information also followed a cyclic nature.
          </p>
          <p>
            Popularized in the 1970s through books and early handheld calculators like the Casio Biolator, biorhythm charting became a global phenomenon. While modern science views these fixed cycles as more of a historical curiosity than a biological certainty, they remain a popular tool for self-reflection and understanding the natural ebb and flow of human energy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function BiorhythmPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <BiorhythmContent />
      <Footer />
    </main>
  );
}
