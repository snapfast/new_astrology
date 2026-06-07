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
  // The section is after the main CONSULTATIONS list.
  // CONSULTATIONS has 3 items, and they use h2 for titles.
  // SPECIALIZED_SERVICES use h3 for titles.
  const specializedServiceTitles = page.locator('h3');
  await expect(specializedServiceTitles).toHaveCount(14);

  await page.screenshot({ path: 'services-verification.png', fullPage: true });
});
