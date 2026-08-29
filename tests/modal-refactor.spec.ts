import { test, expect } from '@playwright/test';

test('BookConsultationModal text reduction', async ({ page }) => {
  await page.goto('/');

  // Verify the modal is not visible initially
  await expect(page.getByRole('heading', { name: 'Book Consultation', exact: true })).not.toBeVisible();

  // Open the modal by clicking the "Book Now" button in the navbar
  // The text might be case sensitive or wrapped in a way that getByRole needs more specific options
  await page.click('button:has-text("Book Now")');

  // Verify the modal is visible by checking for the title
  await expect(page.getByRole('heading', { name: 'Book Consultation', exact: true })).toBeVisible();

  // Verify shortened English text
  await expect(page.getByText('Google Meet Session')).toBeVisible();
  await expect(page.getByText('No phone needed')).not.toBeVisible();
  await expect(page.getByText('30 Mins', { exact: true })).toBeVisible();
  await expect(page.getByText('Video is optional')).toBeVisible();
  await expect(page.getByText('1-on-1 session for deep chart analysis and remedies.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Schedule Now' })).toBeVisible();
  await expect(page.getByText('Secure via Calendly')).toBeVisible();

  // Verify motto is NOT visible
  await expect(page.getByText('Guided by the stars, Grounded in Truth')).not.toBeVisible();
});
