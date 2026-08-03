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

test('Compact page Vimshottari Dasha section arrangement and static rendering', async ({ page }) => {
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

  // Verify dasha columns are rendered as static divs, not buttons
  const dashaButtons = page.locator('.condensed-dasha .miller-container button');
  await expect(dashaButtons).toHaveCount(0);

  // Verify dasha columns contains some static items
  const dashaItems = page.locator('.condensed-dasha .miller-container div');
  await expect(dashaItems.first()).toBeVisible();
});
