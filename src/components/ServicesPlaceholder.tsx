import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServicesPlaceholder({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-8 text-center">
        <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface">{title}</h1>
        <p className="text-secondary text-lg mb-12 font-body max-w-2xl mx-auto">
          Expert Jyotish guidance tailored to your soul&apos;s journey.
          Book an appointment for personalized analysis and practical remedies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-surface-container-high">
            <h3 className="text-2xl font-normal mb-4 font-headline">Standard Consultation</h3>
            <p className="text-secondary text-sm mb-6 font-body">General birth chart reading and life guidance.</p>
            <a
              href="https://calendly.com/rahulbaliastrology/kundli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold text-[10px] tracking-widest uppercase font-label"
            >
              Learn More
            </a>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-surface-container-high">
            <h3 className="text-2xl font-normal mb-4 font-headline">Specific Research</h3>
            <p className="text-secondary text-sm mb-6 font-body">Deep dive into specific life areas or planetary combinations.</p>
            <a
              href="https://calendly.com/rahulbaliastrology/kundli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold text-[10px] tracking-widest uppercase font-label"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
