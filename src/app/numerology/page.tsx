import { Metadata } from 'next';
import NumerologyClientPage from './NumerologyClientPage';
import { getAlternates } from '@/lib/seo';

const title = 'Numerology';
const description = 'Discover your Mulank, Bhagyank, and Namank with detailed numerological analysis using Chaldean and Pythagorean systems.';
const url = 'https://baliastrology.com/numerology';

export const metadata: Metadata = {
  title,
  description,
  alternates: getAlternates('/numerology'),
  openGraph: {
    title: `${title} | Bali Astrology`,
    description,
    url,
    siteName: 'Bali Astrology',
    type: 'website',
    images: [
      {
        url: 'https://baliastrology.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${title} | Bali Astrology`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | Bali Astrology`,
    description,
    images: ['https://baliastrology.com/og-image.jpg'],
  },
};

export default function NumerologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${title} | Bali Astrology`,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Bali Astrology",
      "logo": {
        "@type": "ImageObject",
        "url": "https://baliastrology.com/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NumerologyClientPage />
    </>
  );
}
