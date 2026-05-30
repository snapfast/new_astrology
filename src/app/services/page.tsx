import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ServicesContent from '@/components/ServicesContent';

export const metadata: Metadata = {
  title: "Vedic Astrology Services | Personal Consultations & Readings",
  description: "Comprehensive Vedic Astrology services including Janam Kundli analysis, career guidance, marriage matching, Vastu Shastra, and remedial measures by Pandit Rahul Bali Ji.",
  alternates: {
    canonical: "https://astro.rahulbali.in/services",
  },
};

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "Soul Compatibility",
        "description": "Deep dive into Synastry and Kundli matching to find harmonious soul connections."
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "Vedic Wisdom",
        "description": "Personalized sessions to master your charts and understand karmic patterns."
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "Remedial Measures",
        "description": "Curated mantras, gemstones, and rituals to balance planetary influences."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-surface">
      <JsonLd data={servicesSchema} />
      <Navbar />
      <ServicesContent />
      <Footer />
    </main>
  );
}
