import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LatestInsights from '@/components/LatestInsights';

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32">
        <div className="max-w-4xl mx-auto px-8 mb-16 text-center">
          <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface">Celestial Insights</h1>
          <p className="text-lg font-body text-secondary leading-relaxed">
            Deep dives into Vedic astrology, planetary transits, and spiritual wisdom for a conscious life.
          </p>
        </div>
        <LatestInsights />
      </div>
      <Footer />
    </main>
  );
}
