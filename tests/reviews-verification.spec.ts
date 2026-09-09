import { test, expect } from '@playwright/test';

test('Reviews page map and note verification', async ({ page }) => {
  await page.goto('/reviews');
  await page.waitForLoadState('networkidle');

  // Verify Google Maps iframe
  const mapIframe = page.locator('iframe[title="Rahul Bali Astrology on Google Maps"]');
  await expect(mapIframe).toBeVisible();

  const iframeSrc = await mapIframe.getAttribute('src');
  expect(iframeSrc).toBe('https://share.google/u7vMNubQvWEnVMT1f');

  // Verify Archival Note (English)
  await expect(page.getByText('Please check our Google profile above for the latest reviews.', { exact: false })).toBeVisible();

});
