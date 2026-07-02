import { test, expect } from '@playwright/test';

test('verify final donate page', async ({ page }) => {
  await page.goto('http://localhost:3000/donate');
  await page.waitForLoadState('networkidle');
  const h1 = await page.locator('h1').innerText();
  console.log('H1 Title:', h1);
  await page.screenshot({ path: 'final_verification.png', fullPage: true });
});
