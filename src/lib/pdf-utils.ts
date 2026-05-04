import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Captures a DOM element and downloads it as a multi-page A4 PDF.
 * @param element The HTML element to capture.
 * @param fileName The name of the PDF file (without extension).
 */
export const downloadHoroscopePDF = async (element: HTMLElement, fileName: string) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 1.5, // Increased scale for better print quality
      useCORS: true,
      logging: false,
      windowWidth: 800, // Balanced width for A4
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Hide elements that shouldn't be in the PDF
        const elementsToHide = clonedDoc.querySelectorAll('.pdf-hide');
        elementsToHide.forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });

        // Show elements that should only be in the PDF
        const elementsToShow = clonedDoc.querySelectorAll('.pdf-only');
        elementsToShow.forEach((el) => {
          (el as HTMLElement).style.display = 'flex';
        });

        const clonedContent = (clonedDoc.querySelector('[data-pdf-content="true"]') ||
                             clonedDoc.body.firstElementChild) as HTMLElement;

        if (clonedContent) {
          // Force A4-friendly width (800px)
          clonedDoc.body.style.width = '800px';
          clonedDoc.body.style.overflow = 'visible';
          clonedContent.style.width = '800px';
          clonedContent.style.maxWidth = 'none';
          clonedContent.style.padding = '40px';
          clonedContent.style.margin = '0 auto';
          clonedContent.style.backgroundColor = '#ffffff';
          clonedContent.style.overflow = 'visible';

          // Remove all backgrounds and shadows for "minimal colors" and size reduction
          const containers = clonedContent.querySelectorAll('.shadow-sm, .bg-surface, .bg-surface-container-low, .bg-surface-container-high, .bg-surface-container-lowest, .bg-white, .max-w-4xl, .max-w-5xl, .max-w-2xl');
          containers.forEach((c) => {
            const el = c as HTMLElement;
            el.style.boxShadow = 'none';
            el.style.backgroundImage = 'none';
            el.style.backgroundColor = '#ffffff';
            el.style.maxWidth = 'none';
            el.style.width = '100%';
          });

          // Ensure borders are visible
          const bordered = clonedContent.querySelectorAll('.border, .border-outline, .border-outline\\/30, .border-outline\\/50');
          bordered.forEach((b) => {
            const el = b as HTMLElement;
            el.style.borderColor = '#E2E2E2';
            el.style.borderStyle = 'solid';
            el.style.borderWidth = '1px';
          });

          // Hide decorative elements
          const decorative = clonedContent.querySelectorAll('.blur-\\[100px\\]');
          decorative.forEach((d) => {
            (d as HTMLElement).style.display = 'none';
          });

          // Adjust charts for 800px width (2 columns -> ~350px each)
          const charts = clonedContent.querySelectorAll('.aspect-square');
          charts.forEach((chart) => {
            const chartEl = chart as HTMLElement;
            chartEl.style.width = '350px';
            chartEl.style.height = '350px';
            chartEl.style.padding = '15px';
            chartEl.style.borderRadius = '24px';
            chartEl.style.border = '1px solid #E2E2E2';
            chartEl.style.backgroundColor = '#ffffff';

            const svg = chartEl.querySelector('svg');
            if (svg) svg.style.overflow = 'visible';
          });

          // Ensure grid layout for charts
          const chartGrids = clonedContent.querySelectorAll('.grid');
          chartGrids.forEach((grid) => {
             const gridEl = grid as HTMLElement;
             if (gridEl.classList.contains('lg:grid-cols-2') || gridEl.querySelector('.aspect-square')) {
                gridEl.style.display = 'grid';
                gridEl.style.gridTemplateColumns = '1fr 1fr';
                gridEl.style.gap = '20px';
                gridEl.style.width = '100%';
             }
          });

          // Planetary positions table alignment for 800px
          const tables = clonedContent.querySelectorAll('table');
          tables.forEach((table) => {
            const tableEl = table as HTMLElement;
            const headers = tableEl.querySelectorAll('th');
            if (headers.length === 8) {
              tableEl.style.width = '100%';
              tableEl.style.tableLayout = 'fixed';
              tableEl.style.minWidth = '720px';
              const widths = ['15%', '8%', '12%', '14%', '12%', '15%', '15%', '9%'];
              headers.forEach((col, idx) => {
                if (widths[idx]) (col as HTMLElement).style.width = widths[idx];
              });
            }
          });
        }
      }
    });

    // PDF generation in A4 format
    const imgData = canvas.toDataURL('image/jpeg', 0.85);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add subsequent pages if content is longer than one A4 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
