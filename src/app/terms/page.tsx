import React from 'react';
import { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: "Terms of Service | Rahul Bali Astrology",
  description: "Read our Terms of Service. Learn about astrological disclaimers, accurate birth inputs, and voluntary contributions for Rahul Bali Astrology.",
  keywords: [
    "Terms of Service", "astrological disclaimers", "Rahul Bali Astrology terms",
    "consultation guidelines", "refund and payment terms"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/terms",
  },
  openGraph: {
    title: "Terms of Service | Rahul Bali Astrology",
    description: "Read our Terms of Service. Learn about astrological disclaimers, accurate birth inputs, and voluntary contributions.",
    url: "https://astro.rahulbali.in/terms",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Terms of Service - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Rahul Bali Astrology",
    description: "Read our Terms of Service. Learn about astrological disclaimers, accurate birth inputs, and voluntary contributions.",
    images: ["/og-image.png"],
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
