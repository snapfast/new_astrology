import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAlternates, SITE_URL } from './seo.ts';

test('getAlternates returns correct canonical and hreflang mappings for root path', () => {
  const result = getAlternates('');
  assert.equal(result.canonical, SITE_URL);
  assert.deepEqual(result.languages, {
    en: SITE_URL,
    'en-US': SITE_URL,
    'x-default': SITE_URL,
  });

  const rootResult = getAlternates('/');
  assert.equal(rootResult.canonical, SITE_URL);
  assert.deepEqual(rootResult.languages, {
    en: SITE_URL,
    'en-US': SITE_URL,
    'x-default': SITE_URL,
  });
});

test('getAlternates returns correct canonical and hreflang mappings for subpages', () => {
  const expectedUrl = `${SITE_URL}/about`;

  const resultWithSlash = getAlternates('/about');
  assert.equal(resultWithSlash.canonical, expectedUrl);
  assert.deepEqual(resultWithSlash.languages, {
    en: expectedUrl,
    'en-US': expectedUrl,
    'x-default': expectedUrl,
  });

  const resultWithoutSlash = getAlternates('about');
  assert.equal(resultWithoutSlash.canonical, expectedUrl);
  assert.deepEqual(resultWithoutSlash.languages, {
    en: expectedUrl,
    'en-US': expectedUrl,
    'x-default': expectedUrl,
  });
});

test('getAlternates handles nested and dynamic paths correctly', () => {
  const expectedUrl = `${SITE_URL}/blog/understanding-panchang`;

  const result = getAlternates('/blog/understanding-panchang');
  assert.equal(result.canonical, expectedUrl);
  assert.deepEqual(result.languages, {
    en: expectedUrl,
    'en-US': expectedUrl,
    'x-default': expectedUrl,
  });
});
