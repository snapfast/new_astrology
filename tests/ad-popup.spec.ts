import { test, expect } from '@playwright/test';

test.describe('Moonine Ad Popup Day-limit Logic', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test to ensure a clean state
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('popup should show on first load after 2 seconds', async ({ page }) => {
    await page.goto('/');
    // Initially, it shouldn't show immediately
    await expect(page.locator('text=Find Your Perfect Match')).not.toBeVisible();

    // After 2.5 seconds, it should be visible
    await page.waitForTimeout(2500);
    await expect(page.locator('text=Find Your Perfect Match')).toBeVisible();

    // The timestamp in localStorage should now be populated
    const lastShown = await page.evaluate(() => localStorage.getItem('moonine_popup_last_shown'));
    expect(lastShown).not.toBeNull();
    expect(parseInt(lastShown!, 10)).toBeLessThanOrEqual(Date.now());
  });

  test('popup should not show on reload if shown within last 24 hours', async ({ page }) => {
    // Set last shown to be 1 hour ago
    await page.goto('/');
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    await page.evaluate((time) => {
      localStorage.setItem('moonine_popup_last_shown', time.toString());
    }, oneHourAgo);

    // Reload the page
    await page.reload();

    // Wait 2.5 seconds
    await page.waitForTimeout(2500);

    // It should NOT be visible
    await expect(page.locator('text=Find Your Perfect Match')).not.toBeVisible();
  });

  test('popup should show if shown more than 24 hours ago', async ({ page }) => {
    // Set last shown to be 25 hours ago
    await page.goto('/');
    const twentyFiveHoursAgo = Date.now() - (25 * 60 * 60 * 1000);
    await page.evaluate((time) => {
      localStorage.setItem('moonine_popup_last_shown', time.toString());
    }, twentyFiveHoursAgo);

    // Reload/navigate to the page
    await page.reload();

    // Wait 2.5 seconds
    await page.waitForTimeout(2500);

    // It should be visible
    await expect(page.locator('text=Find Your Perfect Match')).toBeVisible();

    // The timestamp in localStorage should be updated to a newer timestamp
    const lastShown = await page.evaluate(() => localStorage.getItem('moonine_popup_last_shown'));
    expect(lastShown).not.toBeNull();
    expect(parseInt(lastShown!, 10)).toBeGreaterThan(twentyFiveHoursAgo);
  });
});
