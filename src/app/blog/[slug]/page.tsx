import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import BlogArticleClientPage from './BlogArticleClientPage';

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${post.title}`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Bali Astrology`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      title: `${post.title} | Bali Astrology`,
      description: post.excerpt,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 2);

  // If no tag-matching posts, fall back to recent posts
  const finalRelatedPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return <BlogArticleClientPage post={post} relatedPosts={finalRelatedPosts} />;
}
