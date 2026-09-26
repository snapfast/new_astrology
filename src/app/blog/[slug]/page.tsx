import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogArticleClientPage from './BlogArticleClientPage';
import JsonLd from '@/components/JsonLd';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title} | Bali Astrology`,
    description: post.excerpt,
    keywords: [...post.tags, 'Bali Astrology', 'Vedic Astrology', 'Horoscope'],
    alternates: {
      canonical: `https://baliastrology.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Bali Astrology`,
      description: post.excerpt,
      url: `https://baliastrology.com/blog/${post.slug}`,
      siteName: 'Bali Astrology',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Bali Astrology`,
      description: post.excerpt,
      images: ['/og-image.png'],
    },
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bali Astrology',
      url: 'https://baliastrology.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://baliastrology.com/og-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://baliastrology.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <BlogArticleClientPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
