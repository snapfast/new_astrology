import { Metadata } from 'next';
import BookClientPage from './BookClientPage';

export const metadata: Metadata = {
  title: "Book a Consultation | Rahul Bali Astrology",
  description: "Schedule your private Vedic Astrology consultation with Pandit Rahul Bali Ji. Secure your 30-minute session for personalized guidance and spiritual insights.",
  alternates: {
    canonical: "https://astro.rahulbali.in/book",
  },
};

export default function BookPage() {
  return <BookClientPage />;
}
