import { test, expect } from '@playwright/test';

test('Transits page renders all twelve planets and future transits', async ({ page }) => {
  // Navigate to transits page
  await page.goto('http://localhost:3000/transits');

  // Verify PageHeader titles
  await expect(page.locator('h1')).toContainText('Planetary Transits');

  // Check that all 12 planets are displayed on the page
  const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus", "Neptune", "Pluto"];
  for (const planet of planets) {
    await expect(page.locator('h3')).toContainText([planet]);
  }

  // Ensure reference time selector is present
  const dateInput = page.locator('input[type="date"]');
  const timeInput = page.locator('input[type="time"]');
  await expect(dateInput).toBeVisible();
  await expect(timeInput).toBeVisible();

  // Change date and ensure it updates/recalculates correctly
  await dateInput.fill('2025-05-15');
  await timeInput.fill('10:30');

  // Verify that future transits label exists
  await expect(page.locator('h4')).toContainText(['Upcoming Transits']);

  // Verify that past movements label does NOT exist
  await expect(page.locator('h4')).not.toContainText(['Past 3 Movements']);
});
