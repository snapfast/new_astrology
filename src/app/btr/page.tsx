import { Metadata } from 'next';
import BtrClientPage from './BtrClientPage';
import JsonLd from '@/components/JsonLd';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Birth Time Rectification (BTR)",
  description: "Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.",
  keywords: [
    "bali", "astro", "astrology", "india", "haryana", "miracle", "dharma", "remedy", "happiness",
    "Birth Time Rectification", "BTR Tool", "Vedic Astrology BTR", "Rectify Birth Time",
    "Divisional Charts BTR", "Rahul Bali astrology"
  ],
  alternates: {
    canonical: "https://baliastrology.com/btr",
  },
  openGraph: {
    title: "Birth Time Rectification (BTR) | Rahul Bali Astrology",
    description: "Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.",
    url: "https://baliastrology.com/btr",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Birth Time Rectification (BTR) - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birth Time Rectification (BTR) | Rahul Bali Astrology",
    description: "Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.",
    images: ["/og-image.png"],
  },
};

export default function BtrPage() {
  const schema = generateWebPageSchema(
    "Birth Time Rectification (BTR)",
    "Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.",
    "https://baliastrology.com/btr"
  );

  return (
    <>
      <JsonLd data={schema} />
      <BtrClientPage />
    </>
  );
}
