import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Captures a DOM element and downloads it as a PDF.
 * @param element The HTML element to capture.
 * @param fileName The name of the PDF file (without extension).
 */
export const downloadHoroscopePDF = async (element: HTMLElement, fileName: string) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      windowWidth: 1200, // Ensure desktop-like rendering
      backgroundColor: '#F9F9FB', // Matching site background (bg-surface)
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

        // Robust element selection for the main content in the cloned document
        const clonedContent = (clonedDoc.querySelector('[data-pdf-content="true"]') ||
                             clonedDoc.body.firstElementChild) as HTMLElement;

        if (clonedContent) {
          // Force a standard desktop width for consistent PDF layout regardless of screen size
          clonedContent.style.width = '1200px';
          clonedContent.style.maxWidth = 'none';
          clonedContent.style.padding = '60px';
          clonedContent.style.margin = '0 auto';
          clonedContent.style.backgroundColor = '#F9F9FB';

          // Fix for text clipping and layout
          clonedContent.style.lineHeight = 'normal';
          clonedContent.style.display = 'block';

          // Remove responsive classes that might interfere
          clonedContent.classList.remove('pt-32', 'pb-24', 'px-4', 'sm:px-6', 'lg:px-8', 'max-w-7xl', 'mx-auto');

          // Ensure all charts are properly sized and square
          const charts = clonedContent.querySelectorAll('.aspect-square');
          charts.forEach((chart) => {
            const chartEl = chart as HTMLElement;
            chartEl.style.width = '500px';
            chartEl.style.height = '500px';
            chartEl.style.display = 'block';
            chartEl.style.margin = '0 auto';

            const svg = chartEl.querySelector('svg');
            if (svg) {
              svg.style.width = '500px';
              svg.style.height = '500px';
            }
          });

          // Handle table overflow - remove scrollbars and show full content
          const tableContainers = clonedContent.querySelectorAll('.overflow-x-auto');
          tableContainers.forEach((container) => {
            const containerEl = container as HTMLElement;
            containerEl.style.overflow = 'visible';
            containerEl.style.display = 'block';
            containerEl.style.width = '100%';
            containerEl.style.maxWidth = 'none';
          });

          // Ensure tables take full width and don't shrink
          const tables = clonedContent.querySelectorAll('table');
          tables.forEach((table) => {
            const tableEl = table as HTMLElement;
            tableEl.style.width = '100%';
            tableEl.style.tableLayout = 'auto';
            tableEl.style.minWidth = '1000px'; // Ensure table is wide enough for all columns
          });

          // Force grid layout for charts to be 2 columns if width is 1200px
          const chartGrids = clonedContent.querySelectorAll('.grid');
          chartGrids.forEach((grid) => {
             const gridEl = grid as HTMLElement;
             if (gridEl.classList.contains('lg:grid-cols-2')) {
                gridEl.style.display = 'grid';
                gridEl.style.gridTemplateColumns = 'repeat(2, 1fr)';
                gridEl.style.gap = '48px';
             }
          });
        }
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
