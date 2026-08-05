import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ServicesContent from '@/components/ServicesContent';
import { SPECIALIZED_SERVICES } from '@/lib/consultations';
import ExploreTools from '@/components/ExploreTools';

export const metadata: Metadata = {
  title: "Services",
  description: "Expert Vedic Astrology services in Gurugram (Gurgaon) covering career, finance, relationships, health, and spiritual guidance through traditional Jyotish principles.",
  keywords: [
    "Vedic Astrology Services", "Kundli Reading Gurugram", "Career Astrology Gurgaon",
    "Relationship Astrology remedies", "Medical Astrology consultation", "business astrology support"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/services",
  },
  openGraph: {
    title: "Services | Rahul Bali Astrology",
    description: "Expert Vedic Astrology services in Gurugram (Gurgaon) covering career, finance, relationships, health, and spiritual guidance through traditional Jyotish principles.",
    url: "https://astro.rahulbali.in/services",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vedic Astrology Services - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Rahul Bali Astrology",
    description: "Expert Vedic Astrology services in Gurugram (Gurgaon) covering career, finance, relationships, health, and spiritual guidance.",
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": SPECIALIZED_SERVICES.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.title.en,
      "description": service.description.en
    }))
  };

  return (
    <main className="min-h-screen bg-surface">
      <JsonLd data={servicesSchema} />
      <Navbar />
      <ServicesContent />
      <ExploreTools currentPath="/services" className="mb-12" />
      <Footer />
    </main>
  );
}
