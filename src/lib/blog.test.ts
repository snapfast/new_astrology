import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAllPosts, getPostBySlug, getAllTags } from './blog.ts';

test('getAllPosts returns articles sorted chronologically by publishedAt descending', () => {
  const posts = getAllPosts();
  assert.ok(posts.length >= 3, 'Should have at least 3 blog posts');

  for (let i = 0; i < posts.length - 1; i++) {
    const timeA = new Date(posts[i].publishedAt).getTime();
    const timeB = new Date(posts[i + 1].publishedAt).getTime();
    assert.ok(timeA >= timeB, `Posts should be sorted descending: ${posts[i].publishedAt} >= ${posts[i + 1].publishedAt}`);
  }
});

test('getPostBySlug retrieves existing post correctly', () => {
  const post = getPostBySlug('understanding-panchang');
  assert.notEqual(post, null);
  assert.equal(post?.title, 'Understanding Panchang: The Five Pillars of Vedic Timekeeping');
  assert.equal(post?.author, 'Pandit Rahul Bali Ji');
  assert.ok(post?.content.includes('Tithi'), 'Content should contain HTML parsed from markdown');
});

test('getPostBySlug returns null for invalid slug', () => {
  const post = getPostBySlug('non-existent-article-slug');
  assert.equal(post, null);
});

test('getAllTags extracts sorted array of unique tags', () => {
  const tags = getAllTags();
  assert.ok(tags.length > 0, 'Should extract tags from articles');
  assert.ok(tags.includes('Panchang'));
  assert.ok(tags.includes('KP Astrology'));

  const sortedTags = [...tags].sort();
  assert.deepEqual(tags, sortedTags, 'Tags should be alphabetically sorted');
});
