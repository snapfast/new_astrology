import { Metadata } from 'next';
import BiorhythmClientPage from './BiorhythmClientPage';

export const metadata: Metadata = {
  title: 'Personal Biorhythm Calculator | Pandit Rahul Bali',
  description: 'Track your physical, emotional, and intellectual biorhythm cycles. Understand your natural energy peaks and troughs based on your birth date.',
  openGraph: {
    title: 'Personal Biorhythm Calculator | Pandit Rahul Bali',
    description: 'Track your physical, emotional, and intellectual biorhythm cycles. Understand your natural energy peaks and troughs.',
    type: 'website',
  },
};

export default function BiorhythmPage() {
  return <BiorhythmClientPage />;
}
