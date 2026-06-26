import { test, expect } from '@playwright/test';

test('Settings modal integration', async ({ page }) => {
  await page.goto('/horoscope?dob=2000-01-01&tob=12:00&lat=28.6&lon=77.2&name=Test');

  // Settings button should be visible
  const settingsBtn = page.locator('button[title="Settings"], button[title="सेटिंग्स"]').first();
  await expect(settingsBtn).toBeVisible();

  // Click settings to open modal
  await settingsBtn.click();

  // Modal should be visible
  await expect(page.getByText('Chart Settings').first()).toBeVisible();

  // True node option should be available
  await expect(page.getByText('True Node').first()).toBeVisible();

  // Click True node option
  await page.getByText('True Node').first().click();

  // Expect URL to change
  await expect(page).toHaveURL(/nodeType=true/);
});
