import { test, expect } from '@playwright/test';

test('FAQ page renders correctly', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript(() => {
    window.localStorage.setItem('moonine_popup_last_shown', Date.now().toString());
  });

  // Navigate to the FAQ page
  await page.goto('/faq');
  await page.waitForLoadState('networkidle');

  // Verify English Title and header
  await expect(page.locator('h1')).toContainText('Frequently Asked Questions');

  // Verify the Varga Charts are visible by default
  await expect(page.getByText('D1', { exact: true })).toBeVisible();
  await expect(page.getByText('Navamsha Chart')).toBeVisible();
  await expect(page.getByText('D60', { exact: true })).toBeVisible();

  // Toggle general tab
  await page.click('button:has-text("General & Systems FAQ")');

  // Verify specific questions
  await expect(page.getByRole('heading', { name: 'What are Varga charts and why are they important in Vedic Astrology?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What is the Panch Pakshi Astrology system?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How does the Biorhythm tracker assist in self-awareness?' })).toBeVisible();

});
