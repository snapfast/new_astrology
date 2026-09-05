import { test, expect } from '@playwright/test';

test('ChartGeneration handles Nominatim API error gracefully', async ({ page }) => {
  // Mock the Nominatim API to return a 500 error
  await page.route('https://nominatim.openstreetmap.org/search*', async (route) => {
    await route.fulfill({
      status: 500,
      body: 'Internal Server Error',
    });
  });

  // Intercept console.error to verify the error is logged as expected
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Navigate to a page with ChartGeneration (e.g., Free Horoscope page)
  await page.goto('/free-horoscope');

  // Fill in the Place of Birth input to trigger the API call
  const pobInput = page.locator('input[name="pob"]');
  await pobInput.fill('InvalidCityTest123');

  // The component uses a 500ms debounce before fetching
  await page.waitForTimeout(1000);

  // The UI shouldn't show the loading state indefinitely or crash.
  // The listbox for suggestions shouldn't be visible (since there are no suggestions and it's not loading).
  const combobox = page.locator('div[aria-controls="suggestions-listbox"]');
  const ariaExpanded = await combobox.getAttribute('aria-expanded');
  expect(ariaExpanded).toBe('false');

  // Assert that console.error caught the mock error
  const hasNominatimError = consoleErrors.some(err => err.includes('Error fetching cities:'));
  expect(hasNominatimError).toBe(true);

  // Assert that there's no visible suggestion list
  const listbox = page.locator('ul[id="suggestions-listbox"]');
  await expect(listbox).toHaveCount(0);
});
