/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a given element
  function getDirectChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag);
  }

  // 1. Get the main container (skip section)
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // 2. Get the first grid (headline + intro + author + button)
  const grids = container.querySelectorAll(':scope > .grid-layout');
  const firstGrid = grids[0];
  if (!firstGrid) return;

  // 2a. Left column: headline block
  const headlineBlock = firstGrid.children[0];
  // 2b. Right column: intro, author, button
  const rightBlock = firstGrid.children[1];

  // Compose left cell: eyebrow + h1
  const leftCellContent = [];
  if (headlineBlock) {
    // Eyebrow
    const eyebrow = headlineBlock.querySelector('.eyebrow');
    if (eyebrow) leftCellContent.push(eyebrow);
    // Headline
    const h1 = headlineBlock.querySelector('h1');
    if (h1) leftCellContent.push(h1);
  }

  // Compose right cell: paragraph, author, button
  const rightCellContent = [];
  if (rightBlock) {
    // Paragraph
    const paragraph = rightBlock.querySelector('.rich-text');
    if (paragraph) rightCellContent.push(paragraph);
    // Author block (avatar + name + meta)
    const authorGrid = rightBlock.querySelector('.w-layout-grid.grid-layout');
    if (authorGrid) {
      // Avatar + author info
      const authorRow = authorGrid.children[0];
      if (authorRow) {
        const avatar = authorRow.querySelector('.avatar img');
        const authorInfo = authorRow.querySelector('div:not(.avatar)');
        const authorMeta = authorInfo ? authorInfo : null;
        if (avatar) rightCellContent.push(avatar);
        if (authorMeta) rightCellContent.push(authorMeta);
      }
      // Button
      const button = authorGrid.querySelector('a.button');
      if (button) rightCellContent.push(button);
    }
  }

  // 3. Get the second grid (images)
  const secondGrid = container.nextElementSibling;
  let imageCell1 = null, imageCell2 = null;
  if (secondGrid && secondGrid.classList.contains('grid-layout')) {
    const imageDivs = getDirectChildrenByTag(secondGrid, 'div');
    if (imageDivs.length > 0) {
      const img1 = imageDivs[0].querySelector('img');
      if (img1) imageCell1 = img1;
    }
    if (imageDivs.length > 1) {
      const img2 = imageDivs[1].querySelector('img');
      if (img2) imageCell2 = img2;
    }
  }

  // 4. Build the table rows
  const headerRow = ['Columns block (columns11)'];
  // Second row: headline/intro/author/button | paragraph/author/button
  const secondRow = [leftCellContent, rightCellContent];
  // Third row: images side by side
  const thirdRow = [imageCell1, imageCell2];

  // 5. Create the table
  const cells = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  element.replaceWith(table);
}
