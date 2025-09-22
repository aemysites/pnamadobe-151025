/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.children || element.children.length === 0) return;

  const headerRow = ['Carousel (carousel1)'];

  const slideDivs = element.querySelectorAll(':scope > div');

  // Always create two columns per row: [image, textContent (empty if not present)]
  const rows = Array.from(slideDivs).map((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (!img) return null;
    // No text content in this HTML, so second cell is always empty
    return [img, ''];
  }).filter(Boolean);

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
