import { test, expect } from '@playwright/test';

test('Reviews page map and note verification', async ({ page }) => {
  await page.goto('/reviews');
  await page.waitForLoadState('networkidle');

  // Verify Google Maps iframe
  const mapIframe = page.locator('iframe[title="Bali Astrology on Google Maps"]');
  await expect(mapIframe).toBeVisible();

  const iframeSrc = await mapIframe.getAttribute('src');
  expect(iframeSrc).toContain('google.com/maps/embed');

  // Verify Archival Note (English)
  await expect(page.getByText('Please check our Google profile above for the latest reviews.', { exact: false })).toBeVisible();


});


test('About page Threads post embed verification', async ({ page }) => {
  await page.goto('/about');
  await page.waitForLoadState('networkidle');

  const threadsEmbed1 = page.locator('blockquote[data-text-post-permalink*="Dd2CG6YE1Qm"], iframe[src*="Dd2CG6YE1Qm"]');
  await expect(threadsEmbed1.first()).toBeAttached();

  const threadsEmbed2 = page.locator('blockquote[data-text-post-permalink*="DbnbWEbDw6u"], iframe[src*="DbnbWEbDw6u"]');
  await expect(threadsEmbed2.first()).toBeAttached();
});
