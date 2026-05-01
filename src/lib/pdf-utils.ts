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

        // Add some padding to the cloned element for better layout in PDF
        // Since clonedDoc is a clone of the specific element if we pass contentRef.current,
        // we check both the document body's first child (the cloned element) and querySelector.
        const clonedElement = clonedDoc.querySelector(`[data-pdf-content="true"]`) ||
                             (clonedDoc.body.firstElementChild?.getAttribute('data-pdf-content') === 'true'
                              ? clonedDoc.body.firstElementChild
                              : null);

        if (clonedElement) {
          (clonedElement as HTMLElement).style.padding = '40px';
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
