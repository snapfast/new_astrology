import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-8 text-center">
        <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface">Support Our Work</h1>
        <p className="text-secondary text-lg mb-12 font-body max-w-2xl mx-auto">
          If our guidance has helped you and you wish to support the research and spiritual services provided by Pandit Rahul Bali Ji, your donations are gratefully accepted.
        </p>
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-surface-container-high inline-block">
          <p className="text-on-surface font-bold text-xl mb-4 font-headline">।। जय हिंद ।।</p>
          <p className="text-secondary font-body mb-8">Scan or use details for contribution.</p>
          <div className="w-48 h-48 bg-surface-container mx-auto mb-8 flex items-center justify-center rounded-2xl border-2 border-dashed border-outline/20">
            <span className="text-[10px] text-outline tracking-widest uppercase font-label">QR Placeholder</span>
          </div>
          <button className="px-10 py-4 bg-primary text-white rounded-full font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-all font-label">
            Donate Now
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
