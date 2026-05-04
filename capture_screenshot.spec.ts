import { test } from '@playwright/test';

test('capture a4 layout screenshot', async ({ page }) => {
  await page.goto('http://localhost:3004/horoscope?name=A4+Screenshot&dob=1990-01-01&tob=12:00&lat=28.6139&lon=77.2090&pob=New+Delhi');
  await page.waitForSelector('[data-pdf-content="true"]');

  await page.evaluate(() => {
    const content = document.querySelector('[data-pdf-content="true"]') as HTMLElement;
    if (!content) return;
    content.style.width = '800px';
    content.style.maxWidth = 'none';
    content.style.padding = '40px';
    content.style.margin = '0 auto';
    content.style.backgroundColor = '#ffffff';

    const containers = content.querySelectorAll('.shadow-sm, .bg-surface, .bg-surface-container-low, .bg-surface-container-high, .bg-surface-container-lowest, .bg-white');
    containers.forEach((c) => {
      (c as HTMLElement).style.boxShadow = 'none';
      (c as HTMLElement).style.backgroundColor = '#ffffff';
    });

    const grids = content.querySelectorAll('.grid');
    grids.forEach((grid) => {
       const gridEl = grid as HTMLElement;
       if (gridEl.classList.contains('lg:grid-cols-2')) {
          gridEl.style.display = 'grid';
          gridEl.style.gridTemplateColumns = '1fr 1fr';
          gridEl.style.gap = '20px';
       }
    });

    const charts = content.querySelectorAll('.aspect-square');
    charts.forEach((chart) => {
      (chart as HTMLElement).style.width = '350px';
      (chart as HTMLElement).style.height = '350px';
    });

    const hide = document.querySelectorAll('.pdf-hide');
    hide.forEach(el => (el as HTMLElement).style.display = 'none');

    const show = document.querySelectorAll('.pdf-only');
    show.forEach(el => (el as HTMLElement).style.display = 'flex');
  });

  await page.setViewportSize({ width: 900, height: 1600 });
  await page.screenshot({ path: 'a4_pdf_screenshot.png', fullPage: true });
});
