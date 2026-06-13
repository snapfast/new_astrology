import { test, expect } from '@playwright/test';

test('Hero section trust signals are visible and correct', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('200+', { exact: true })).toBeVisible();
  await expect(page.getByText('Consultations', { exact: true })).toBeVisible();
  await expect(page.getByText('10+', { exact: true })).toBeVisible();
  await expect(page.getByText('Countries', { exact: true })).toBeVisible();
  await expect(page.getByText('5.0 Google Rating', { exact: true })).toBeVisible();

  // Check for star icons
  const stars = page.locator('.material-symbols-outlined:has-text("star")');
  // 5 in Hero, 5 in Testimonials
  await expect(stars).toHaveCount(10);
});

test('Testimonials section rating is visible', async ({ page }) => {
  await page.goto('/');
  await page.locator('text=Testimonials').scrollIntoViewIfNeeded();
  await expect(page.getByText('5.0 GOOGLE RATING', { exact: true })).toBeVisible();
});
