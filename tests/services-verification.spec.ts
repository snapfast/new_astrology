import { test, expect } from '@playwright/test';

test('services page has correct images and condensed layout', async ({ page }) => {
  await page.goto('http://localhost:3000/services');

  // Check for the three core service images by alt text (less brittle than IDs)
  await expect(page.locator('img[alt*="nebula"]')).toBeVisible();
  await expect(page.locator('img[alt*="ancient book"]')).toBeVisible();
  await expect(page.locator('img[alt*="healing crystals"]')).toBeVisible();

  // Check for some text content
  await expect(page.locator('h1')).toContainText('Vedic Astrology Services');
});
