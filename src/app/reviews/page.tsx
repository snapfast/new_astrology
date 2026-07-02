import { Metadata } from 'next';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata: Metadata = {
  title: "Rahul Bali Astrology Reviews | Best Astrologer in Gurugram & Gurgaon",
  description: "Read authentic reviews for Pandit Rahul Bali Ji, a trusted Vedic astrologer in Gurugram and Gurgaon. See what clients say about his accurate predictions and remedies.",
  alternates: {
    canonical: "https://astro.rahulbali.in/reviews",
  },
};

export default function ReviewsPage() {
  return <ReviewsClientPage />;
}
