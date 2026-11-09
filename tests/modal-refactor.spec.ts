import { test, expect } from '@playwright/test';

test('BookConsultationModal text reduction and booking page enhancements', async ({ page }) => {
  await page.goto('/book-astrology-reading-online');

  // Verify booking page contents and consultation details
  await expect(page.getByRole('heading', { name: 'Personalised Birth Chart Reading' })).toBeVisible();
  await expect(page.getByText('30 Minutes Consultation')).toBeVisible();
  await expect(page.getByText('Schedule Reading on Calendly').first()).toBeVisible();

  // Verify updated scheduling guidance sequence
  await expect(page.getByText('Pick a convenient date, time slot, and consultation type')).toBeVisible();
  await expect(page.getByText('Complete the recommended Dakshina')).toBeVisible();

  // Verify newly added Frequently Asked Questions
  await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();
  await expect(page.getByText('What if I do not have my exact birth time?')).toBeVisible();
  await expect(page.getByText('Is my consultation private and confidential?')).toBeVisible();
  await expect(page.getByText('Can I ask about specific life areas or family members?')).toBeVisible();
  await expect(page.getByText('How will I receive the meeting link or recording?')).toBeVisible();
});

test('Homepage, Reviews, and Horoscope CTA buttons link directly to booking page', async ({ page }) => {
  // Test Homepage Expert Consultations CTA link
  await page.goto('/');
  const homeBookLink = page.getByRole('link', { name: 'Book Your Consultation Now' });
  await expect(homeBookLink).toBeVisible();
  await expect(homeBookLink).toHaveAttribute('href', '/book-astrology-reading-online');

  // Test Reviews page CTA link
  await page.goto('/reviews');
  const reviewsBookLink = page.getByRole('link', { name: 'Book Personal Session', exact: true });
  await expect(reviewsBookLink).toBeVisible();
  await expect(reviewsBookLink).toHaveAttribute('href', '/book-astrology-reading-online');
});
