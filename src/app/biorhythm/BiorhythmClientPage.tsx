"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BiorhythmChart from "@/components/BiorhythmChart";
import MiniBiorhythmChart from "@/components/MiniBiorhythmChart";
import { calculateBiorhythms, calculateBiorhythmSeries } from "@/lib/biorhythm";
import { sendGAEvent } from "@next/third-parties/google";

const BiorhythmContent = () => {
  const [dob, setDob] = useState<string>("");
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const now = new Date();
    // Initialize with UTC midnight of today
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });

  useEffect(() => {
    const savedDob = localStorage.getItem("biorhythm_dob");
    if (savedDob) {
      setDob(savedDob);
    }
  }, []);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDob = e.target.value;
    setDob(newDob);
    localStorage.setItem("biorhythm_dob", newDob);
    sendGAEvent({ event: "action_click", action_name: "biorhythm_dob_change" });
  };

  const handleTargetDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      // Input returns YYYY-MM-DD, new Date("YYYY-MM-DD") creates UTC midnight
      setTargetDate(new Date(e.target.value));
    }
  };

  const adjustDate = (days: number) => {
    const newDate = new Date(targetDate);
    newDate.setUTCDate(newDate.getUTCDate() + days);
    setTargetDate(newDate);
    sendGAEvent({
      event: "action_click",
      action_name: `biorhythm_date_adjust_${days}`,
    });
  };

  const resetToday = () => {
    const now = new Date();
    setTargetDate(
      new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())),
    );
    sendGAEvent({
      event: "action_click",
      action_name: "biorhythm_reset_today",
    });
  };

  const biorhythmData = useMemo(() => {
    if (!dob) return null;
    try {
      // dob string is YYYY-MM-DD, new Date(dob) is UTC midnight
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

  const formattedTargetDate = targetDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="pt-16 md:pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-5xl font-normal font-headline text-on-surface mb-4">
          Personal Biorhythms
        </h1>
        <p className="text-on-surface font-body max-w-2xl mx-auto text-sm md:text-base">
          Understand your natural cycles. Physical, emotional, and intellectual
          rhythms influence your daily life from the moment of birth.
        </p>
      </div>

      {biorhythmData && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 mb-8">
          {/* Chart Section */}
          {seriesData && (
            <div className="animate-in fade-in duration-1000 delay-300">
              <div className="mb-4">
                <h3 className="text-base md:text-lg font-headline text-on-surface text-center">
                  Cycle Overview (7 Days)
                </h3>
              </div>
              <BiorhythmChart series={seriesData} />
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {biorhythmData.cycles.map((cycle) => (
              <div
                key={cycle.name}
                className="bg-white border border-outline/80 rounded-[2rem] p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-headline text-on-surface">
                        {cycle.name}
                      </h3>
                      <p className="text-[9px] text-on-surface font-label uppercase tracking-widest mt-0.5">
                        {cycle.period} Day Cycle
                      </p>
                    </div>
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ color: cycle.color }}
                    >
                      {cycle.name === "Physical"
                        ? "fitness_center"
                        : cycle.name === "Emotional"
                          ? "favorite"
                          : cycle.name === "Intellectual"
                            ? "psychology"
                            : cycle.name === "Spiritual"
                              ? "self_improvement"
                              : cycle.name === "Intuitional"
                                ? "auto_awesome"
                                : cycle.name === "Aesthetic"
                                  ? "palette"
                                  : "visibility"}
                    </span>
                  </div>

                  <div className="mb-4 bg-surface-container-low/30 rounded-xl p-3">
                    {seriesData && (
                      <MiniBiorhythmChart
                        series={seriesData}
                        cycleName={cycle.name}
                        color={cycle.color}
                      />
                    )}
                  </div>

                  <p className="text-xs text-on-surface font-body leading-relaxed">
                    {cycle.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Integrated Interpretation Box */}
            <div className="bg-accent/5 border border-accent/20 rounded-[2rem] p-4 md:p-5 flex flex-col justify-center">
              <h4 className="text-base font-headline text-on-surface mb-2">
                Interpretation
              </h4>
              <p className="text-[11px] text-on-surface font-body leading-tight">
                Values above the center line are <strong>High Phases</strong>{" "}
                (energetic), below are <strong>Low Phases</strong> (rest).
                Crossing the line indicates transition or instability.
              </p>
            </div>
          </div>
        </div>
      )}

      {!biorhythmData && dob && (
        <div className="text-center py-12">
          <p className="text-on-surface font-body">
            Calculating your rhythms...
          </p>
        </div>
      )}

      {!dob && (
        <div className="text-center py-12 animate-pulse">
          <p className="text-on-surface font-body text-base">
            Please enter your birth date to see your personal biorhythm cycles.
          </p>
          <span className="material-symbols-outlined text-accent text-5xl mt-6">
            calendar_today
          </span>
        </div>
      )}

      {/* Unified Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 bg-white border border-outline/80 rounded-[2.5rem] p-5 md:p-6 shadow-sm mb-8">
        {/* DOB Input */}
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0">
            <label
              htmlFor="dob"
              className="block text-[10px] font-bold text-accent uppercase tracking-widest font-label mb-1 sm:mb-0"
            >
              Date of Birth
            </label>
          </div>
          <div className="relative w-full sm:max-w-[200px]">
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={handleDobChange}
              className="w-full bg-surface-container-low border-none rounded-xl px-4 py-2 text-on-surface font-body focus:ring-2 focus:ring-accent transition-all text-sm appearance-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent pointer-events-none text-lg">
              calendar_today
            </span>
          </div>
        </div>

        {/* Target Date Navigation (Only shown when DOB is present) */}
        {dob && (
          <div className="flex flex-col md:flex-row items-center gap-6 border-t md:border-t-0 md:border-l border-outline/20 pt-6 md:pt-0 md:pl-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => adjustDate(-1)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-accent hover:bg-surface-container-high transition-colors border border-outline/30"
                title="Previous Day"
                aria-label="Previous Day"
              >
                <span className="material-symbols-outlined text-xl">
                  chevron_left
                </span>
              </button>

              <button
                onClick={resetToday}
                className="px-6 py-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors text-[10px] font-label uppercase tracking-wider"
              >
                Today
              </button>

              <button
                onClick={() => adjustDate(1)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-accent hover:bg-surface-container-high transition-colors border border-outline/30"
                title="Next Day"
                aria-label="Next Day"
              >
                <span className="material-symbols-outlined text-xl">
                  chevron_right
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <input
                  type="date"
                  value={targetDate.toISOString().split("T")[0]}
                  onChange={handleTargetDateChange}
                  className="w-full md:w-44 px-4 py-2 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-accent font-body text-sm text-on-surface outline-none transition-all appearance-none"
                  aria-label="Select Target Date"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-accent pointer-events-none text-lg">
                  event
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-label text-accent uppercase tracking-widest mb-0.5">
                  Analysis Date
                </p>
                <p className="text-xs font-body tabular-nums text-on-surface whitespace-nowrap">
                  {formattedTargetDate}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-outline/80 rounded-[2.5rem] p-5 md:p-6 shadow-sm mt-8">
        <h4 className="text-xl font-headline text-on-surface mb-4">
          History & Origins
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-on-surface font-body leading-relaxed">
          <p>
            The theory of biorhythms originated in the late 19th century with
            Wilhelm Fliess, a Berlin physician who observed recurring 23-day
            physical and 28-day emotional cycles. He believed these rhythms were
            present from birth and influenced human behavior throughout life.
          </p>
          <p>
            In the early 20th century, Alfred Teltscher added the 33-day
            intellectual cycle after observing rhythmic patterns in
            students&apos; academic performance, suggesting that mental
            alertness also followed a cyclic nature.
          </p>
          <p>
            Popularized in the 1970s, biorhythm charting became a global
            phenomenon. While modern science views these as a historical
            curiosity, they remain a popular tool for self-reflection and
            understanding the natural ebb and flow of human energy.
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
