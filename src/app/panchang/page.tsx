import { Metadata } from 'next';
import PanchangClientPage from './PanchangClientPage';

export const metadata: Metadata = {
  title: "Daily Panchang | Today's Vedic Tithi, Nakshatra & Muhurta",
  description: "Get the most accurate Daily Panchang for today. Detailed Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal. Align your day with Vedic wisdom.",
  keywords: [
    "Daily Panchang", "Today Panchang", "Vedic Panchang", "Tithi Today", "Nakshatra Today",
    "Rahu Kaal Today", "Abhijit Muhurta", "Vedic Calendar", "Hindu Calendar", "Auspicious Timings"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/panchang",
  },
  openGraph: {
    title: "Daily Panchang | Today's Vedic Tithi, Nakshatra & Muhurta",
    description: "Accurate daily Vedic timings and astrological insights. Tithi, Nakshatra, Yoga, and Muhurtas for today.",
    url: "https://astro.rahulbali.in/panchang",
    type: "website",
  }
};

export default function PanchangPage() {
  return <PanchangClientPage />;
}
