import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
  title: "About Pandit Rahul Bali Ji | Vedic Astrologer in Gurugram",
  description: "Learn about Pandit Rahul Bali Ji, a renowned expert in Vedic Astrology based in Gurugram, providing spiritual insights and practical life remedies rooted in Jyotish Shastra.",
  alternates: {
    canonical: "https://astro.rahulbali.in/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-24 pb-16 max-w-5xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-accent mb-4 block font-label">The Practitioner</span>
          <h1 className="text-5xl md:text-6xl font-normal mb-8 font-headline text-on-surface">Pandit Rahul Bali Ji</h1>
        </div>
        <AboutClient />
      </div>
      <Footer />
    </main>
  );
}
