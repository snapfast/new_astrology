import { Metadata } from 'next';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata: Metadata = {
  title: "Reviews",
  description: "Client reviews and experiences with Rahul Bali Astrology",
  keywords: [
    "Rahul Bali reviews", "trusted astrologer reviews",
    "client testimonials", "accurate astrology predictions", "astrologer Google rating"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/reviews",
  },
  openGraph: {
    title: "Reviews | Rahul Bali Astrology",
    description: "Client reviews and experiences with Rahul Bali Astrology",
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
    title: "Reviews | Rahul Bali Astrology",
    description: "Client reviews and experiences with Rahul Bali Astrology",
    images: ["/og-image.png"],
  },
};

export default function ReviewsPage() {
  return <ReviewsClientPage />;
}
