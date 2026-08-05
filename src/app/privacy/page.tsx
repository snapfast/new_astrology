import React from 'react';
import { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our Privacy Policy. Learn how your birth details, names, and contact information are processed securely with absolute confidentiality.",
  keywords: [
    "Privacy Policy", "Rahul Bali Astrology privacy", "birth data security",
    "confidential astrology consultation", "user data privacy"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Rahul Bali Astrology",
    description: "Read our Privacy Policy. Learn how your birth details, names, and contact information are processed securely with absolute confidentiality.",
    url: "https://astro.rahulbali.in/privacy",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Rahul Bali Astrology",
    description: "Read our Privacy Policy. Learn how your birth details, names, and contact information are processed securely.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
