import { Metadata } from 'next';
import KPHoraryClientPage from './KPHoraryClientPage';

export const metadata: Metadata = {
  title: "KP Prashna Kundli",
  description: "Cast a KP Prashna chart online using a Horary number from 1 to 249.",
  keywords: [
    "bali", "astro", "astrology", "india", "haryana", "miracle", "dharma", "remedy", "happiness",
    "KP Prashna Kundli", "KP Horary", "Krishnamurti Paddhati", "Horary Astrology",
    "Prashna Chart", "Rahul Bali astrology"
  ],
  alternates: {
    canonical: "https://baliastrology.com/kp-horary",
  },
  openGraph: {
    title: "KP Prashna Kundli | Rahul Bali Astrology",
    description: "Cast a KP Prashna chart online using a Horary number from 1 to 249.",
    url: "https://baliastrology.com/kp-horary",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KP Prashna Kundli - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KP Prashna Kundli | Rahul Bali Astrology",
    description: "Cast a KP Prashna chart online using a Horary number from 1 to 249.",
    images: ["/og-image.png"],
  },
};

export default function KPHoraryPage() {
  return <KPHoraryClientPage />;
}