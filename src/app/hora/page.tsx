import { Metadata } from 'next';
import HoraClientPage from './HoraClientPage';
import JsonLd from '@/components/JsonLd';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Planetary Hours (Hora)",
  description: "Calculate Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord.",
  keywords: [
    "bali", "astro", "astrology", "india", "haryana", "miracle", "dharma", "remedy", "happiness",
    "Planetary Hours", "Hora Calculator", "Vedic Hora", "Hora Lord Today", "Brihat Parasara Hora Shastra",
    "Auspicious Hours", "Vedic Muhurta", "Planet Hours", "Astro Hours", "Auspicious Timings"
  ],
  alternates: {
    canonical: "https://baliastrology.com/hora",
  },
  openGraph: {
    title: "Planetary Hours (Hora) | Rahul Bali Astrology",
    description: "Calculate Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord.",
    url: "https://baliastrology.com/hora",
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
    description: "Calculate Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord.",
    images: ["/og-image.png"],
  },
};

export default function HoraPage() {
  const schema = generateWebPageSchema(
    "Planetary Hours (Hora)",
    "Calculate Vedic planetary hours (Hora) based on Brihat Parasara Hora Shastra. Find the active Hora lord.",
    "https://baliastrology.com/hora"
  );

  return (
    <>
      <JsonLd data={schema} />
      <HoraClientPage />
    </>
  );
}
