import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExpertConsultations from '@/components/ExpertConsultations';

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema)
            .replace(/</g, "\\u003c")
            .replace(/>/g, "\\u003e")
            .replace(/\u2028/g, "\\u2028")
            .replace(/\u2029/g, "\\u2029"),
        }}
      />
      <Navbar />
      <div className="pt-32">
        <div className="max-w-4xl mx-auto px-8 mb-16 text-center">
          <h1 className="text-5xl font-normal mb-8 font-headline text-on-surface">Vedic Astrology Services</h1>
          <p className="text-lg font-body text-secondary leading-relaxed mb-6">
            Explore professional <strong>astrology consultations</strong> and spiritual services by Pandit Rahul Bali Ji. From detailed <strong>birth chart readings</strong> to <strong>Vastu Shastra</strong> audits, discover how Vedic wisdom can illuminate your path.
          </p>
          <p className="text-sm text-secondary/70 font-body max-w-2xl mx-auto">
            Our services are designed to provide clarity on career, relationships, health, and spiritual growth using the ancient principles of <strong>Jyotish Shastra</strong>.
          </p>
        </div>
        <ExpertConsultations />
      </div>
      <Footer />
    </main>
  );
}
