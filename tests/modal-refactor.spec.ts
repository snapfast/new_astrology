import { test, expect } from '@playwright/test';

test('BookConsultationModal text reduction', async ({ page }) => {
  await page.goto('/');

  // Verify the modal is not visible initially
  await expect(page.getByRole('heading', { name: 'Book Consultation', exact: true })).not.toBeVisible();

  await page.waitForTimeout(3000);

  // Open the modal by clicking the "Book a Consultation" button in the hero
  await page.locator('button', { hasText: /Book a Consultation/i }).first().click();

  // Verify the modal is visible by checking for the title
  await expect(page.getByRole('heading', { name: 'Book Consultation' })).toBeVisible();

  // Verify shortened English text
  await expect(page.getByText('Google Meet Session')).toBeVisible();
  await expect(page.getByText('30 Mins')).toBeVisible();
  await expect(page.getByText('Video is optional')).toBeVisible();
  await expect(page.getByText('1-on-1 session for deep chart analysis and remedies.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Schedule Now' })).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Donate' })).toBeVisible();

  // Verify motto is NOT visible
  await expect(page.getByText('Guided by the stars, Grounded in Truth')).not.toBeVisible();
});
