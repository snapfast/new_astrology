import { test, expect } from '@playwright/test';

test('Additional Vargas collapsible section is minimal, has correct layout and padding, and matches outside charts', async ({ page }) => {
  // Prevent matchmaking popup
  await page.addInitScript(() => {
    window.localStorage.setItem('moonine_popup_last_shown', String(Date.now()));
  });

  // Set desktop viewport to avoid mobile blocker overlay
  await page.setViewportSize({ width: 1280, height: 800 });

  // Navigate directly to the main horoscope page
  await page.goto('/horoscope?name=Rahul&dob=1990-10-15&tob=12:30&pob=Delhi&lat=28.6139&lon=77.2090');
  await page.waitForLoadState('networkidle');

  // Find the collapsible toggle button
  const toggleButton = page.locator('button[aria-controls="more-vargas-container"]');
  await expect(toggleButton).toBeVisible();

  // Verify the title section button is styled minimally
  // - No background class (not using bg-surface-container-low)
  // - No padding class like px-6
  const buttonClass = await toggleButton.getAttribute('class') || '';
  expect(buttonClass).not.toContain('bg-surface-container-low');
  expect(buttonClass).not.toContain('px-6');
  expect(buttonClass).toContain('px-0');
  expect(buttonClass).toContain('py-3');
  expect(buttonClass).toContain('text-on-surface/70');

  // Verify the outer container does not have border class border-outline/50 or bg-white or shadow-sm
  const parentContainer = page.locator('div:has(> button[aria-controls="more-vargas-container"])');
  const parentClass = await parentContainer.getAttribute('class') || '';
  expect(parentClass).not.toContain('border-outline/50');
  expect(parentClass).not.toContain('bg-white');
  expect(parentClass).not.toContain('shadow-sm');
  expect(parentClass).toContain('w-full');

  // Click to expand the container
  await toggleButton.click();

  // Find the container itself
  const vargasContainer = page.locator('#more-vargas-container');
  await expect(vargasContainer).toBeVisible();

  // Verify that padding p-6 or md:p-8 has been removed so charts take full space
  const containerClass = await vargasContainer.getAttribute('class') || '';
  expect(containerClass).not.toContain('p-6');
  expect(containerClass).not.toContain('md:p-8');
  expect(containerClass).not.toContain('border-t');
  expect(containerClass).toContain('px-0');

  // Verify the grid inside matches the outside layout (lg:grid-cols-2 instead of md:grid-cols-2)
  const gridContainer = vargasContainer.locator('> .grid');
  const gridClass = await gridContainer.getAttribute('class') || '';
  expect(gridClass).toContain('lg:grid-cols-2');
  expect(gridClass).not.toContain('md:grid-cols-2');

  // Verify the individual chart headings have text-2xl and border-outline matching outside charts
  const innerHeadings = vargasContainer.locator('h2');
  const headingsCount = await innerHeadings.count();
  expect(headingsCount).toBeGreaterThan(0);

  for (let i = 0; i < headingsCount; i++) {
    const headingClass = await innerHeadings.nth(i).getAttribute('class') || '';
    expect(headingClass).toContain('text-2xl');
    expect(headingClass).toContain('border-outline');
    expect(headingClass).not.toContain('text-xl');
    expect(headingClass).not.toContain('border-outline/30');
  }

  // Verify the last chart (D45) spans 2 columns on lg screens correctly
  const lastChartWrapper = vargasContainer.locator('> .grid > div').last();
  const lastChartClass = await lastChartWrapper.getAttribute('class') || '';
  expect(lastChartClass).toContain('lg:col-span-2');
  expect(lastChartClass).not.toContain('md:col-span-2');
});
