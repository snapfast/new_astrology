import { Metadata } from 'next';
import DonateClientPage from './DonateClientPage';

export const metadata: Metadata = {
  title: "Support My Work | Donate - Rahul Bali Astrology",
  description: "Support Pandit Rahul Bali Ji's work in Vedic Astrology. Your contributions help maintain this platform and provide free astrological tools to everyone.",
  alternates: {
    canonical: "https://astro.rahulbali.in/donate",
  },
};

export default function DonatePage() {
  return <DonateClientPage />;
}
