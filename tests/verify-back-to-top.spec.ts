import { test, expect } from '@playwright/test';

test('Back to Top button appears on scroll and works correctly', async ({ page }) => {
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  await page.goto(`${baseURL}/panchang`);

  const backToTopButton = page.getByRole('button', { name: 'Back to Top' });
  await expect(backToTopButton).not.toBeVisible();

  // Scroll down
  await page.evaluate(() => window.scrollTo(0, 1000));
  await expect(backToTopButton).toBeVisible();

  // Click the button
  await backToTopButton.click();

  // Wait for scroll to complete
  await page.waitForTimeout(1000);

  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeLessThan(100);

  // The button should be hidden again
  await expect(backToTopButton).not.toBeVisible();
});
