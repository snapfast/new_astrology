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

});
