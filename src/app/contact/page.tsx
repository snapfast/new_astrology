import { Metadata } from 'next';
import ContactContent from './ContactContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Pandit Rahul Bali Ji for Vedic astrology consultations online. Connect for accurate Kundli readings and remedies.",
  keywords: [
    "Contact Rahul Bali", "Astrologer phone number", "book astrology consultation",
    "Rahul Bali address", "astrology email support"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/contact",
  },
  openGraph: {
    title: "Contact | Rahul Bali Astrology",
    description: "Get in touch with Pandit Rahul Bali Ji for Vedic astrology consultations online.",
    url: "https://astro.rahulbali.in/contact",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Pandit Rahul Bali - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Rahul Bali Astrology",
    description: "Get in touch with Pandit Rahul Bali Ji for Vedic astrology consultations online.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "ProfessionalService",
      "name": "Rahul Bali Astrology",
      "image": "https://astro.rahulbali.in/og-image.png",
      "url": "https://astro.rahulbali.in",
      "email": "rahulbaliastrology@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "India",
        "addressLocality": "India",
        "addressRegion": "Haryana",
        "postalCode": "122001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.4595,
        "longitude": 77.0266
      }
    }
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <ContactContent />
    </>
  );
}
