'use client';

import { Suspense, useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KundliChart from '@/components/KundliChart';
import BookConsultationModal from '@/components/BookConsultationModal';
import { generateAstrologyData } from '@/lib/astrology';
import { sendGAEvent } from '@next/third-parties/google';
import { downloadHoroscopePDF } from '@/lib/pdf-utils';

const HoroscopeContent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Guest';
  const dob = searchParams.get('dob') || '';
  const formattedDob = useMemo(() => {
    if (!dob) return '';
    const [year, month, day] = dob.split('-');
    return `${day}-${month}-${year}`;
  }, [dob]);
  const tob = searchParams.get('tob') || '';
  const pob = searchParams.get('pob') || '';
  const lat = searchParams.get('lat') || '';
  const lon = searchParams.get('lon') || '';

  const chartData = useMemo(() => generateAstrologyData(dob, tob, lat, lon), [dob, tob, lat, lon]);

  const handleBookNow = () => {
    sendGAEvent({ event: 'action_click', action_name: 'horoscope_page_book_now' });
    setIsBookingModalOpen(true);
  };

  const handleDownloadPDF = async () => {
    if (contentRef.current) {
      sendGAEvent({ event: 'action_click', action_name: 'horoscope_page_download_pdf' });
      const safeName = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      await downloadHoroscopePDF(contentRef.current, `horoscope_${safeName}`);
    }
  };

  return (
    <div ref={contentRef} data-pdf-content="true" className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* PDF-only Branding Header */}
      <div className="hidden pdf-only flex-col items-center mb-12 w-full text-center">
        <div className="text-3xl font-normal tracking-tight font-headline flex items-center justify-center gap-1">
          <span className="text-on-surface whitespace-nowrap">Rahul Bali</span>
          <span className="text-accent italic whitespace-nowrap">Astrology</span>
        </div>
        <p className="text-[10px] text-secondary tracking-widest uppercase font-label mt-2">rahulbaliastrology@gmail.com</p>
      </div>

      {/* Header & User Details */}
      <div className="mb-16 text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <span className="bg-surface-container-high border border-outline/30 px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-secondary font-label flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
            Representative Digital Map
          </span>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline/30 text-on-surface font-medium text-[7px] md:text-[9px] tracking-[0.1em] uppercase hover:bg-surface-container-low transition-colors print:hidden pdf-hide"
          >
            <span className="material-symbols-outlined text-[12px] md:text-sm">download</span>
            Download PDF
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-normal mb-8 font-headline text-on-surface">Your Birth Chart</h1>
        <div className="max-w-4xl mx-auto rounded-3xl border border-outline overflow-hidden text-left">
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="space-y-1">
              <p className="text-[10px] font-medium text-secondary uppercase tracking-widest font-label">Name</p>
              <p className="text-sm font-medium text-secondary leading-relaxed">{name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-medium text-secondary uppercase tracking-widest font-label">Date</p>
              <p className="text-sm font-medium text-secondary leading-relaxed">{formattedDob}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-medium text-secondary uppercase tracking-widest font-label">Time</p>
              <p className="text-sm font-medium text-secondary leading-relaxed">{tob}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-medium text-secondary uppercase tracking-widest font-label">Place</p>
              <p className="text-sm font-medium text-secondary leading-relaxed">{pob}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-16 mb-16">
        {/* Row 1: D1 & D9 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-4">Lagna Chart (D1)</h2>
            <KundliChart data={chartData.d1} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-4">Navamsha Chart (D9)</h2>
            <KundliChart data={chartData.d9} />
          </div>
        </div>

        {/* Row 2: D3 & D10 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-4">Drekkana Chart (D3)</h2>
            <KundliChart data={chartData.d3} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-4">Dashamsha Chart (D10)</h2>
            <KundliChart data={chartData.d10} />
          </div>
        </div>
        <p className="text-xs text-secondary text-center italic pt-4">Traditional North Indian Style Representation of Divisional Charts</p>
      </div>

      {/* Planet Table - Full Width */}
      <div className="space-y-8 mb-24">
        <h2 className="text-2xl font-normal font-headline text-on-surface border-b border-outline pb-4">Planetary Positions</h2>
        <div className="overflow-x-auto bg-white rounded-3xl border border-outline shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline">
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Planet</th>
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label text-center">House</th>
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Rasi</th>
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Rasi Lord</th>
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Degree</th>
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Nakshatra</th>
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label">Nak Lord</th>
                <th className="px-4 py-4 text-xs font-bold text-on-surface uppercase tracking-widest font-label text-center">Pada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline">
              {chartData.planets.map((p, idx) => (
                <tr key={idx} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-4 py-4 text-sm font-medium text-on-surface">{p.name}</td>
                  <td className="px-4 py-4 text-sm text-on-surface text-center">{p.house}</td>
                  <td className="px-4 py-4 text-sm text-on-surface">{p.rasi}</td>
                  <td className="px-4 py-4 text-sm text-on-surface">{p.rasiLord}</td>
                  <td className="px-4 py-4 text-sm text-on-surface font-mono whitespace-nowrap">{p.degree}</td>
                  <td className="px-4 py-4 text-sm text-on-surface">{p.nakshatra}</td>
                  <td className="px-4 py-4 text-sm text-on-surface">{p.nakshatraLord}</td>
                  <td className="px-4 py-4 text-sm text-on-surface text-center font-bold">{p.pada}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification CTA Section */}
      <div className="bg-surface-container-low rounded-[2.5rem] md:rounded-[4rem] border border-outline/50 p-8 md:p-16 text-center relative overflow-hidden max-w-5xl mx-auto print:hidden pdf-hide">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-normal mb-6 font-headline text-on-surface">Seeking Verified Information?</h3>
          <p className="text-sm md:text-base text-secondary font-body mb-10 max-w-2xl mx-auto leading-relaxed">
            This digital chart provides a representative visualization based on standard algorithms. For high-precision verified information—including exact planetary degrees, specific Ayanamsa, and personalized karmic insights—a manual expert review is essential.
          </p>
          <button
            onClick={handleBookNow}
            className="inline-block bg-primary text-white px-12 py-5 rounded-full font-medium text-xs md:text-sm tracking-[0.1em] uppercase font-label"
          >
            Book Verified Personal Consultation
          </button>
        </div>
        {/* Subtle Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-0"></div>
      </div>
      <BookConsultationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* PDF-only Branding Footer */}
      <div className="hidden pdf-only flex-col items-center mt-20 pt-10 border-t border-outline/30 w-full text-center">
        <p className="text-[10px] tracking-widest uppercase font-medium text-secondary/60 font-label">
          Rahul Bali Astrology Services © 2025. All rights reserved.
        </p>
        <p className="text-[9px] text-secondary/40 mt-2 font-label tracking-wider uppercase">Professional Jyotish Shastra Consultations</p>
        <p className="text-[9px] text-accent mt-4 font-label tracking-widest uppercase font-bold">Contact: rahulbaliastrology@gmail.com</p>
      </div>
    </div>
  );
};


export default function HoroscopeClientPage() {
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
