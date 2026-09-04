import React from 'react';
import { Metadata } from 'next';
import LegalContent from './LegalContent';

export const metadata: Metadata = {
  title: "Legal Information",
  description: "Read our Terms of Service and Privacy Policy. Learn about astrological disclaimers, birth inputs, and information security.",
  keywords: [
    "Terms of Service", "Privacy Policy", "Rahul Bali Astrology legal",
    "astrological disclaimers", "consultation guidelines", "user data privacy"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/legal",
  },
  openGraph: {
    title: "Legal Information | Rahul Bali Astrology",
    description: "Read our Terms of Service and Privacy Policy. Learn about astrological disclaimers, birth inputs, and information security.",
    url: "https://astro.rahulbali.in/legal",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Legal Information - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Information | Rahul Bali Astrology",
    description: "Read our Terms of Service and Privacy Policy. Learn about astrological disclaimers, birth inputs, and information security.",
    images: ["/og-image.png"],
  },
};

export default function LegalPage() {
  return <LegalContent />;
}
