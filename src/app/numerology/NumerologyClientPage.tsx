'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ExploreTools from '@/components/ExploreTools';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import {
  NumerologySystem,
  calculateMulank,
  calculateBhagyank,
  calculateNamank,
  getLuckyNumbersMatrix,
  NUMEROLOGY_PROFILES
} from '@/lib/numerology';

export default function NumerologyClientPage() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [system, setSystem] = useState<NumerologySystem>('chaldean');
  const [isCalculated, setIsCalculated] = useState(false);

  const [results, setResults] = useState<{
    mulank: number;
    bhagyank: number;
    namank: { total: number; singleDigit: number; breakdown: { letter: string; value: number }[] };
    luckyMatrix: ReturnType<typeof getLuckyNumbersMatrix>;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dob) return;

    const mulank = calculateMulank(dob);
    const bhagyank = calculateBhagyank(dob);
    const namank = calculateNamank(name, system);
    const luckyMatrix = getLuckyNumbersMatrix(mulank, bhagyank);

    setResults({
      mulank,
      bhagyank,
      namank,
      luckyMatrix
    });
    setIsCalculated(true);
    sendGAEvent({ event: 'generate_numerology', method: system });
  };

  const handleReset = () => {
    setName('');
    setDob('');
    setIsCalculated(false);
    setResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body text-on-surface selection:bg-accent/20">
      <Navbar />

      <main className="flex-grow pt-24 pb-12">
        <PageHeader
          title="Numerology Analysis"
          subtitle="Vedic & Western Anka Jyotish"
          description="Discover your Mulank (Birth), Bhagyank (Destiny), and Namank (Name) numbers to understand your core traits and lucky patterns."
        />

        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-8">
          <form onSubmit={handleCalculate} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline/20 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-on-surface/70 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-bright border border-outline/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  placeholder="e.g. Rahul Bali"
                  required
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-xs font-semibold text-on-surface/70 uppercase tracking-wider mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-surface-bright border border-outline/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="system" className="block text-xs font-semibold text-on-surface/70 uppercase tracking-wider mb-2">
                  Numerology System
                </label>
                <select
                  id="system"
                  value={system}
                  onChange={(e) => setSystem(e.target.value as NumerologySystem)}
                  className="w-full md:w-1/2 bg-surface-bright border border-outline/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                >
                  <option value="chaldean">Chaldean (Vedic Anka Jyotish)</option>
                  <option value="pythagorean">Pythagorean (Western)</option>
                </select>
                <p className="text-[11px] text-on-surface/60 mt-2">
                  Chaldean assigns values 1-8 based on sound vibrations. Pythagorean assigns 1-9 sequentially to the alphabet.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="submit"
                className="btn-primary px-8 py-3 text-sm tracking-[0.1em] flex items-center gap-2"
              >
                <span className="material-symbols-outlined !text-[18px]">calculate</span>
                Calculate Numbers
              </button>
              {isCalculated && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 text-sm font-medium text-on-surface/70 hover:text-on-surface hover:bg-black/5 active:bg-black/10 rounded-xl transition-all tracking-[0.05em]"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {isCalculated && results && (
            <div className="mt-12 space-y-8 animate-fade-in">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-bright border border-outline/20 rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-xs font-label font-bold text-on-surface/60 uppercase tracking-widest mb-2">Mulank (Birth)</div>
                  <div className="text-5xl font-headline text-accent mb-2">{results.mulank}</div>
                  <div className="text-sm font-medium text-on-surface/80">{NUMEROLOGY_PROFILES[results.mulank]?.rulingPlanet}</div>
                </div>
                <div className="bg-surface-bright border border-outline/20 rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-xs font-label font-bold text-on-surface/60 uppercase tracking-widest mb-2">Bhagyank (Destiny)</div>
                  <div className="text-5xl font-headline text-accent mb-2">{results.bhagyank}</div>
                  <div className="text-sm font-medium text-on-surface/80">{NUMEROLOGY_PROFILES[results.bhagyank]?.rulingPlanet}</div>
                </div>
                <div className="bg-surface-bright border border-outline/20 rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-xs font-label font-bold text-on-surface/60 uppercase tracking-widest mb-2">Namank (Name)</div>
                  <div className="text-5xl font-headline text-accent mb-2">{results.namank.singleDigit}</div>
                  <div className="text-sm font-medium text-on-surface/80">Compound: {results.namank.total}</div>
                </div>
              </div>

              {/* Name Breakdown */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline/20">
                <h3 className="text-lg font-headline mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent">sort_by_alpha</span>
                  Letter Value Breakdown
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.namank.breakdown.map((item, idx) => (
                    item.letter.trim() === '' ? (
                      <div key={idx} className="w-4 h-full"></div>
                    ) : (
                      <div key={idx} className="flex flex-col items-center justify-center w-10 h-12 bg-surface rounded-lg border border-outline/10">
                        <span className="text-sm font-bold uppercase">{item.letter}</span>
                        <span className="text-xs text-on-surface/60">{item.value}</span>
                      </div>
                    )
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-outline/10 text-sm text-on-surface/80">
                  <p>System: <span className="font-semibold capitalize">{system}</span></p>
                  <p>Total Value: <span className="font-semibold">{results.namank.total}</span> &rarr; Reduces to: <span className="font-semibold text-accent">{results.namank.singleDigit}</span></p>
                </div>
              </div>

              {/* Lucky Matrix */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-outline/20">
                <h3 className="text-lg font-headline mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent">grid_view</span>
                  Personal Lucky Numbers Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-bold text-on-surface/60 uppercase mb-2">Primary Single Digits</div>
                    <div className="flex flex-wrap gap-2">
                      {results.luckyMatrix.singleDigits.map(num => (
                        <span key={num} className="px-3 py-1 bg-surface-bright border border-outline/20 rounded-lg text-sm font-medium">{num}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface/60 uppercase mb-2">Lucky 2-Digit Combos</div>
                    <div className="flex flex-wrap gap-2">
                      {results.luckyMatrix.twoDigits.map(num => (
                        <span key={num} className="px-3 py-1 bg-surface-bright border border-outline/20 rounded-lg text-sm font-medium">{num}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface/60 uppercase mb-2">Vehicle / Core Patterns</div>
                    <div className="flex flex-wrap gap-2">
                      {results.luckyMatrix.vehiclePlatePatterns.map(num => (
                        <span key={num} className="px-3 py-1 bg-surface-bright border border-outline/20 rounded-lg text-sm font-medium">{num}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="space-y-6">
                {[
                  { title: "Mulank (Birth Number) Analysis", num: results.mulank, desc: "Represents your inner nature, inherent traits, and day-to-day personality." },
                  { title: "Bhagyank (Destiny Number) Analysis", num: results.bhagyank, desc: "Represents your life path, ultimate destiny, and long-term achievements." }
                ].map(section => {
                  const profile = NUMEROLOGY_PROFILES[section.num];
                  if (!profile) return null;
                  return (
                    <div key={section.title} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-outline/20">
                      <div className="mb-6">
                        <h3 className="text-xl font-headline mb-1">{section.title}</h3>
                        <p className="text-sm text-on-surface/70">{section.desc}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <div className="text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-1">Planet & Element</div>
                          <p className="font-medium">{profile.rulingPlanet} • {profile.element}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-1">Gemstone</div>
                          <p className="font-medium">{profile.gemstone}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-1">Lucky Colors</div>
                          <p className="font-medium">{profile.luckyColors.join(', ')}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-1">Lucky Days</div>
                          <p className="font-medium">{profile.luckyDays.join(', ')}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-1">Friends & Enemies</div>
                          <p className="font-medium text-sm">Friends: {profile.friendlyNumbers.join(', ')} | Enemies: {profile.enemyNumbers.join(', ')}</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-outline/10">
                        <div className="text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-3">Key Traits</div>
                        <div className="flex flex-wrap gap-2">
                          {profile.traits.map(trait => (
                            <span key={trait} className="px-3 py-1 bg-surface rounded-full text-xs font-medium border border-outline/10">{trait}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-outline/10">
                        <div className="text-xs font-bold text-on-surface/50 uppercase tracking-widest mb-3 flex items-center gap-1">
                          <span className="material-symbols-outlined !text-sm text-accent">self_improvement</span>
                          Remedies & Guidance
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-on-surface/80">
                          {profile.remedies.map((remedy, idx) => (
                            <li key={idx}>{remedy}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA and Mantra */}
              <div className="flex flex-col items-center justify-center pt-8 pb-4 space-y-6">
                <p className="text-xl md:text-2xl text-accent font-hindi text-center mb-4">
                  ॥ ॐ नमो भगवते वासुदेवाय नमः ॥
                </p>
                <div className="bg-surface-bright rounded-2xl p-6 text-center max-w-lg mx-auto border border-outline/20">
                  <h4 className="font-headline text-lg mb-2">Need Deeper Insights?</h4>
                  <p className="text-sm text-on-surface/70 mb-4">
                    Book a personalized session with Pandit Rahul Bali Ji to align your name, numbers, and birth chart for success.
                  </p>
                  <Link href="/book-astrology-reading-online" className="btn-primary px-6 py-2.5 text-sm inline-block">
                    Book Consultation
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      {isCalculated && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12 w-full">
            <ExploreTools currentPath="/numerology" />
        </div>
      )}
      {!isCalculated && (
         <ExploreTools currentPath="/numerology" />
      )}
      <Footer />
    </div>
  );
}
