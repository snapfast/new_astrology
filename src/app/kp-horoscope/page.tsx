import { Metadata } from 'next';
import KPHoroscopeClientPage from './KPHoroscopeClientPage';

export const metadata: Metadata = {
  title: "KP Prashna Kundli",
  description: "View your KP Prashna Kundli based on Horary number.",
  keywords: [
    "KP Prashna Kundli", "KP Horary", "Krishnamurti Paddhati", "Astrology",
    "Prashna Chart", "Rahul Bali astrology"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/kp-horoscope",
  }
};

export default function KPHoroscopePage() {
  return <KPHoroscopeClientPage />;
}