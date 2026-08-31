import { test, expect } from '@playwright/test';

test('KP Horoscope page renders two charts and educational content', async ({ page }) => {
  await page.goto('/kp-horoscope?name=Test&dob=2024-01-01&tob=12:00&pob=Delhi&lat=28.6&lon=77.2&kpNumber=150');

  // Check headers for both charts
  await expect(page.getByText('Standard D1 Chart', { exact: true })).toBeVisible();
  await expect(page.getByText('KP Horary Lagna', { exact: true })).toBeVisible();

  // Ensure there are only two Kundli charts on the page
  const charts = page.locator('svg[viewBox="-4 -4 408 408"]');
  await expect(charts).toHaveCount(2);

  // Check educational section
  await expect(page.getByText('KP Astrology & Prashna')).toBeVisible();
  await expect(page.getByText('How to Read the KP Chart?')).toBeVisible();

  // Verify removed sections don't exist
  await expect(page.getByText('Vedic Panchang')).not.toBeVisible();
  await expect(page.getByText('Vimshottari Dasha', { exact: true })).not.toBeVisible();
  await expect(page.getByText('Sarva Ashtakvarga (SAV)')).not.toBeVisible();
  await expect(page.getByText('Planetary Positions', { exact: true })).not.toBeVisible();
});
