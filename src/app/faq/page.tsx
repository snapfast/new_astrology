import React from 'react';
import { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: "FAQ",
  description: "Explore frequently asked questions about Vedic Astrology, Divisional Varga charts, Panch Pakshi, and Biorhythm.",
  keywords: [
    "Vedic Astrology FAQ", "all 17 varga charts", "divisional charts in hindi",
    "Panch Pakshi system", "Panch Pakshi calculator", "Biorhythm system", "Biorhythm cycles",
    "D9 Navamsha usage", "D10 Dashamsha career", "Astrology questions", "Rahul Bali FAQ"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/faq",
  },
  openGraph: {
    title: "FAQ | Rahul Bali Astrology",
    description: "Explore frequently asked questions about Vedic Astrology, Divisional Varga charts, Panch Pakshi, and Biorhythm.",
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
    title: "FAQ | Rahul Bali Astrology",
    description: "Explore frequently asked questions about Vedic Astrology, Divisional Varga charts, Panch Pakshi, and Biorhythm.",
    images: ["/og-image.png"],
  },
};

export default function FAQPage() {
  return <FAQContent />;
}
