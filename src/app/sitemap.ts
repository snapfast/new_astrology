import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://baliastrology.com';

  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/reviews',
    '/horoscope',
    '/kp-horary',
    '/free-horoscope',
    '/panchang',
    '/hora',
    '/transits',
    '/transits-table',
    '/biorhythm',
    '/panch-pakshi',
    '/btr',
    '/faq',
    '/privacy',
    '/terms',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }));

  const blogPosts = getAllPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
