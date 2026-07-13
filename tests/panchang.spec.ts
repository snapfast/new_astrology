import { test, expect } from '@playwright/test';

test('Panchang page lists multiple transitions and has copy text card', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript("window.localStorage.setItem('moonine_popup_last_shown', Date.now().toString())");

  await page.goto('/panchang');

  // Verify page loads initially and wait for calculations to render
  const dateInput = page.locator('input[type="date"]');
  await expect(dateInput).toBeVisible();

  // Wait for hydration to complete fully
  await page.waitForTimeout(3000);

  // Explicitly set the date to July 11, 2026 to make the test date-independent
  await dateInput.fill('2026-07-11');

  // Wait for calculations to update
  await page.waitForTimeout(3000);

  // Assert Tithi, Nakshatra, Yoga, and Karana elements are visible for Saturday, July 11, 2026
  await expect(page.locator('text=Dwadashi').first()).toBeVisible();
  await expect(page.locator('text=Krittika').first()).toBeVisible();
  await expect(page.locator('text=Ganda').first()).toBeVisible();
  await expect(page.locator('text=Kaulava').first()).toBeVisible();

  // Assert Shareable Plain-Text Card header is visible
  await expect(page.locator('text=Shareable Daily Panchang')).toBeVisible();

  // Assert copy button is visible
  const copyBtn = page.locator('button:has-text("Copy Text")');
  await expect(copyBtn).toBeVisible();

  // Assert actual plain text block is rendered
  const preText = page.locator('pre');
  await expect(preText).toBeVisible();
  const content = await preText.textContent();
  expect(content).not.toBeNull();
  expect(content).toContain('New Delhi, India');
  expect(content).toContain('Saturday, July 11, 2026');
  expect(content).toContain('Tithi: Dwadashi upto 02:04 AM, Jul 12');
  expect(content).toContain('Paksha: Krishna Paksha');
  expect(content).toContain('Weekday: Shanivara');
  expect(content).toContain('Moonsign: Vrishabha');
  expect(content).toContain('Sunsign: Mithuna');
});
