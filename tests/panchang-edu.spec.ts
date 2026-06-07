import { test, expect } from '@playwright/test';

test('Panchang Education section includes Karana', async ({ page }) => {
  await page.goto('/panchang');

  // Find the "Understanding Panchang" section
  const eduSection = page.locator('section').filter({ hasText: 'Understanding Panchang' });
  await expect(eduSection).toBeVisible();

  // Check for the five limbs
  await expect(eduSection.getByText('1. Tithi')).toBeVisible();
  await expect(eduSection.getByText('2. Vara')).toBeVisible();
  await expect(eduSection.getByText('3. Nakshatra')).toBeVisible();
  await expect(eduSection.getByText('4. Yoga')).toBeVisible();
  await expect(eduSection.getByText('5. Karana')).toBeVisible();

  // Verify Karana description
  await expect(eduSection.getByText('Half of a Tithi. Each Tithi consists of two Karanas.')).toBeVisible();
});
