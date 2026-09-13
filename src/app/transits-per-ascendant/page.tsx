import { Metadata } from 'next';
import TransitsPerAscendantClientPage from './TransitsPerAscendantClientPage';
import JsonLd from '@/components/JsonLd';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Transits per Ascendant',
  description: 'View daily transit Kundli charts rotated for each of the 12 Ascendants (Lagnas) calculated when the Ascendant reaches 15 degrees.',
  keywords: [
    "bali", "astro", "astrology", "india", "haryana", "miracle", "dharma", "remedy", "happiness",
    "Transits per Ascendant", "Gochar per Lagna", "Rotated Transit Kundli", "12 Ascendants Gochar",
    "Lagna 15 degrees transits", "Vedic Astrology Transits"
  ],
  alternates: {
    canonical: "https://baliastrology.com/transits-per-ascendant",
  },
  openGraph: {
    title: 'Transits per Ascendant | Rahul Bali Astrology',
    description: 'View daily transit Kundli charts rotated for each of the 12 Ascendants (Lagnas) calculated when the Ascendant reaches 15 degrees.',
    url: "https://baliastrology.com/transits-per-ascendant",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Transits per Ascendant - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Transits per Ascendant | Rahul Bali Astrology',
    description: 'View daily transit Kundli charts rotated for each of the 12 Ascendants (Lagnas) calculated when the Ascendant reaches 15 degrees.',
    images: ["/og-image.png"],
  },
};

export default function TransitsPerAscendantPage() {
  const schema = generateWebPageSchema(
    "Transits per Ascendant",
    "View daily transit Kundli charts rotated for each of the 12 Ascendants (Lagnas) calculated when the Ascendant reaches 15 degrees.",
    "https://baliastrology.com/transits-per-ascendant"
  );

  return (
    <>
      <JsonLd data={schema} />
      <TransitsPerAscendantClientPage />
    </>
  );
}
