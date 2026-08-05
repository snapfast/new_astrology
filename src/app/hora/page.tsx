import { Metadata } from 'next';
import HoraClientPage from './HoraClientPage';

export const metadata: Metadata = {
  title: "Planetary Hours (Hora)",
  description: "Calculate real-time Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord and select auspicious timings (Muhurtas) for your tasks.",
  keywords: [
    "Planetary Hours", "Hora Calculator", "Vedic Hora", "Hora Lord Today", "Brihat Parasara Hora Shastra",
    "Auspicious Hours", "Vedic Muhurta", "Planet Hours", "Astro Hours", "Auspicious Timings"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/hora",
  },
  openGraph: {
    title: "Planetary Hours (Hora) | Rahul Bali Astrology",
    description: "Calculate real-time Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord and select auspicious timings (Muhurtas) for your tasks.",
    url: "https://astro.rahulbali.in/hora",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Planetary Hours (Hora) - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planetary Hours (Hora) | Rahul Bali Astrology",
    description: "Calculate real-time Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord and select auspicious timings (Muhurtas) for your tasks.",
    images: ["/og-image.png"],
  },
};

export default function HoraPage() {
  return <HoraClientPage />;
}
