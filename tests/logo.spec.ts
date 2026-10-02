import { test, expect } from '@playwright/test';

test('capture logo header', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/jules/verification/logo_full_header.png' });
});
