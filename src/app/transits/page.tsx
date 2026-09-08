import { Metadata } from 'next';
import TransitsClientPage from './TransitsClientPage';

export const metadata: Metadata = {
  title: 'Planetary Transits (Gochar)',
  description: 'Track the movements (Gochara) of all nine Vedic planets across Rashi (Signs) and Nakshatras (Asterisms).',
  keywords: [
    "Planetary Transits", "Gochar Tracker", "Vedic Astrology Transits", "planetary shifts",
    "Gochara online", "planet movements", "Rahul Bali transits",
    "Rashi transit details", "Nakshatra transit", "all 9 planets gochar"
  ],
  alternates: {
    canonical: "https://baliastrology.com/transits",
  },
  openGraph: {
    title: 'Planetary Transits (Gochar) | Bali Astrology',
    description: 'Track the movements of all nine Vedic planets across signs and nakshatras.',
    url: "https://baliastrology.com/transits",
    siteName: "Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planetary Transits - Bali Astrology",
      },
    ],
    locale: "en_US",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Planetary Transits (Gochar) | Bali Astrology',
    description: 'Track the movements of all nine Vedic planets across signs and nakshatras.',
    images: ["/og-image.png"],
  },
};

export default function TransitsPage() {
  return <TransitsClientPage />;
}
