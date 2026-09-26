import { Metadata } from 'next';
import BlogClientPage from './BlogClientPage';
import JsonLd from '@/components/JsonLd';
import { generateWebPageSchema } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'In-depth astrology articles, Vedic horoscope insights, planetary transits, and wisdom from Pandit Rahul Bali',
  keywords: [
    'astrology blog',
    'vedic astrology articles',
    'jyotish insights',
    'planetary transits guide',
    'kundli reading guide',
    'Rahul Bali blog',
  ],
  alternates: {
    canonical: 'https://baliastrology.com/blog',
  },
  openGraph: {
    title: 'Astrology Blog & Articles | Bali Astrology',
    description: 'In-depth astrology articles, Vedic horoscope insights, planetary transits, and wisdom from Pandit Rahul Bali',
    url: 'https://baliastrology.com/blog',
    siteName: 'Bali Astrology',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Astrology Blog - Bali Astrology',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astrology Blog & Articles | Bali Astrology',
    description: 'In-depth astrology articles, Vedic horoscope insights, planetary transits, and wisdom from Pandit Rahul Bali',
    images: ['/og-image.png'],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const schema = generateWebPageSchema(
    'Astrology Blog & Articles',
    'In-depth astrology articles, Vedic horoscope insights, planetary transits, and wisdom from Pandit Rahul Bali',
    'https://baliastrology.com/blog'
  );

  return (
    <>
      <JsonLd data={schema} />
      <BlogClientPage posts={posts} />
    </>
  );
}
