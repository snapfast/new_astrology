import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExpertConsultations from '@/components/ExpertConsultations';

export const metadata: Metadata = {
  title: "Vedic Astrology Services",
  description: "Explore spiritual and astrological services by Pandit Rahul Bali Ji, including birth chart readings, personal consultations, and life guidance.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-32">
        <div className="max-w-4xl mx-auto px-8 mb-16 text-center">
          <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface">Astrology Services</h1>
          <p className="text-lg font-body text-secondary leading-relaxed">
            Pandit Rahul Bali Ji offers a range of spiritual and astrological services to help you navigate life&apos;s challenges and align with your true purpose.
          </p>
        </div>
        <ExpertConsultations />
      </div>
      <Footer />
    </main>
  );
}
