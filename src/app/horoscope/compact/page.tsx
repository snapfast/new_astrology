import { Metadata } from 'next';
import CompactHoroscopeClientPage from './CompactHoroscopeClientPage';

export const metadata: Metadata = {
  title: "Compact Kundli Dashboard | High-Density Birth Chart View",
  description: "A professional, high-density dashboard for your Vedic birth chart (Kundli). All divisional charts, planetary positions, and dasha details on a single screen.",
  alternates: {
    canonical: "https://astro.rahulbali.in/horoscope/compact",
  },
};

export default function CompactHoroscopePage() {
  return <CompactHoroscopeClientPage />;
}
