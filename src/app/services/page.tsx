import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ServicesContent from '@/components/ServicesContent';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';

export const metadata: Metadata = {
  title: "Vedic Astrology Services in Gurugram & Gurgaon | Rahul Bali Astrology",
  description: "Expert Vedic Astrology services in Gurugram (Gurgaon) covering career, finance, relationships, health, and spiritual guidance through traditional Jyotish principles.",
  alternates: {
    canonical: "https://astro.rahulbali.in/services",
  },
};

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": SPECIALIZED_SERVICES.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title,
      "description": service.description
    }))
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
