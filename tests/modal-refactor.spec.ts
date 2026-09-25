import { test, expect } from '@playwright/test';

test('BookConsultationModal text reduction', async ({ page }) => {
  await page.goto('/book-astrology-reading-online');

  // Verify booking page contents and consultation details
  await expect(page.getByRole('heading', { name: 'Book Astrology Reading Online' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Personalised Birth Chart Reading' })).toBeVisible();
  await expect(page.getByText('1-Hour 1-on-1 Consultation')).toBeVisible();
  await expect(page.getByText('Schedule Reading on Calendly').first()).toBeVisible();
});
