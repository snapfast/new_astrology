import { Metadata } from 'next';
import DonateClientPage from './DonateClientPage';
import { getAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Donate",
  robots: { index: false, follow: false },
  description: "Support Pandit Rahul Bali Ji's work in Vedic Astrology. Your contributions help maintain this platform and provide free astrological tools to everyone.",
  keywords: [
    "bali", "astro", "astrology", "india", "haryana", "miracle", "dharma", "remedy", "happiness",
    "Donate Bali Astrology", "support free astrology tools", "voluntary contributions",
    "astrology platform donation", "UPI donation", "PayPal astrology support"
  ],
  alternates: getAlternates("/donate"),
  openGraph: {
    title: "Donate | Bali Astrology",
    description: "Support Pandit Rahul Bali Ji's work in Vedic Astrology. Your contributions help maintain this platform and provide free astrological tools to everyone.",
    url: "https://baliastrology.com/donate",
    siteName: "Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Donate to Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate | Bali Astrology",
    description: "Support Pandit Rahul Bali Ji's work in Vedic Astrology.",
    images: ["/og-image.png"],
  },
};

export default function DonatePage() {
  return <DonateClientPage />;
}
