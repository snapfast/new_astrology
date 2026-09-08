import { Metadata } from 'next';
import ReviewsClientPage from './ReviewsClientPage';

export const metadata: Metadata = {
  title: "Reviews",
  description: "Client reviews and experiences with Bali Astrology",
  keywords: [
    "Rahul Bali reviews", "trusted astrologer reviews",
    "client testimonials", "accurate astrology predictions", "astrologer Google rating"
  ],
  alternates: {
    canonical: "https://baliastrology.com/reviews",
  },
  openGraph: {
    title: "Reviews | Bali Astrology",
    description: "Client reviews and experiences with Bali Astrology",
    url: "https://baliastrology.com/reviews",
    siteName: "Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Client Reviews - Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews | Bali Astrology",
    description: "Client reviews and experiences with Bali Astrology",
    images: ["/og-image.png"],
  },
};

export default function ReviewsPage() {
  return <ReviewsClientPage />;
}
