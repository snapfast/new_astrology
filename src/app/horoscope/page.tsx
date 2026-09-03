import { Metadata } from 'next';
import HoroscopeClientPage from './HoroscopeClientPage';

export const metadata: Metadata = {
  title: "Vedic Horoscope",
  description: "Generate your free Vedic astrology birth chart (Kundli). Get planetary positions, divisional charts, and Vimshottari Dasha.",
  keywords: [
    "Free Vedic Horoscope", "Online Birth Chart", "Accurate Kundli Online", "Janam Kundali",
    "divisional charts", "Vimshottari Dasha", "Pandit Rahul Bali astrology"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/horoscope",
  },
  openGraph: {
    title: "Vedic Horoscope | Rahul Bali Astrology",
    description: "Generate your free Vedic astrology birth chart (Kundli). Get planetary positions, divisional charts, and Vimshottari Dasha.",
    url: "https://astro.rahulbali.in/horoscope",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Vedic Horoscope & Birth Chart - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Horoscope | Rahul Bali Astrology",
    description: "Generate your free Vedic astrology birth chart (Kundli).",
    images: ["/og-image.png"],
  },
};

export default function HoroscopePage() {
  return <HoroscopeClientPage />;
}
