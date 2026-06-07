import { test, expect } from '@playwright/test';

test('services page has minimalist layout with services and descriptions', async ({ page }) => {
  // Use port 3001 as per playwright.config.ts standard mentioned in memory
  await page.goto('http://localhost:3001/services');

  // Check for hero title
  await expect(page.locator('h1')).toContainText('Vedic Astrology Services');

  // Check for the three core services
  await expect(page.getByText('Soul Compatibility')).toBeVisible();
  await expect(page.getByText('Vedic Wisdom')).toBeVisible();
  await expect(page.getByText('Remedial Measures')).toBeVisible();

  // Check that images are NOT present (optional, but confirms the request)
  await expect(page.locator('img[alt*="nebula"]')).not.toBeVisible();
  await expect(page.locator('img[alt*="ancient book"]')).not.toBeVisible();
  await expect(page.locator('img[alt*="healing crystals"]')).not.toBeVisible();

  // Check that "Inquire via WhatsApp" is NOT present
  await expect(page.getByText('Inquire via WhatsApp')).not.toBeVisible();
});
