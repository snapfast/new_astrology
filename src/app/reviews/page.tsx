import { Metadata } from 'next';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Trusted Astrologer Rahul Bali",
  description: "Read authentic testimonials from clients worldwide who have found clarity and guidance through Pandit Rahul Bali Ji's Vedic astrology consultations.",
  alternates: {
    canonical: "https://astro.rahulbali.in/reviews",
  },
};

export default function ReviewsPage() {
  return <ReviewsClientPage />;
}
