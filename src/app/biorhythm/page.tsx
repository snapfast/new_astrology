import { Metadata } from 'next';
import BiorhythmClientPage from './BiorhythmClientPage';

export const metadata: Metadata = {
  title: 'Biorhythm',
  description: 'Track your physical, emotional, and intellectual Biorhythm cycles based on your birth date.',
  keywords: [
    "Biorhythm Calculator", "Biorhythm system", "physical emotional intellectual cycles", "energy cycle tracker",
    "biorhythm chart online", "personal energy peaks", "Pandit Rahul Bali tools",
    "Panch Pakshi", "all 17 varga charts", "body biorhythms", "energy flow"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/biorhythm",
  },
  openGraph: {
    title: 'Biorhythm | Rahul Bali Astrology',
    description: 'Track your physical, emotional, and intellectual Biorhythm cycles based on your birth date.',
    url: "https://astro.rahulbali.in/biorhythm",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Biorhythm Calculator - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Biorhythm | Rahul Bali Astrology',
    description: 'Track your physical, emotional, and intellectual Biorhythm cycles based on your birth date.',
    images: ["/og-image.png"],
  },
};

export default function BiorhythmPage() {
  return <BiorhythmClientPage />;
}
