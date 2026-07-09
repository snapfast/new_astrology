import React from 'react';
import { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: "Privacy Policy | Rahul Bali Astrology",
  description: "Read our Privacy Policy. Learn how your birth details, names, and contact information are processed securely with absolute confidentiality.",
  alternates: {
    canonical: "https://astro.rahulbali.in/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
