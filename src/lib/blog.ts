import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  author: string;
  tags: string[];
  excerpt: string;
  content: string; // HTML converted from markdown
  readTime: string;
  coverImage?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const numberOfWords = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const htmlContent = marked.parse(content) as string;

      return {
        slug,
        title: data.title || 'Untitled Post',
        publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
        author: data.author || 'Pandit Rahul Bali Ji',
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt || '',
        content: htmlContent,
        readTime: data.readTime || calculateReadTime(content),
        coverImage: data.coverImage || undefined,
      };
    });

  // Sort posts chronologically by publishedAt descending (newest first)
  return allPostsData.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = marked.parse(content) as string;

    return {
      slug,
      title: data.title || 'Untitled Post',
      publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
      author: data.author || 'Pandit Rahul Bali Ji',
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: data.excerpt || '',
      content: htmlContent,
      readTime: data.readTime || calculateReadTime(content),
      coverImage: data.coverImage || undefined,
    };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
