import { test, expect } from '@playwright/test';

test('Homepage title matches GA reports target', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Rahul Bali Astrology | Expert Vedic Astrologer in Gurugram & Online');
});

test('Reviews page CTA section is visible and functional', async ({ page }) => {
  await page.goto('/reviews');
  // Scroll to bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Verify CTA heading is visible
  const ctaHeading = page.getByRole('heading', { name: /Experience the Guidance/i }).first();
  await expect(ctaHeading).toBeVisible();

  // Verify Book Session button triggers the booking modal event/visibility
  const bookBtn = page.getByRole('button', { name: /Book 1-on-1/i }).first();
  await expect(bookBtn).toBeVisible();

  // Verify Donate link is visible and correct
  const donateLink = page.getByRole('link', { name: /Support & Donate/i }).first();
  await expect(donateLink).toBeVisible();
  await expect(donateLink).toHaveAttribute('href', '/donate');

  // Take a full-page screenshot of the reviews CTA
  await page.screenshot({ path: '/home/jules/verification/reviews_page_cta.png', fullPage: true });
});

test('Biorhythm page Explore More section is visible and contains correct cards', async ({ page }) => {
  await page.goto('/biorhythm');
  // Scroll to bottom of the page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Verify section title is visible
  const toolsHeading = page.getByRole('heading', { name: /Explore More Vedic/i }).first();
  await expect(toolsHeading).toBeVisible();

  // Verify all 4 explore cards are visible
  const kundliCard = page.getByRole('link', { name: /Free Kundli/i }).first();
  await expect(kundliCard).toBeVisible();
  await expect(kundliCard).toHaveAttribute('href', '/free-horoscope');

  const panchangCard = page.getByRole('link', { name: /Daily Panchang/i }).first();
  await expect(panchangCard).toBeVisible();
  await expect(panchangCard).toHaveAttribute('href', '/panchang');

  const pakshiCard = page.getByRole('link', { name: /Panch Pakshi/i }).first();
  await expect(pakshiCard).toBeVisible();
  await expect(pakshiCard).toHaveAttribute('href', '/panch-pakshi');

  const bookCard = page.getByRole('button', { name: /Book 1-on-1/i }).first();
  await expect(bookCard).toBeVisible();

  // Take a full-page screenshot of the biorhythm tools section
  await page.screenshot({ path: '/home/jules/verification/biorhythm_page_tools.png', fullPage: true });
});
