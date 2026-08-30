import Navbar from '@/components/Navbar';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Hero from '@/components/Hero';
import ChartGeneration from '@/components/ChartGeneration';
import ExpertConsultations from '@/components/ExpertConsultations';
import Testimonials from '@/components/Testimonials';
import DailyPanchang from '@/components/DailyPanchang';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { REVIEWS } from '@/lib/reviews';

export const metadata: Metadata = {
  title: "Best Vedic Astrologer Online | Pandit Rahul Bali Astrology",
  description: "Consult Pandit Rahul Bali Ji, a trusted online Vedic Astrologer. Discover accurate Janam Kundli readings, all 17 Varga charts, Panchang, and spiritual guidance.",
  keywords: [
    "Rahul Bali Astrology", "Vedic Astrologer", "Astrologer", "Janam Kundli",
    "all 17 varga charts", "divisional charts in hindi", "D9 Navamsha", "D10 Dashamsha",
    "Panch Pakshi system", "Panch Oakshi calculator", "Biorhythm system", "Biothytm tracker"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in",
  },
};

export default function Home() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Rahul Bali Astrology",
    "image": "https://astro.rahulbali.in/og-image.png",
    "@id": "https://astro.rahulbali.in",
    "url": "https://astro.rahulbali.in",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "rahulbaliastrology@gmail.com"
    },
    "priceRange": "₹ - ₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Online",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://www.instagram.com/RahulBaliAstro",
      "https://www.youtube.com/@RahulBaliAstrology",
      "https://www.linkedin.com/in/rahulbaliastrology/",
      "https://www.threads.net/@rahulbaliastro"
    ],
    "description": "Pandit Rahul Bali Ji is a renowned online Vedic Astrologer providing precise Kundli readings, spiritual guidance, and relationship consultations.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": REVIEWS.length.toString()
    },
    "review": REVIEWS.map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "datePublished": r.date,
      "reviewBody": r.review,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    }))
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={businessSchema} />
      <Navbar />
      <article>
        <Hero />
        <section aria-label="Daily Panchang">
          <DailyPanchang className="-mt-20 z-20" />
        </section>
        <section aria-label="Horoscope Generation">
          <Suspense fallback={<div className="h-32" />}>
            <ChartGeneration className="mt-8" />
          </Suspense>
        </section>
        <section aria-label="Client Testimonials">
          <Testimonials />
        </section>
        <section aria-label="Expert Astrology Consultations">
          <ExpertConsultations />
        </section>
      </article>
      <Footer />
    </main>
  );
}
