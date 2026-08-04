import { test, expect } from '@playwright/test';

test('Hora page renders correctly and supports translation', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript(() => {
    window.localStorage.setItem('moonine_popup_last_shown', Date.now().toString());
  });

  // Navigate to the Hora page
  await page.goto('/hora');
  await page.waitForLoadState('networkidle');

  // Verify English Title and header
  await expect(page.locator('h1')).toContainText('Planetary Hours');

  // Verify elements such as "Today" button and Timeline
  await expect(page.getByRole('button', { name: 'Today' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hora Timeline (24 Hours)' })).toBeVisible();

  // Verify the list has 24 rows
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(24);

  // Toggle language to Hindi
  const hindiBtn = page.locator('button:has-text("हि")').first();
  await hindiBtn.click();

  // Wait for translation to apply
  await expect(page.locator('h1')).toContainText('होरा चक्र');
  await expect(page.getByRole('button', { name: 'आज' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'होरा समयरेखा (24 घंटे)' })).toBeVisible();
});
