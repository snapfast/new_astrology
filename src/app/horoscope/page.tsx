import { Metadata } from 'next';
import HoroscopeClientPage from './HoroscopeClientPage';

export const metadata: Metadata = {
  title: "Free Vedic Horoscope & Birth Chart | Accurate Online Kundli",
  description: "Generate your free Vedic astrology birth chart (Kundli) with Pandit Rahul Bali Ji. Get detailed planetary positions, divisional charts (D1, D3, D9), and Vimshottari Dasha.",
  alternates: {
    canonical: "https://astro.rahulbali.in/horoscope",
  },
};

export default function HoroscopePage() {
  return <HoroscopeClientPage />;
}
