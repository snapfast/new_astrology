import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutClient from '@/components/AboutClient';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';
import ExploreTools from '@/components/ExploreTools';

export const metadata: Metadata = {
  title: "About Pandit Rahul Bali Ji | Vedic Astrologer in Gurugram & Gurgaon",
  description: "Learn about Pandit Rahul Bali Ji, a renowned expert in Vedic Astrology based in Gurugram (Gurgaon), providing spiritual insights and practical life remedies rooted in Jyotish Shastra.",
  keywords: [
    "About Rahul Bali", "Vedic Astrologer Gurugram", "Vedic Astrologer Gurgaon",
    "Jyotish Shastra practitioner", "astrology life remedies", "Rahul Bali Astrology bio"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/about",
  },
  openGraph: {
    title: "About Pandit Rahul Bali Ji | Vedic Astrologer in Gurugram & Gurgaon",
    description: "Learn about Pandit Rahul Bali Ji, a renowned expert in Vedic Astrology based in Gurugram (Gurgaon), providing spiritual insights and practical life remedies rooted in Jyotish Shastra.",
    url: "https://astro.rahulbali.in/about",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Pandit Rahul Bali Ji - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pandit Rahul Bali Ji | Vedic Astrologer in Gurugram & Gurgaon",
    description: "Learn about Pandit Rahul Bali Ji, a renowned expert in Vedic Astrology based in Gurugram (Gurgaon), providing spiritual insights and practical life remedies.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": "Pandit Rahul Bali",
      "url": "https://astro.rahulbali.in/about",
      "image": "https://astro.rahulbali.in/og-image.png",
      "sameAs": [
        "https://www.instagram.com/RahulBaliAstro",
        "https://www.youtube.com/@RahulBaliAstrology",
        "https://www.linkedin.com/in/rahulbaliastrology/",
        "https://www.threads.net/@rahulbaliastro"
      ],
      "jobTitle": "Vedic Astrologer",
      "worksFor": {
        "@type": "Organization",
        "name": "Rahul Bali Astrology"
      },
      "description": "Pandit Rahul Bali Ji is a renowned expert in Vedic Astrology based in Gurugram, India, providing personalized horoscopes and spiritual consultations."
    }
  };

  return (
    <main className="min-h-screen bg-surface">
      <JsonLd data={aboutSchema} />
      <Navbar />
      <PageHeader
        title="Pandit Rahul Bali Ji"
        subtitle="The Practitioner"
      />
      <div className="py-16 max-w-5xl mx-auto px-8">
        <AboutClient />
      </div>

      <ExploreTools currentPath="/about" className="mb-12" />

      <Footer />
    </main>
  );
}
