/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero37)'];

  // --- Row 2: Background image (optional) ---
  // No image in source HTML, so leave cell empty
  const imageRow = [''];

  // --- Row 3: Content (title, subheading, CTA) ---
  // Defensive selectors for layout
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element.querySelector('.container');
  if (!grid) grid = element;

  // Find the content block (usually first child of grid)
  let contentBlock = null;
  let ctaBlock = null;
  const gridChildren = grid.querySelectorAll(':scope > *');
  if (gridChildren.length > 0) {
    // Try to find the div with heading and subheading
    for (const child of gridChildren) {
      if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
        contentBlock = child;
      } else if (child.tagName === 'A' || child.querySelector('a')) {
        ctaBlock = child;
      }
    }
    // Fallbacks
    if (!contentBlock && gridChildren[0]) contentBlock = gridChildren[0];
    if (!ctaBlock && gridChildren[1]) ctaBlock = gridChildren[1];
  }

  // Compose content cell
  const contentCell = [];
  if (contentBlock) {
    // Add heading(s) and subheading(s)
    const headings = contentBlock.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentCell.push(h));
    // Add subheading paragraphs
    const subPs = contentBlock.querySelectorAll('p');
    subPs.forEach(p => contentCell.push(p));
  }
  if (ctaBlock) {
    // If ctaBlock is an <a>, use it directly
    if (ctaBlock.tagName === 'A') {
      contentCell.push(ctaBlock);
    } else {
      // Otherwise, find <a> inside
      const ctaLink = ctaBlock.querySelector('a');
      if (ctaLink) contentCell.push(ctaLink);
    }
  }

  // Defensive: If nothing found, fallback to all children
  if (contentCell.length === 0) {
    gridChildren.forEach(child => contentCell.push(child));
  }

  // Table rows
  const rows = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
