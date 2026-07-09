import React from 'react';
import PanchPakshiClientPage from './PanchPakshiClientPage';

export const metadata = {
  title: 'Panch Pakshi | Rahul Bali Astrology',
  description: 'Panch Pakshi astrological calculations and insights.',
  alternates: {
    canonical: "https://astro.rahulbali.in/panch-pakshi",
  },
};

export default function Page() {
  return <PanchPakshiClientPage />;
}
