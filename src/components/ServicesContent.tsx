'use client';

import React from 'react';
import { CONSULTATIONS } from '@/lib/consultations';

export default function ServicesContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background relative overflow-hidden border-b border-outline/20">
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
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8 space-y-32">
          {CONSULTATIONS.map((service, serviceIdx) => (
            <div key={service.id} className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-start">
              {/* Left: Service Title & Description (40%) */}
              <div className="lg:col-span-4 space-y-6">
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent block font-label">Service 0{serviceIdx + 1}</span>
                <h2 className="text-4xl md:text-5xl font-normal font-headline text-on-surface tracking-tight leading-tight">
                  {service.title}
                </h2>
                <p className="text-lg font-body text-secondary leading-relaxed">
                  {service.description}
                </p>
                <div className="pt-4">
                   <a
                    href="https://wa.me/919306057150"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent hover:underline underline-offset-4"
                   >
                     Inquire via WhatsApp →
                   </a>
                </div>
              </div>

              {/* Right: Detailed Portions (60%) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 pt-4">
                {service.portions.map((portion, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/5 rounded-lg flex items-center justify-center text-accent">
                        <span className="material-symbols-outlined text-lg">{portion.icon}</span>
                      </div>
                      <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider">{portion.title}</h4>
                    </div>
                    <p className="text-xs text-secondary font-body leading-relaxed">
                      {portion.expandedDetail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Footer Mantra */}
      <section className="pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center border-t border-outline/20 pt-16">
          <p className="text-lg md:text-2xl italic text-accent font-body">
            ।। ॐ नमो भगवते वासुदेवाय नम: ।।
          </p>
        </div>
      </section>
    </>
  );
}
