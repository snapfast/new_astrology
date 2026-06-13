import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'home' },
  { path: '/panchang', name: 'panchang' },
  { path: '/biorhythm', name: 'biorhythm' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
  { path: '/reviews', name: 'reviews' },
  { path: '/contact', name: 'contact' },
];

for (const pageInfo of pages) {
  test(`verify ${pageInfo.name} page loads correctly`, async ({ page }) => {
    const response = await page.goto(pageInfo.path);
    expect(response?.status()).toBe(200);

    // Wait for hydration and network idle
    await page.waitForLoadState('networkidle');

    // Check for "Book Now" button to ensure basic layout is there (visible on desktop and mobile)
    await expect(page.getByRole('button', { name: /book now/i }).first()).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: `screenshots/${pageInfo.name}.png`, fullPage: true });
  });
}
