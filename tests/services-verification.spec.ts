import { test, expect } from '@playwright/test';

test('services page shows specialized consultations', async ({ page }) => {
  await page.goto('http://localhost:3001/services');

  // Check if the main heading is present
  await expect(page.locator('h1')).toContainText('Vedic Astrology Services');

  // Check for some of the new service titles
  await expect(page.getByRole('heading', { name: 'Emotional Distress' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Health Concerns' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Spiritual Dilemmas' })).toBeVisible();

  // Check for a description to ensure it's rendered
  await expect(page.getByText('Navigate through periods of inner turmoil and emotional instability')).toBeVisible();

  // Verify there are 14 specialized services
  const specializedServiceTitles = page.locator('h3');
  await expect(specializedServiceTitles).toHaveCount(14);

  // Check that images are NOT present
  await expect(page.locator('img[alt*="nebula"]')).not.toBeVisible();
  await expect(page.locator('img[alt*="ancient book"]')).not.toBeVisible();
  await expect(page.locator('img[alt*="healing crystals"]')).not.toBeVisible();

  // Check that "Inquire via WhatsApp" is NOT present (as per latest requirements)
  await expect(page.getByText('Inquire via WhatsApp')).not.toBeVisible();

  await page.screenshot({ path: 'services-verification.png', fullPage: true });
});
