import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getAllPosts, getPostBySlug, getRelatedPosts, BLOG_POSTS } from './blog.ts';

describe('Blog Data Library', () => {
  test('getAllPosts returns posts sorted by publishedAt descending', () => {
    const posts = getAllPosts();
    assert.strictEqual(posts.length, BLOG_POSTS.length);
    assert.ok(posts.length > 0);

    for (let i = 0; i < posts.length - 1; i++) {
      const current = new Date(posts[i].publishedAt).getTime();
      const next = new Date(posts[i + 1].publishedAt).getTime();
      assert.ok(current >= next, 'Posts should be sorted descending by date');
    }
  });

  test('getPostBySlug retrieves correct post', () => {
    const firstSlug = BLOG_POSTS[0].slug;
    const post = getPostBySlug(firstSlug);
    assert.notStrictEqual(post, undefined);
    assert.strictEqual(post?.slug, firstSlug);
    assert.strictEqual(post?.title, BLOG_POSTS[0].title);
  });

  test('getPostBySlug returns undefined for invalid slug', () => {
    const post = getPostBySlug('non-existent-article-slug');
    assert.strictEqual(post, undefined);
  });

  test('getRelatedPosts returns related posts excluding current post', () => {
    const targetSlug = BLOG_POSTS[0].slug;
    const related = getRelatedPosts(targetSlug, 2);

    assert.ok(related.length <= 2);
    assert.ok(!related.some((p) => p.slug === targetSlug));
  });

  test('All blog posts have required fields and non-empty sections', () => {
    for (const post of BLOG_POSTS) {
      assert.ok(post.slug && post.slug.length > 0, 'Slug must be non-empty');
      assert.ok(post.title && post.title.length > 0, 'Title must be non-empty');
      assert.ok(post.excerpt && post.excerpt.length > 0, 'Excerpt must be non-empty');
      assert.ok(post.publishedAt && !isNaN(Date.parse(post.publishedAt)), 'publishedAt must be a valid date');
      assert.ok(post.author.name && post.author.role, 'Author info must be complete');
      assert.ok(post.readTime, 'readTime must be defined');
      assert.ok(Array.isArray(post.tags) && post.tags.length > 0, 'Tags must be a non-empty array');
      assert.ok(Array.isArray(post.sections) && post.sections.length > 0, 'Sections must be a non-empty array');
    }
  });
});
