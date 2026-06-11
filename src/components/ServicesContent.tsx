'use client';

import React from 'react';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';

export default function ServicesContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-background relative overflow-hidden border-b border-outline/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-accent/5 rounded-full blur-[140px] -z-0"></div>
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-6 block font-label">Spiritual Guidance</span>
          <h1 className="text-5xl md:text-7xl font-normal mb-8 font-headline text-on-surface tracking-tight">Vedic Astrology Services</h1>
          <p className="text-xl font-body text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            Professional consultations grounded in the ancient principles of Jyotish Shastra, providing clarity on your life&apos;s unique karmic path.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            {SPECIALIZED_SERVICES.map((service) => (
              <div key={service.id} className="space-y-4">
                <h3 className="text-xl font-normal font-headline text-on-surface tracking-tight flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  {service.title}
                </h3>
                <p className="text-sm font-body text-secondary leading-relaxed pl-4.5 border-l border-outline/30">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Footer Mantra */}
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center border-t border-outline/20 pt-12">
          <p className="text-lg md:text-2xl text-accent font-body">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </p>
        </div>
      </section>
    </>
  );
}
