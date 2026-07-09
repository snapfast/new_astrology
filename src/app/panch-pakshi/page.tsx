import React from 'react';
import { Metadata } from 'next';
import PanchPakshiClientPage from './PanchPakshiClientPage';

export const metadata: Metadata = {
  title: 'Panch Pakshi Calculator | Nakshatra Five Birds - Rahul Bali Astrology',
  description: 'Calculate your Panch Pakshi bird based on your birth Nakshatra and Paksha. Understand the five astrological activity states (Ruling, Eating, Walking, Sleeping, Dying) of your personal bird for precise daily guidance.',
  keywords: [
    "Panch Pakshi", "Five Birds Astrology", "Nakshatra Bird", "Vedic Astrology Calculator",
    "Ruling Bird", "Janam Nakshatra", "Panch Pakshi Activity Table", "Pandit Rahul Bali", "Aprakshya Planets"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/panch-pakshi",
  },
  openGraph: {
    title: 'Panch Pakshi Calculator | Nakshatra Five Birds - Rahul Bali Astrology',
    description: 'Calculate your Panch Pakshi bird based on your birth Nakshatra and Paksha. Learn the five astrological activity states for precise daily guidance.',
    url: 'https://astro.rahulbali.in/panch-pakshi',
    type: 'website',
  }
};

export default function Page() {
  return <PanchPakshiClientPage />;
}
