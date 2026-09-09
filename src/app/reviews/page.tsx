import { Metadata } from 'next';
import ReviewsClientPage from './ReviewsClientPage';
import JsonLd from '@/components/JsonLd';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Reviews",
  description: "Client reviews and experiences with Rahul Bali Astrology",
  keywords: [
    "Rahul Bali reviews", "trusted astrologer reviews",
    "client testimonials", "accurate astrology predictions", "astrologer Google rating"
  ],
  alternates: {
    canonical: "https://baliastrology.com/reviews",
  },
  openGraph: {
    title: "Reviews | Rahul Bali Astrology",
    description: "Client reviews and experiences with Rahul Bali Astrology",
    url: "https://baliastrology.com/reviews",
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
  const schema = generateWebPageSchema(
    "Reviews",
    "Client reviews and experiences with Rahul Bali Astrology",
    "https://baliastrology.com/reviews"
  );

  return (
    <>
      <JsonLd data={schema} />
      <ReviewsClientPage />
    </>
  );
}
