import { test, expect } from '@playwright/test';

test('Reviews page map and note verification', async ({ page }) => {
  await page.goto('/reviews');
  await page.waitForLoadState('networkidle');

  // Verify Google Maps iframe
  const mapIframe = page.locator('iframe[title="Rahul Bali Astrology on Google Maps"]');
  await expect(mapIframe).toBeVisible();

  const iframeSrc = await mapIframe.getAttribute('src');
  expect(iframeSrc).toContain('google.com/maps/embed');

  // Verify Archival Note (English)
  await expect(page.getByText('The reviews below are from our old records.', { exact: false })).toBeVisible();

  // Switch to Hindi and verify
  // The Hindi button has aria-label="हिन्दी"
  await page.click('button[aria-label="हिन्दी"]');
  await page.waitForLoadState('networkidle');

  // Verify Archival Note (Hindi)
  await expect(page.getByText('नीचे दी गई समीक्षाएं हमारे पुराने अभिलेखागार से हैं।', { exact: false })).toBeVisible();
});
