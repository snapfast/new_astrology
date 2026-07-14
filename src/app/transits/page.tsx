import { Metadata } from 'next';
import TransitsClientPage from './TransitsClientPage';

export const metadata: Metadata = {
  title: 'Planetary Transits (Gochar) Tracker | Pandit Rahul Bali',
  description: 'Track the past and future movements (Gochara) of all nine Vedic planets. Detailed transit details across Rashi (Signs) and Nakshatras (Asterisms).',
  keywords: [
    "Planetary Transits", "Gochar Tracker", "Vedic Astrology Transits", "planetary shifts",
    "Gochara online", "planet movements", "Pandit Rahul Bali transits",
    "Rashi transit details", "Nakshatra transit", "all 9 planets gochar"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/transits",
  },
  openGraph: {
    title: 'Planetary Transits (Gochar) Tracker | Pandit Rahul Bali',
    description: 'Track the past and future movements of all nine Vedic planets across signs and nakshatras.',
    url: "https://astro.rahulbali.in/transits",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planetary Transits - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Planetary Transits (Gochar) Tracker | Pandit Rahul Bali',
    description: 'Track the past and future movements of all nine Vedic planets across signs and nakshatras.',
    images: ["/og-image.png"],
  },
};

export default function TransitsPage() {
  return <TransitsClientPage />;
}
