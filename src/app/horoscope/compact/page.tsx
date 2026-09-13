import { Metadata } from 'next';
import CompactHoroscopeClientPage from './CompactHoroscopeClientPage';

export const metadata: Metadata = {
  title: "Compact Kundli Dashboard",
  robots: { index: false, follow: false },
  description: "A compact dashboard for your Vedic birth chart (Kundli). View charts, planetary positions, and dasha details.",
  keywords: [
    "bali", "astro", "astrology", "india", "haryana", "miracle", "dharma", "remedy", "happiness",
    "Compact Kundli Dashboard", "High-Density Birth Chart", "Vedic chart dashboard",
    "divisional charts view", "planetary positions single screen", "professional astrologer dashboard"
  ],
  alternates: {
    canonical: "https://baliastrology.com/horoscope/compact",
  },
  openGraph: {
    title: "Compact Kundli Dashboard | Rahul Bali Astrology",
    description: "A compact dashboard for your Vedic birth chart (Kundli). View charts, planetary positions, and dasha details.",
    url: "https://baliastrology.com/horoscope/compact",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Compact Kundli Dashboard - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compact Kundli Dashboard | Rahul Bali Astrology",
    description: "A professional, high-density dashboard for your Vedic birth chart (Kundli).",
    images: ["/og-image.png"],
  },
};

export default function CompactHoroscopePage() {
  return <CompactHoroscopeClientPage />;
}
