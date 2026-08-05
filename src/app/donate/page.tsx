import { Metadata } from 'next';
import DonateClientPage from './DonateClientPage';

export const metadata: Metadata = {
  title: "Donate",
  description: "Support Pandit Rahul Bali Ji's work in Vedic Astrology. Your contributions help maintain this platform and provide free astrological tools to everyone.",
  keywords: [
    "Donate Rahul Bali Astrology", "support free astrology tools", "voluntary contributions",
    "astrology platform donation", "UPI donation", "PayPal astrology support"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/donate",
  },
  openGraph: {
    title: "Donate | Rahul Bali Astrology",
    description: "Support Pandit Rahul Bali Ji's work in Vedic Astrology. Your contributions help maintain this platform and provide free astrological tools to everyone.",
    url: "https://astro.rahulbali.in/donate",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Donate to Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate | Rahul Bali Astrology",
    description: "Support Pandit Rahul Bali Ji's work in Vedic Astrology.",
    images: ["/og-image.png"],
  },
};

export default function DonatePage() {
  return <DonateClientPage />;
}
