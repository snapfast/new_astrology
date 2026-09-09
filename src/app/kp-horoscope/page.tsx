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
    canonical: "https://baliastrology.com/kp-horoscope",
  },
  openGraph: {
    title: "KP Prashna Kundli | Rahul Bali Astrology",
    description: "View your KP Prashna Kundli based on Horary number.",
    url: "https://baliastrology.com/kp-horoscope",
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
    description: "View your KP Prashna Kundli based on Horary number.",
    images: ["/og-image.png"],
  },
};

export default function KPHoroscopePage() {
  return <KPHoroscopeClientPage />;
}