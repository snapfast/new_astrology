import { test, expect } from '@playwright/test';

test.describe('Favicon & Icon Assets', () => {
  test('icon.svg is served with correct content type and valid SVG body', async ({ request }) => {
    const response = await request.get('/icon.svg');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg+xml');

    const body = await response.text();
    expect(body).toContain('<svg');
    expect(body).toContain('baliFaviconGrad');
    expect(body).toContain('#FF5900');
  });

  test('Homepage head includes favicon link tags', async ({ page }) => {
    await page.goto('/');
    const iconLinks = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').all();
    expect(iconLinks.length).toBeGreaterThan(0);

    const hrefs = await Promise.all(iconLinks.map(link => link.getAttribute('href')));
    const hasIconSvg = hrefs.some(href => href && href.includes('icon.svg'));
    expect(hasIconSvg).toBe(true);
  });
});
