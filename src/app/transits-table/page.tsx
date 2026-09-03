import { Metadata } from 'next';
import TransitsTableClientPage from './TransitsTableClientPage';

export const metadata: Metadata = {
  title: 'Current Planetary Transits Table',
  description: 'View the current astrological positions and status of all Vedic planets in a table view.',
  keywords: [
    "Planetary Transits Table", "Current Planetary Positions", "Gochar Table", "Vedic Astrology Transits",
    "live planets", "current rashi", "nakshatra position"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/transits-table",
  },
  openGraph: {
    title: 'Current Planetary Transits Table | Rahul Bali Astrology',
    description: 'View the current astrological positions and status of all Vedic planets in a table view.',
    url: "https://astro.rahulbali.in/transits-table",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planetary Transits Table - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Current Planetary Transits Table | Rahul Bali Astrology',
    description: 'View the current astrological positions and status of all Vedic planets in a table view.',
    images: ["/og-image.png"],
  },
};

export default function TransitsTablePage() {
  return <TransitsTableClientPage />;
}
