import { Metadata } from 'next';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata: Metadata = {
  title: "Reviews",
  description: "Transforming Destiny, Elevating Lives — Happy Clients, Happy Life",
  keywords: [
    "Rahul Bali reviews", "best astrologer in Gurugram", "trusted astrologer Gurgaon reviews",
    "client testimonials", "accurate astrology predictions", "astrologer Google rating"
  ],
  alternates: {
    canonical: "https://astro.rahulbali.in/reviews",
  },
  openGraph: {
    title: "Reviews | Rahul Bali Astrology",
    description: "Transforming Destiny, Elevating Lives — Happy Clients, Happy Life",
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
    description: "Transforming Destiny, Elevating Lives — Happy Clients, Happy Life",
    images: ["/og-image.png"],
  },
};

export default function ReviewsPage() {
  return <ReviewsClientPage />;
}
