import { test, expect } from '@playwright/test';

test('FAQ page renders correctly and supports translation', async ({ page }) => {
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
  await expect(page.getByRole('heading', { name: 'What is the Panch Pakshi (or Panch Oakshi) Astrology system?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'How does the Biorhythm (or Biothytm) tracker assist in self-awareness?' })).toBeVisible();

  // Toggle language to Hindi
  // Locate mobile or desktop language switch but let's click 'हि' button
  const hindiBtn = page.locator('button:has-text("हि")').first();
  await hindiBtn.click();

  // Wait for translation to apply
  await expect(page.locator('h1')).toContainText('अक्सर पूछे जाने वाले प्रश्न');

  // Go back to the Vargas tab (which translates to Hindi list)
  await page.click('button:has-text("17 वर्ग कुंडली निर्देशिका")');
  await expect(page.getByText('लग्न कुंडली', { exact: true })).toBeVisible();
  await expect(page.getByText('नवांश कुंडली', { exact: true })).toBeVisible();
});
