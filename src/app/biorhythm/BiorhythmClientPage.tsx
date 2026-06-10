'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { calculateBiorhythms, calculateBiorhythmSeries } from '@/lib/biorhythm';
import { sendGAEvent } from '@next/third-parties/google';
import BiorhythmChart from '@/components/BiorhythmChart';

const BiorhythmContent = () => {
  const [dob, setDob] = useState('');
  const [targetDate, setTargetDate] = useState(new Date());

  useEffect(() => {
    const savedDob = localStorage.getItem('biorhythm_dob');
    if (savedDob) setDob(savedDob);
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
      return calculateBiorhythmSeries(new Date(dob), targetDate, 15);
    } catch {
      return null;
    }
  }, [dob, targetDate]);

  const formattedTargetDate = targetDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pt-20 md:pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* Date Selector */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 bg-surface-container-low/50 rounded-3xl p-6 border border-outline/50">
            <button
              onClick={() => adjustDate(-1)}
              className="flex items-center gap-2 text-accent hover:text-accent/80 font-label text-xs uppercase tracking-widest font-bold transition-colors group"
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
              Previous Day
            </button>

            <div className="text-center">
              <h2 className="text-xl font-headline text-on-surface">{formattedTargetDate}</h2>
              <button
                onClick={resetToday}
                className="text-[10px] text-accent uppercase tracking-widest font-bold mt-1 hover:underline"
              >
                Reset to Today
              </button>
            </div>

            <button
              onClick={() => adjustDate(1)}
              className="flex items-center gap-2 text-accent hover:text-accent/80 font-label text-xs uppercase tracking-widest font-bold transition-colors group"
            >
              Next Day
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>

          {/* Chart Section */}
          {seriesData && (
            <div className="animate-in fade-in duration-1000 delay-300">
              <div className="mb-6">
                <h3 className="text-lg font-headline text-on-surface text-center">Cycle Overview (31 Days)</h3>
              </div>
              <BiorhythmChart series={seriesData} />
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biorhythmData.cycles.map((cycle) => (
              <div key={cycle.name} className="bg-white border border-outline/80 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-headline text-on-surface">{cycle.name}</h3>
                      <p className="text-[10px] text-secondary font-label uppercase tracking-widest mt-1">
                        {cycle.period} Day Cycle
                      </p>
                    </div>
                    <div className="text-3xl font-bold font-body tabular-nums" style={{ color: cycle.color }}>
                      {Math.round((cycle.value + 1) * 50)}%
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(cycle.value + 1) * 50}%`,
                          backgroundColor: cycle.color
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] font-bold font-label uppercase tracking-widest">
                      <span className="text-secondary/50">Low Phase</span>
                      <span className="text-secondary/50">High Phase</span>
                    </div>

                    <p className="text-sm text-secondary font-body leading-relaxed pt-2">
                      {cycle.description}
                    </p>
                  </div>
                </div>

                {/* Decorative background icon */}
                <span
                  className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl opacity-[0.03] select-none group-hover:scale-110 transition-transform duration-700 pointer-events-none"
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
            ))}
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-[2.5rem] p-6 md:p-8 text-center max-w-3xl mx-auto">
            <h4 className="text-lg font-headline text-on-surface mb-2">How to interpret these results?</h4>
            <p className="text-sm text-secondary font-body leading-relaxed">
              Values above 50% indicate a <strong>High Phase</strong>, where you likely feel more energetic and capable in that area.
              Values below 50% are <strong>Low Phases</strong>, suitable for rest and caution.
              The most critical days are when the cycle crosses the 50% line (0 value), often marked by instability or transition.
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
