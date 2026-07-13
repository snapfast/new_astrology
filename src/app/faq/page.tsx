import React from 'react';
import { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: "Vedic Astrology FAQ, Varga Charts & Systems | Rahul Bali Astrology",
  description: "Explore frequently asked questions about Vedic Astrology, all 17 Divisional (Varga) charts, Panch Pakshi (Panch Oakshi) system, and physical, emotional, and intellectual Biorhythm (Biothytm) cycles.",
  keywords: [
    "Vedic Astrology FAQ", "all 17 varga charts", "divisional charts in hindi",
    "Panch Pakshi system", "Panch Oakshi calculator", "Biorhythm system", "Biothytm cycles",
    "D9 Navamsha usage", "D10 Dashamsha career", "Astrology questions", "Rahul Bali FAQ"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/faq",
  },
  openGraph: {
    title: "Vedic Astrology FAQ, Varga Charts & Systems | Rahul Bali Astrology",
    description: "Explore frequently asked questions about Vedic Astrology, all 17 Divisional (Varga) charts, Panch Pakshi (Panch Oakshi) system, and physical, emotional, and intellectual Biorhythm (Biothytm) cycles.",
    url: "https://astro.rahulbali.in/faq",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vedic Astrology FAQ - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Astrology FAQ, Varga Charts & Systems | Rahul Bali Astrology",
    description: "Explore frequently asked questions about Vedic Astrology, all 17 Divisional (Varga) charts, Panch Pakshi (Panch Oakshi) system, and physical, emotional, and intellectual Biorhythm (Biothytm) cycles.",
    images: ["/og-image.png"],
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
