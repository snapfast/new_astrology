import { test, expect } from '@playwright/test';

test('Testimonials section update verification', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Verify that the old description is NOT present
  const oldDesc = page.getByText('Hear from those who have transformed their lives', { exact: false });
  await expect(oldDesc).not.toBeVisible();

  // Verify Google Reviews link
  const googleLink = page.getByRole('link', { name: 'View on Google' });
  await expect(googleLink).toBeVisible();
  await expect(googleLink).toHaveAttribute('href', 'https://maps.app.goo.gl/siGBPsmRpAU6mbYJ7');
  await expect(googleLink).toHaveAttribute('target', '_blank');

  // Verify Hindi version
  await page.click('button[aria-label="हिन्दी"]');
  await page.waitForLoadState('networkidle');

  // Verify that the old Hindi description is NOT present
  const oldDescHindi = page.getByText('उन लोगों से सुनें जिन्होंने खगोलीय संरेखण', { exact: false });
  await expect(oldDescHindi).not.toBeVisible();

  // Verify Hindi Google Reviews link
  const googleLinkHindi = page.getByRole('link', { name: 'गूगल पर देखें' });
  await expect(googleLinkHindi).toBeVisible();
});
