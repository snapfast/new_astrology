'use client';

import React, { Suspense, useState, useMemo, memo } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KundliChart from '@/components/KundliChart';
import BookConsultationModal from '@/components/BookConsultationModal';
import { generateAstrologyData } from '@/lib/astrology';
import { sendGAEvent } from '@next/third-parties/google';

const HoroscopeContent = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Guest';
  const dob = searchParams.get('dob') || '';
  const tob = searchParams.get('tob') || '';
  const pob = searchParams.get('pob') || '';
  const lat = searchParams.get('lat') || '';
  const lon = searchParams.get('lon') || '';

  const chartData = useMemo(() => generateAstrologyData(dob, tob, lat, lon), [dob, tob, lat, lon]);

  const handleBookNow = () => {
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_page_book_now' });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & User Details */}
      <div className="mb-16 text-center">
        <div className="flex justify-center mb-6">
          <span className="bg-surface-container-high border border-outline/30 px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-secondary font-label flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            Representative Digital Map
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-normal mb-8 font-headline text-on-surface">Your Birth Chart</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <DetailCard label="Name" value={name} />
          <DetailCard label="Date" value={dob} />
          <DetailCard label="Time" value={tob} />
          <DetailCard label="Place" value={pob} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Kundli Chart */}
        <div className="space-y-6">
          <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-4">Lagna Chart (D1)</h2>
          <KundliChart data={chartData} />
          <p className="text-xs text-secondary text-center italic mt-4">Traditional North Indian Style Representation</p>
        </div>

        {/* Planet Table */}
        <div className="space-y-8">
          <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-4">Planetary Positions</h2>
          <div className="overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline">
                  <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest font-label">Planet</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest font-label">Rasi</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest font-label">Degree</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest font-label">Nakshatra</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest font-label text-center">Pada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline">
                {chartData.planets.map((p, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-sm font-medium text-on-surface">{p.name}</td>
                    <td className="px-6 py-4 text-sm text-secondary">{p.rasi}</td>
                    <td className="px-6 py-4 text-sm text-secondary font-mono">{p.degree}</td>
                    <td className="px-6 py-4 text-sm text-secondary">{p.nakshatra}</td>
                    <td className="px-6 py-4 text-sm text-on-surface text-center font-bold">{p.pada}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verification CTA Section */}
          <div className="bg-surface-container-low rounded-[2.5rem] border border-outline/50 p-8 md:p-12 text-center mt-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-normal mb-4 font-headline text-on-surface">Seeking Verified Information?</h3>
              <p className="text-sm text-secondary font-body mb-8 max-w-xl mx-auto leading-relaxed">
                This digital chart provides a representative visualization based on standard algorithms. For high-precision verified information—including exact planetary degrees, specific Ayanamsa, and personalized karmic insights—a manual expert review is essential.
              </p>
              <button
                onClick={handleBookNow}
                className="inline-block bg-primary text-white px-10 py-4 rounded-full font-medium text-[10px] md:text-xs tracking-[0.1em] uppercase font-label"
              >
                Book Verified Personal Consultation
              </button>
            </div>
            {/* Subtle Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </div>
      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

const DetailCard = memo(({ label, value }: { label: string; value: string }) => (
  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline/50">
    <p className="text-[10px] font-medium text-secondary uppercase tracking-widest mb-1 font-label">{label}</p>
    <p className="text-sm font-medium text-on-surface truncate">{value}</p>
  </div>
));
DetailCard.displayName = 'DetailCard';

export default function HoroscopePage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center">Loading your destiny...</div>}>
        <HoroscopeContent />
      </Suspense>
      <Footer />
    </main>
  );
}
