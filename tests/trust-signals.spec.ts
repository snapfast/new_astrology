import { test, expect } from '@playwright/test';

test('Hero section trust signals are visible and correct', async ({ page }) => {
  await page.goto('/');
  // Wait for the main text to be visible to ensure hydration
  await expect(page.getByText('VEDIC ASTROLOGY · JYOTISH SHASTRA')).toBeVisible();

  await expect(page.getByText('200+', { exact: true })).toBeVisible();
  await expect(page.getByText('Consultations', { exact: true })).toBeVisible();
  await expect(page.getByText('5.0', { exact: true })).toBeVisible();
  await expect(page.getByText('Google Rating', { exact: true })).toBeVisible();
  await expect(page.getByText('10+', { exact: true })).toBeVisible();
  await expect(page.getByText('Countries Reach', { exact: true })).toBeVisible();
});

test('Testimonials section rating is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('VEDIC ASTROLOGY · JYOTISH SHASTRA')).toBeVisible();

  await page.locator('text=Testimonials').scrollIntoViewIfNeeded();
  await expect(page.getByText('5.0 GOOGLE RATING', { exact: true })).toBeVisible();
});
