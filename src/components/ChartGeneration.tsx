'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const ChartGeneration = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const dob = formData.get('dob');
    const tob = formData.get('tob');
    const pob = formData.get('pob');

    const params = new URLSearchParams({
      name: name as string,
      dob: dob as string,
      tob: tob as string,
      pob: pob as string,
    });

    router.push(`/horoscope?${params.toString()}`);
  };

  return (
    <section className="py-24 bg-background -mt-32 relative z-20">
      <div className="max-w-4xl mx-auto px-8">
        <div className="bg-surface p-10 md:p-16 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-outline/50 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-8 md:mb-12 text-center">
              <h2 className="text-2xl md:text-4xl font-normal mb-4 font-headline text-on-surface">Generate Your Chart</h2>
              <p className="text-xs md:text-sm text-secondary font-body max-w-sm mx-auto">Enter your details to unlock a precise map of the stars at the moment of your birth.</p>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Full Name</label>
                <input
                  name="name"
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-xs md:text-sm font-body"
                  placeholder="John Doe"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Date of Birth</label>
                <input
                  name="dob"
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body"
                  type="date"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Time of Birth</label>
                <input
                  name="tob"
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 text-on-surface text-xs md:text-sm font-body"
                  type="time"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[7px] md:text-[10px] font-medium text-secondary uppercase tracking-widest ml-1 font-label">Place of Birth</label>
                <input
                  name="pob"
                  className="w-full px-6 py-3 md:py-4 bg-surface-container-low border border-outline rounded-full focus:ring-1 focus:ring-accent/20 placeholder:text-secondary/30 text-on-surface text-xs md:text-sm font-body"
                  placeholder="City, Country"
                  type="text"
                  required
                />
              </div>
              <div className="md:col-span-2 pt-2 md:pt-4">
                <button className="w-full py-4 md:py-5 bg-primary text-white rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label" type="submit">
                  Generate Horoscope Chart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartGeneration;
