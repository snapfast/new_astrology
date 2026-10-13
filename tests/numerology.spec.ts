import { test, expect } from '@playwright/test';

test('Numerology form submission works without click interception', async ({ page }) => {
  await page.goto('/numerology');

  // Fill out the form
  await page.fill('#name', 'Test User');
  await page.fill('#dob', '1990-01-01');

  // Click the calculate button
  await page.click('button:has-text("Calculate Numbers")');

  // Verify the results are displayed
  await expect(page.locator('text=Mulank (Birth)').nth(1)).toBeVisible();
});
