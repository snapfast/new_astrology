import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutClient from '@/components/AboutClient';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: "About Pandit Rahul Bali Ji | Vedic Astrologer in Gurugram & Gurgaon",
  description: "Learn about Pandit Rahul Bali Ji, a renowned expert in Vedic Astrology based in Gurugram (Gurgaon), providing spiritual insights and practical life remedies rooted in Jyotish Shastra.",
  alternates: {
    canonical: "https://astro.rahulbali.in/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <PageHeader
        title="Pandit Rahul Bali Ji"
        subtitle="The Practitioner"
      />
      <div className="py-16 max-w-5xl mx-auto px-8">
        <AboutClient />
      </div>
      <Footer />
    </main>
  );
}
