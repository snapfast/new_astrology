import { test } from 'node:test';
import assert from 'node:assert';
import { SOCIAL_PROFILES } from './social-data.ts';

test('SOCIAL_PROFILES contains all expected platforms', () => {
  const expectedPlatforms = ['threads', 'instagram', 'facebook', 'youtube', 'linkedin', 'tumblr', 'reddit'];
  const actualPlatforms = Object.keys(SOCIAL_PROFILES);

  for (const platform of expectedPlatforms) {
    assert.ok(actualPlatforms.includes(platform), `Expected ${platform} to be in SOCIAL_PROFILES`);
  }

  assert.strictEqual(actualPlatforms.length, expectedPlatforms.length, 'There are unexpected platforms in SOCIAL_PROFILES');
});

test('SOCIAL_PROFILES contains valid https URLs', () => {
  for (const [platform, urlString] of Object.entries(SOCIAL_PROFILES)) {
    try {
      const url = new URL(urlString);
      assert.strictEqual(url.protocol, 'https:', `${platform} URL must use https protocol`);
    } catch (e) {
      assert.fail(`URL for ${platform} is invalid: ${urlString}`);
    }
  }
});
