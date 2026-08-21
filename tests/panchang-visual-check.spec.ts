import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const datesToTest = [
  '2026-03-30',
  '2026-03-31',
  '2026-04-01',
  '2026-04-02',
  '2026-04-03',
  '2026-04-04',
  '2026-04-05',
  '2026-04-06',
  '2026-04-07',
  '2026-04-08',
  '2026-11-08' // Diwali boundary date test
];

test.describe('Panchang Visual & Data Verification Across 10+ Days', () => {
  const screenshotsDir = path.join(process.cwd(), 'panchang-screenshots');

  test.beforeAll(() => {
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  for (const dateStr of datesToTest) {
    test(`Desktop Panchang verification for ${dateStr}`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.addInitScript("window.localStorage.setItem('moonine_popup_last_shown', Date.now().toString())");

      await page.goto('/panchang');

      const dateInput = page.locator('input[type="date"]');
      await expect(dateInput).toBeVisible();

      await dateInput.fill(dateStr);
      await page.waitForTimeout(1500);

      // Verify basic elements
      await expect(page.locator('text=Panchang Elements')).toBeVisible();

      // Screenshot full page
      await page.screenshot({ path: path.join(screenshotsDir, `panchang-desktop-${dateStr}.png`), fullPage: true });
    });

    test(`Mobile Panchang verification for ${dateStr}`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.addInitScript("window.localStorage.setItem('moonine_popup_last_shown', Date.now().toString())");

      await page.goto('/panchang');

      const dateInput = page.locator('input[type="date"]');
      await expect(dateInput).toBeVisible();

      await dateInput.fill(dateStr);
      await page.waitForTimeout(1500);

      // Verify basic elements
      await expect(page.locator('text=Panchang Elements')).toBeVisible();

      // Screenshot full page
      await page.screenshot({ path: path.join(screenshotsDir, `panchang-mobile-${dateStr}.png`), fullPage: true });
    });
  }
});
