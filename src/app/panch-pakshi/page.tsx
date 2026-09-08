import React from 'react';
import { Metadata } from 'next';
import PanchPakshiClientPage from './PanchPakshiClientPage';

export const metadata: Metadata = {
  title: 'Panch Pakshi',
  description: 'Calculate your Panch Pakshi bird based on your birth Nakshatra. Understand its five astrological activity states for precise daily guidance and timing.',
  keywords: [
    "Panch Pakshi", "Five Birds Astrology", "Nakshatra Bird", "Vedic Astrology Calculator",
    "Ruling Bird", "Janam Nakshatra", "Panch Pakshi Activity Table", "Rahul Bali", "Aprakshya Planets",
    "all 17 varga charts", "Biorhythm tracker", "Vedic system of five birds", "Pancha Pakshi"
  ],
  alternates: {
    canonical: "https://baliastrology.com/panch-pakshi",
  },
  openGraph: {
    title: 'Panch Pakshi | Bali Astrology',
    description: 'Calculate your Panch Pakshi bird based on your birth Nakshatra. Understand its five astrological activity states for precise daily guidance and timing.',
    url: 'https://baliastrology.com/panch-pakshi',
    siteName: "Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Panch Pakshi Calculator - Bali Astrology",
      },
    ],
    locale: "en_US",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Panch Pakshi | Bali Astrology',
    description: 'Calculate your Panch Pakshi bird based on your birth Nakshatra. Understand its five astrological activity states for precise daily guidance and timing.',
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <PanchPakshiClientPage />;
}
