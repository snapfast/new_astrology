import { Metadata } from 'next';
import PanchangClientPage from './PanchangClientPage';

export const metadata: Metadata = {
  title: "Daily Panchang",
  description: "Get the most accurate Daily Panchang for today. Detailed Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal. Align your day with Vedic wisdom.",
  keywords: [
    "Daily Panchang", "Today Panchang", "Vedic Panchang", "Tithi Today", "Nakshatra Today",
    "Rahu Kaal Today", "Abhijit Muhurta", "Vedic Calendar", "Hindu Calendar", "Auspicious Timings"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/panchang",
  },
  openGraph: {
    title: "Daily Panchang | Rahul Bali Astrology",
    description: "Get the most accurate Daily Panchang for today. Detailed Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal.",
    url: "https://astro.rahulbali.in/panchang",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daily Panchang - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Panchang | Rahul Bali Astrology",
    description: "Get the most accurate Daily Panchang for today. Detailed Vedic timing for Tithi, Nakshatra, Yoga, Karana, and Rahu Kaal.",
    images: ["/og-image.png"],
  },
};

export default function PanchangPage() {
  return <PanchangClientPage />;
}
