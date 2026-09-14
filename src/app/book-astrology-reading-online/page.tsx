import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { generateWebPageSchema } from '@/lib/seo';
import BookReadingClientPage from './BookReadingClientPage';

export const metadata: Metadata = {
  title: "Booking",
  description: "Get clear, personalized astrological readings based on your birth chart with focused insights on career, relationships, finances, or full chart analysis.",
  keywords: [
    "book astrology reading", "online astrology consultation", "vedic astrology reading",
    "birth chart analysis", "kundli reading", "personalized horoscope", "bali astrology"
  ],
  alternates: {
    canonical: "https://baliastrology.com/book-astrology-reading-online",
  },
  openGraph: {
    title: "Booking | Bali Astrology",
    description: "Get clear, personalized astrological readings based on your birth chart with focused insights on career, relationships, finances, or full chart analysis.",
    url: "https://baliastrology.com/book-astrology-reading-online",
    siteName: "Bali Astrology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Book Astrology Reading Online - Bali Astrology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking | Bali Astrology",
    description: "Get clear, personalized astrological readings based on your birth chart.",
    images: ["/og-image.png"],
  },
};

export default function BookAstrologyReadingPage() {
  const schema = generateWebPageSchema(
    "Booking",
    "Get clear, personalized astrological readings based on your birth chart with focused insights.",
    "https://baliastrology.com/book-astrology-reading-online"
  );

  return (
    <>
      <JsonLd data={schema} />
      <BookReadingClientPage />
    </>
  );
}
