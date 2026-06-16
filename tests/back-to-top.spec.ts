import { test, expect } from '@playwright/test';

test('BackToTop button visibility and localization', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Pandit Rahul Bali Ji')).toBeVisible();

  // Find the button by its icon content since it's unique
  const backToTop = page.locator('button').filter({ has: page.locator('span:text("arrow_upward")') });

  // Initial state: hidden
  await expect(backToTop).toHaveClass(/opacity-0/);

  // Scroll down to make it visible
  await page.evaluate(() => window.scrollTo(0, 1000));
  // Wait for throttle and transition
  await expect(backToTop).toHaveClass(/opacity-100/);
  await expect(backToTop).toBeVisible();

  // Check English label
  await expect(backToTop).toHaveAttribute('aria-label', 'Back to Top');
  await expect(backToTop).toHaveAttribute('title', 'Back to Top');

  // Switch to Hindi
  const hindiToggle = page.locator('button[aria-label="हिन्दी"]').first();
  await hindiToggle.click();

  // Check Hindi label
  await expect(backToTop).toHaveAttribute('aria-label', 'ऊपर वापस जाएँ');
  await expect(backToTop).toHaveAttribute('title', 'ऊपर वापस जाएँ');

  // Click to scroll top
  await backToTop.click();

  // Wait for scroll and transition
  await page.waitForFunction(() => window.scrollY === 0);
  await expect(backToTop).toHaveClass(/opacity-0/);
});
