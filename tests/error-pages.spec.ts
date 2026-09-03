import { test, expect } from '@playwright/test';

test('404 page displays correctly in English', async ({ page }) => {
  await page.goto('/non-existent-page');

  // Check for the English title
  await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();

  // Check for the English subtitle
  await expect(page.getByText('Not Found', { exact: true })).toBeVisible();

  // Check for the "Back to Home" button
  const backButton = page.getByRole('link', { name: 'Back to Home' });
  await expect(backButton).toBeVisible();
  await expect(backButton).toHaveAttribute('href', '/');
});
