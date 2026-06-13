'use client';

import React from 'react';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import PageHeader from './PageHeader';

export default function ServicesContent() {
  return (
    <>
      <PageHeader
        title="Vedic Astrology Services"
        subtitle="Spiritual Guidance"
        description="Professional consultations grounded in the ancient principles of Jyotish Shastra, providing clarity on your life's unique karmic path."
      />

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
                <p className="text-sm font-body text-on-surface leading-relaxed pl-4.5 border-l border-outline/30">
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
