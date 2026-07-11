import Navbar from '@/components/Navbar';
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import ChartGeneration from '@/components/ChartGeneration';
import ExpertConsultations from '@/components/ExpertConsultations';
import Testimonials from '@/components/Testimonials';
import DailyPanchang from '@/components/DailyPanchang';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { REVIEWS } from '@/lib/reviews';

export const metadata: Metadata = {
  title: "Rahul Bali Astrology | Expert Vedic Astrologer in Gurugram & Online",
  description: "Consult with Pandit Rahul Bali Ji, a leading Vedic Astrologer in Gurugram (Gurgaon). Get accurate Janam Kundli readings, career guidance, relationship advice, and spiritual remedies.",
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
      "streetAddress": "Gurugram",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "postalCode": "122001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.4595,
      "longitude": 77.0266
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
    "description": "Expert Vedic Astrology guidance by Pandit Rahul Bali Ji in Gurugram and Gurgaon. Specialist in Janam Kundli, career, and relationship consultations.",
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
      <Hero />
      <DailyPanchang className="-mt-20 z-20" />
      <ChartGeneration className="mt-8" />
      <Testimonials />
      <ExpertConsultations />
      <Footer />
    </main>
  );
}
