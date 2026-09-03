import { Metadata } from 'next';
import BtrClientPage from './BtrClientPage';

export const metadata: Metadata = {
  title: 'Birth Time Rectification (BTR) Tool',
  description: 'Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.',
  openGraph: {
    title: 'Birth Time Rectification (BTR) Tool | Rahul Bali Astrology',
    description: 'Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.',
    url: 'https://astro.rahulbali.in/btr',
    type: 'website',
  },
  twitter: {
    title: 'Birth Time Rectification (BTR) Tool | Rahul Bali Astrology',
    description: 'Birth Time Rectification (BTR) tool to determine and adjust your birth time using Vedic Astrology techniques.',
  }
};

export default function BtrPage() {
  return <BtrClientPage />;
}
