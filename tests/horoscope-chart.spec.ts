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
  const degreeElements = page.locator('svg foreignObject .text-\\[8px\\].text-on-surface');
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
  const tableDegrees = await page.locator('table tbody tr td:nth-child(4)').allTextContents();
  console.log('Table degree texts:', tableDegrees);

  // Each degree in the table must contain seconds (e.g., "11° 24' 45\"")
  for (const text of tableDegrees) {
    if (text) {
      expect(text).toMatch(/^\d+°\s*\d+'\s*\d+"$/);
    }
  }
});
