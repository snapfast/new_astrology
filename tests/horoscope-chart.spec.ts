import { test, expect } from '@playwright/test';

test('Compact Kundli Chart renders correctly and trims degrees inside the chart while preserving seconds in the table', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript(() => {
    window.localStorage.setItem('moonine_popup_last_shown', String(Date.now()));
  });

  // Set desktop viewport to avoid mobile blocker overlay
  await page.setViewportSize({ width: 1280, height: 800 });

  // Navigate directly using populated query parameters (Delhi coords)
  await page.goto('/horoscope/compact?name=Rahul&dob=1990-10-15&tob=12:30&pob=Delhi&lat=28.6139&lon=77.2090');
  await page.waitForLoadState('networkidle');

  // Verify we can find the SVGs of the charts
  const svgCharts = page.locator('svg');
  await expect(svgCharts.first()).toBeVisible();

  // Find the small degree text elements inside the chart SVG using the tailwind class
  const degreeElements = page.locator('svg foreignObject .text-\\[8px\\]');
  const degreeTexts = await degreeElements.allTextContents();

  console.log('Chart degree texts:', degreeTexts);

  // Ensure we actually found some chart degree texts on desktop
  expect(degreeTexts.length).toBeGreaterThan(0);

  // Ensure degrees inside the chart are trimmed to degrees and minutes (e.g., "15° 30'") and DO NOT contain seconds (e.g. "45\"")
  for (const text of degreeTexts) {
    if (text) {
      expect(text).toMatch(/^\d+°\s*\d+'$/);
      expect(text).not.toContain('"');
    }
  }

  // Ensure the planetary table on the right side STILL contains high-precision seconds
  // Narrow the locator specifically to the Planetary Positions table
  const tableDegrees = await page.locator('section:has-text("Planetary Positions") table tbody tr td:nth-child(4)').allTextContents();
  console.log('Table degree texts:', tableDegrees);

  // Each degree in the table must contain seconds (e.g., "11° 24' 45\"")
  for (const text of tableDegrees) {
    if (text) {
      expect(text).toMatch(/^\d+°\s*\d+'\s*\d+"$/);
    }
  }

  // Verify retrograde asterisk size (should be increased to text-[14px])
  const retroElements = page.locator('svg foreignObject span:has-text("*")');
  const retroCount = await retroElements.count();
  console.log(`Found ${retroCount} retrograde planet markers in chart`);
  for (let i = 0; i < retroCount; i++) {
    const retroClass = await retroElements.nth(i).getAttribute('class');
    expect(retroClass).toContain('text-[14px]');
  }

  // Verify combust caret size (should remain text-[10px])
  const combustElements = page.locator('svg foreignObject span:has-text("^")');
  const combustCount = await combustElements.count();
  console.log(`Found ${combustCount} combust planet markers in chart`);
  for (let i = 0; i < combustCount; i++) {
    const combustClass = await combustElements.nth(i).getAttribute('class');
    expect(combustClass).toContain('text-[10px]');
  }
});

test('Compact page Vimshottari Dasha section arrangement and keyboard accessibility', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript(() => {
    window.localStorage.setItem('moonine_popup_last_shown', String(Date.now()));
  });

  // Set desktop viewport to avoid mobile blocker overlay
  await page.setViewportSize({ width: 1280, height: 800 });

  // Navigate directly using populated query parameters (Delhi coords)
  await page.goto('/horoscope/compact?name=Rahul&dob=1990-10-15&tob=12:30&pob=Delhi&lat=28.6139&lon=77.2090');
  await page.waitForLoadState('networkidle');

  // Verify Vimshottari Dasha card title is visible
  const dashaHeader = page.locator('section:has-text("Vimshottari Dasha")');
  await expect(dashaHeader.first()).toBeVisible();

  // Verify dasha columns are rendered as buttons for keyboard accessibility
  const dashaButtons = page.locator('.condensed-dasha .miller-container button');
  await expect(dashaButtons.first()).toBeVisible();

  // Inspect the first dasha button attributes
  const firstButton = dashaButtons.first();
  await expect(firstButton).toHaveAttribute('type', 'button');
  await expect(firstButton).toHaveAttribute('aria-pressed');

  // Verify that the right scroll button is visible since 4 columns of 142px each (568px) exceed the 400px container width
  const scrollRightBtn = page.locator('button[aria-label="Scroll right"]');
  await expect(scrollRightBtn).toBeVisible();

  // Click the scroll right button and verify we can scroll
  await scrollRightBtn.click();
  await page.waitForTimeout(500); // Wait for smooth scroll

  // Verify that the left scroll button is now visible after scrolling right
  const scrollLeftBtn = page.locator('button[aria-label="Scroll left"]');
  await expect(scrollLeftBtn).toBeVisible();

  // Click scroll left to go back
  await scrollLeftBtn.click();
  await page.waitForTimeout(500); // Wait for smooth scroll
});

test('Compact page language switching, New Chart link, and action styling validation', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript(() => {
    window.localStorage.setItem('moonine_popup_last_shown', String(Date.now()));
  });

  // Set desktop viewport
  await page.setViewportSize({ width: 1280, height: 800 });

  // Navigate directly using populated query parameters (Delhi coords)
  await page.goto('/horoscope/compact?name=Rahul&dob=1990-10-15&tob=12:30&pob=Delhi&lat=28.6139&lon=77.2090');
  await page.waitForLoadState('networkidle');

  // 1. Verify 'New Chart' link is visible and contains correct text and icon
  const newChartLink = page.locator('header a[href="/free-horoscope"]');
  await expect(newChartLink).toBeVisible();
  await expect(newChartLink).toContainText('New Chart');
  await expect(newChartLink).toHaveClass(/bg-accent/);

  // 2. Verify segmented language toggle is visible and English button is currently active
  const enToggleBtn = page.locator('button[aria-label="English"]');
  const hiToggleBtn = page.locator('button[aria-label="हिन्दी"]');
  await expect(enToggleBtn).toBeVisible();
  await expect(hiToggleBtn).toBeVisible();
  await expect(enToggleBtn).toHaveAttribute('aria-pressed', 'true');

  // 3. Switch language to Hindi
  await hiToggleBtn.click();
  await page.waitForTimeout(500); // Wait for translation updates

  // Verify lang state has changed and translations updated (e.g., 'New Chart' becomes 'नई कुंडली')
  await expect(hiToggleBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(newChartLink).toContainText('नई कुंडली');

  // 4. Switch back to English
  await enToggleBtn.click();
  await page.waitForTimeout(500); // Wait for translation updates
  await expect(enToggleBtn).toHaveAttribute('aria-pressed', 'true');
  await expect(newChartLink).toContainText('New Chart');
});
