import { test, expect } from '@playwright/test';

test('biorhythm layout - date selector should be above the chart', async ({ page }) => {
  await page.goto('/biorhythm');

  // Wait for the content to load
  await expect(page.getByText('Personal Biorhythms')).toBeVisible();

  // The control bar should be visible even if DOB is not entered (it has a default '2000-01-01')
  // In BiorhythmClientPage.tsx, dob defaults to "2000-01-01"
  const controlBar = page.locator('div:has-text("Date of Birth")').first();
  const chartHeader = page.getByText('Cycle Overview (7 Days)');

  await expect(controlBar).toBeVisible();
  await expect(chartHeader).toBeVisible();

  const controlBarBox = await controlBar.boundingBox();
  const chartHeaderBox = await chartHeader.boundingBox();

  if (controlBarBox && chartHeaderBox) {
    expect(controlBarBox.y).toBeLessThan(chartHeaderBox.y);
  } else {
    throw new Error('Could not get bounding boxes for layout verification');
  }
});
