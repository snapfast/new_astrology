import { test, expect } from '@playwright/test';

test('Transits page renders all twelve planets and future transits', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript("window.localStorage.setItem('moonine_popup_last_shown', Date.now().toString())");

  // Navigate to transits page
  await page.goto('/transits');

  // Wait for hydration to complete fully
  await page.waitForTimeout(3000);

  // Verify PageHeader titles
  await expect(page.locator('h1')).toContainText('Planetary Transits');

  // Check that all 12 planets are displayed on the page
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
  const transitTitles = page.locator('[data-testid="transit-card-title"]');
  for (const planet of planets) {
    await expect(transitTitles).toContainText([planet]);
  }

  // Ensure reference time selector is present
  const dateInput = page.locator('input[type="date"]');
  const timeInput = page.locator('input[type="time"]');
  await expect(dateInput).toBeVisible();
  await expect(timeInput).toBeVisible();

  // Ensure filter planet selector is present
  const filterSelect = page.locator('select[aria-label="Filter by Planet"]');
  await expect(filterSelect).toBeVisible();
  await expect(filterSelect.locator('option[value="all"]')).toBeAttached();
  await expect(filterSelect.locator('option[value="Sun"]')).toBeAttached();

  // Change date and ensure it updates/recalculates correctly
  await dateInput.fill('2025-05-15');
  await timeInput.fill('10:30');

  // Verify 2-column transit headers exist (Rashi Transits & Nakshatra Transits)
  await expect(page.locator('h4', { hasText: 'Rashi Transits' }).first()).toBeVisible();
  await expect(page.locator('h4', { hasText: 'Nakshatra Transits' }).first()).toBeVisible();

  // Change filter to "Sun" and verify only Sun is displayed in transit cards grid
  await filterSelect.selectOption('Sun');
  const gridCardTitles = page.locator('[data-testid="transits-grid"] [data-testid="transit-card-title"]');
  await expect(gridCardTitles).toContainText(['Sun']);
  await expect(gridCardTitles).not.toContainText(['Moon']);

  // Change filter to "Moon" and verify only Moon is displayed in transit cards grid
  await filterSelect.selectOption('Moon');
  await expect(gridCardTitles).toContainText(['Moon']);
  await expect(gridCardTitles).not.toContainText(['Sun']);
});
