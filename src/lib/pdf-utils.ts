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
          // Ensure the entire document is visible and sized correctly
          clonedDoc.body.style.width = '1200px';
          clonedDoc.body.style.overflow = 'visible';

          // Force a standard desktop width for consistent PDF layout regardless of screen size
          clonedContent.style.width = '1200px';
          clonedContent.style.maxWidth = 'none';
          clonedContent.style.padding = '60px';
          clonedContent.style.margin = '0 auto';
          clonedContent.style.backgroundColor = '#F9F9FB';
          clonedContent.style.overflow = 'visible';

          // Fix for text clipping and layout
          clonedContent.style.lineHeight = 'normal';
          clonedContent.style.display = 'block';

          // Remove responsive classes that might interfere
          clonedContent.classList.remove('pt-32', 'pb-24', 'px-4', 'sm:px-6', 'lg:px-8', 'max-w-7xl', 'mx-auto');

          // Ensure all charts are properly sized and NOT clipped
          const charts = clonedContent.querySelectorAll('.aspect-square');
          charts.forEach((chart) => {
            const chartEl = chart as HTMLElement;
            chartEl.style.width = '500px';
            chartEl.style.height = '500px';
            chartEl.style.display = 'block';
            chartEl.style.margin = '0 auto';
            chartEl.style.overflow = 'visible';
            chartEl.style.padding = '0';
            chartEl.style.borderRadius = '0';
            chartEl.style.border = 'none';

            const svg = chartEl.querySelector('svg');
            if (svg) {
              svg.style.overflow = 'visible';

              // Internal SVG adjustments to prevent planet label clipping
              const texts = svg.querySelectorAll('text');
              texts.forEach((textEl) => {
                const text = textEl as SVGTextElement;
                const isRasi = text.classList.contains('fill-accent');

                if (isRasi) {
                  // Adjust Rasi numbers: smaller font and better positioning
                  text.style.fontSize = '11px';
                  const y = parseFloat(text.getAttribute('y') || '0');
                  text.setAttribute('y', (y - 3).toString());
                } else {
                  // Adjust Planets: smaller font, multi-line if needed
                  text.style.fontSize = '14px';
                  const content = text.textContent || '';

                  if (content.includes(',')) {
                    const planets = content.split(',').map(s => s.trim());
                    if (planets.length > 3) {
                      const mid = Math.ceil(planets.length / 2);
                      const line1 = planets.slice(0, mid).join(', ');
                      const line2 = planets.slice(mid).join(', ');

                      const x = text.getAttribute('x') || '0';
                      const y = parseFloat(text.getAttribute('y') || '0');

                      // Clear and rebuild with tspans
                      text.textContent = '';

                      const tspan1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                      tspan1.setAttribute('x', x);
                      tspan1.setAttribute('dy', '-2');

                      // Preserve colors for planets
                      planets.slice(0, mid).forEach((p, i) => {
                        const s = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        s.textContent = p + (i < mid - 1 ? ', ' : '');
                        s.style.fill = p === 'As' ? '#9333EA' : '#991B1B';
                        tspan1.appendChild(s);
                      });

                      const tspan2 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                      tspan2.setAttribute('x', x);
                      tspan2.setAttribute('dy', '15');

                      planets.slice(mid).forEach((p, i) => {
                        const s = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        s.textContent = p + (i < planets.length - mid - 1 ? ', ' : '');
                        s.style.fill = p === 'As' ? '#9333EA' : '#991B1B';
                        tspan2.appendChild(s);
                      });

                      text.appendChild(tspan1);
                      text.appendChild(tspan2);
                    } else {
                      // Just fix colors for single line with multiple planets
                      const x = text.getAttribute('x') || '0';
                      text.textContent = '';
                      planets.forEach((p, i) => {
                        const s = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                        s.textContent = p + (i < planets.length - 1 ? ', ' : '');
                        s.style.fill = p === 'As' ? '#9333EA' : '#991B1B';
                        text.appendChild(s);
                      });
                    }
                  } else {
                    // Single planet color fix
                    const p = content.trim();
                    text.style.fill = p === 'As' ? '#9333EA' : '#991B1B';
                  }
                }
              });
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
