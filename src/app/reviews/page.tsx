import { Metadata } from 'next';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata: Metadata = {
  title: "Rahul Bali Astrology Reviews | Best Astrologer in Gurugram & Gurgaon",
  description: "Read authentic reviews for Pandit Rahul Bali Ji, a trusted Vedic astrologer in Gurugram and Gurgaon. See what clients say about his accurate predictions and remedies.",
  keywords: [
    "Rahul Bali reviews", "best astrologer in Gurugram", "trusted astrologer Gurgaon reviews",
    "client testimonials", "accurate astrology predictions", "astrologer Google rating"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/reviews",
  },
  openGraph: {
    title: "Rahul Bali Astrology Reviews | Best Astrologer in Gurugram & Gurgaon",
    description: "Read authentic reviews for Pandit Rahul Bali Ji, a trusted Vedic astrologer in Gurugram and Gurgaon.",
    url: "https://astro.rahulbali.in/reviews",
    siteName: "Rahul Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Client Reviews - Rahul Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Bali Astrology Reviews | Best Astrologer in Gurugram & Gurgaon",
    description: "Read authentic reviews for Pandit Rahul Bali Ji, a trusted Vedic astrologer in Gurugram and Gurgaon.",
    images: ["/og-image.png"],
  },
};

export default function ReviewsPage() {
  return <ReviewsClientPage />;
}
