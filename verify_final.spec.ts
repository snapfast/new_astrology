import { test, expect } from '@playwright/test';

test('verify final 1000px 2-column layout', async ({ page }) => {
  await page.goto('http://localhost:3009/horoscope?name=Final%20Verification&dob=1990-01-01&tob=12:00&lat=28.6139&lon=77.2090&place=New%20Delhi');
  await page.waitForSelector('[data-pdf-content="true"]');

  await page.evaluate(() => {
    const clonedContent = document.querySelector('[data-pdf-content="true"]') as HTMLElement;
    if (clonedContent) {
      document.body.style.width = '1000px';
      document.body.style.backgroundColor = '#ffffff';

      clonedContent.style.width = '1000px';
      clonedContent.style.padding = '40px';
      clonedContent.style.margin = '0 auto';
      clonedContent.style.backgroundColor = '#ffffff';

      const containers = clonedContent.querySelectorAll('.shadow-sm, .bg-surface, .bg-surface-container-low, .bg-surface-container-high, .bg-surface-container-lowest');
      containers.forEach((c) => {
        const el = c as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.backgroundImage = 'none';
        if (el.classList.contains('bg-surface-container-low')) el.style.backgroundColor = '#F2F2F7';
        else if (el.classList.contains('bg-surface-container-high')) el.style.backgroundColor = '#E5E5EA';
      });

      const charts = clonedContent.querySelectorAll('.aspect-square');
      charts.forEach((chart) => {
        const chartEl = chart as HTMLElement;
        chartEl.style.width = '450px';
        chartEl.style.height = '450px';
        chartEl.style.borderRadius = '32px';
        chartEl.style.border = '1px solid #E2E2E2';
      });

      const chartGrids = clonedContent.querySelectorAll('.grid');
      chartGrids.forEach((grid) => {
         const gridEl = grid as HTMLElement;
         if (gridEl.classList.contains('lg:grid-cols-2') || gridEl.querySelector('.aspect-square')) {
            gridEl.style.display = 'grid';
            gridEl.style.gridTemplateColumns = '1fr 1fr';
            gridEl.style.gap = '30px';
            gridEl.style.width = '100%';
         }
      });

      const tables = clonedContent.querySelectorAll('table');
      tables.forEach((table) => {
        const tableEl = table as HTMLElement;
        if (tableEl.querySelectorAll('th').length === 8) {
          tableEl.style.width = '100%';
          tableEl.style.tableLayout = 'fixed';
          tableEl.style.minWidth = '920px';
        }
      });

      document.querySelector('nav')?.remove();
      document.querySelector('footer')?.remove();
    }
  });

  await page.screenshot({ path: 'final_layout_verification.png', fullPage: true });
});
