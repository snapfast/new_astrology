import React from 'react';
import { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: "Terms of Service | Rahul Bali Astrology",
  description: "Read our Terms of Service. Learn about astrological disclaimers, accurate birth inputs, and voluntary contributions for Rahul Bali Astrology.",
  alternates: {
    canonical: "https://astro.rahulbali.in/terms",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
