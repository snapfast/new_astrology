import { test, expect } from '@playwright/test';

test('Hero section trust signals are visible and correct', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('200+', { exact: true })).toBeVisible();
  await expect(page.getByText('Consultations', { exact: true })).toBeVisible();
  await expect(page.getByText('10+', { exact: true })).toBeVisible();
  await expect(page.getByText('Countries Reach', { exact: true })).toBeVisible();
  await expect(page.getByText('5.0', { exact: true })).toBeVisible();
  await expect(page.getByText('Google Rating', { exact: true })).toBeVisible();

  // Verify no star icons or chat_bubble icons exist in this section
  const heroTrustSignals = page.locator('.max-w-2xl.mx-auto.pt-8');
  await expect(heroTrustSignals.locator('.material-symbols-outlined')).toHaveCount(0);
});

test('Testimonials section rating is visible', async ({ page }) => {
  await page.goto('/');
  await page.locator('text=Testimonials').scrollIntoViewIfNeeded();
  await expect(page.getByText('5.0 GOOGLE RATING', { exact: true })).toBeVisible();
});
