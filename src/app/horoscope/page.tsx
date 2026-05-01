import { Metadata } from 'next';
import HoroscopeClientPage from './HoroscopeClientPage';

export const metadata: Metadata = {
  title: "Free Vedic Horoscope & Birth Chart",
  description: "Generate your free Vedic astrology birth chart (Kundli) with Pandit Rahul Bali Ji. Get detailed planetary positions and divisional charts (D1, D3, D9).",
};

export default function HoroscopePage() {
  return <HoroscopeClientPage />;
}
