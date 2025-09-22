/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Get the direct grid children (columns)
  const grid = element.querySelector('.w-layout-grid');
  const gridChildren = grid ? grid.children : [];

  // --- Row 1: Block Name ---
  const headerRow = ['Hero (hero29)'];

  // --- Row 2: Background Image (optional) ---
  let bgImg = '';
  if (gridChildren.length > 0) {
    const img = gridChildren[0].querySelector('img');
    if (img) bgImg = img;
  }
  const bgImgRow = [bgImg];

  // --- Row 3: Title, Subheading, CTA ---
  let textCellContent = [];
  if (gridChildren.length > 1) {
    const textCol = gridChildren[1];
    // Gather all headings (h1-h6)
    const headings = textCol.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => textCellContent.push(h));
    // Gather all paragraphs
    const paragraphs = textCol.querySelectorAll('p');
    paragraphs.forEach(p => textCellContent.push(p));
    // Gather all CTAs (links or buttons)
    const buttonGroup = textCol.querySelector('.button-group');
    if (buttonGroup) {
      Array.from(buttonGroup.children).forEach(btn => textCellContent.push(btn));
    }
  }
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Compose table
  const cells = [headerRow, bgImgRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
