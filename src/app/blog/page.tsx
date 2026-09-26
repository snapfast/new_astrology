import { Metadata } from 'next';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogClientPage from './BlogClientPage';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Vedic Astrology blog posts, planetary transits, Panchang wisdom, and spiritual guidance by Pandit Rahul Bali Ji.',
  openGraph: {
    title: 'Vedic Astrology Blog | Bali Astrology',
    description: 'Vedic Astrology blog posts, planetary transits, Panchang wisdom, and spiritual guidance by Pandit Rahul Bali Ji.',
  },
  twitter: {
    title: 'Vedic Astrology Blog | Bali Astrology',
    description: 'Vedic Astrology blog posts, planetary transits, Panchang wisdom, and spiritual guidance by Pandit Rahul Bali Ji.',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <BlogClientPage initialPosts={posts} allTags={tags} />;
}
