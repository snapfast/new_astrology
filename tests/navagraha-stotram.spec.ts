import { test, expect } from '@playwright/test';

test.describe('Navagraha Stotram Page', () => {
  test('should render the stotram page with all 12 verses and proper text', async ({ page }) => {
    await page.goto('/navagraha-stotram');

    // Verify Title & Subtitle
    await expect(page).toHaveTitle(/Navagraha Stotram \| Bali Astrology/);
    const headerHeading = page.locator('h1');
    await expect(headerHeading).toContainText('नवग्रहस्तोत्रम्');

    // Verify first verse: Surya (Japā-kusuma)
    await expect(page.locator('text=जपाकुसुमसङ्काशं काश्यपेयं महाद्युतिम्।')).toBeVisible();
    await expect(page.locator('text=तमोरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥१॥')).toBeVisible();

    // Verify Chandra
    await expect(page.locator('text=दधिशङ्खतुषाराभं क्षीरोदार्णवसम्भवम्।')).toBeVisible();

    // Verify Mangala
    await expect(page.locator('text=धरणीगर्भसम्भूतं विद्युत्कान्तिसमप्रभम्।')).toBeVisible();

    // Verify Budha
    await expect(page.locator('text=प्रियङ्गुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।')).toBeVisible();

    // Verify Brihaspati
    await expect(page.locator('text=देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।')).toBeVisible();

    // Verify Shukra
    await expect(page.locator('text=हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।')).toBeVisible();

    // Verify Shani
    await expect(page.locator('text=नीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम्।')).toBeVisible();

    // Verify Rahu & Ketu
    await expect(page.locator('text=अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।')).toBeVisible();
    await expect(page.locator('text=पलाशपुष्पसङ्काशं तारकाग्रहमस्तकम्।')).toBeVisible();

    // Verify Phalashruti verses
    await expect(page.locator('text=इति व्यासमुखोद्गीतं यः पठेत् सुसमाहितः।')).toBeVisible();
    await expect(page.locator('text=नरनारीनृपाणां च भवेद् दुःस्वप्ननाशनम्।')).toBeVisible();
    await expect(page.locator('text=ग्रहनक्षत्रजाः पीडास्तस्कराग्निसमुद्भवाः।')).toBeVisible();

    // Verify concluding line
    await expect(page.locator('text=॥ इति श्रीव्यासविरचितं नवग्रहस्तोत्रं सम्पूर्णम् ॥')).toBeVisible();

    // Verify Sacred Mantra
    await expect(page.locator('text=॥ ॐ नमो भगवते वासुदेवाय नमः ॥')).toBeVisible();

    // Verify all 12 verse cards are rendered
    for (let i = 1; i <= 9; i++) {
      await expect(page.locator(`#graha-${i}`)).toBeVisible();
    }
    for (let i = 10; i <= 12; i++) {
      await expect(page.locator(`#phala-${i}`)).toBeVisible();
    }
  });

  test('should verify footer link to navagraha stotram', async ({ page }) => {
    await page.goto('/');

    const footerLink = page.locator('footer a[href="/navagraha-stotram"]');
    await expect(footerLink).toBeVisible();
  });
});
