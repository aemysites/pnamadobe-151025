/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the columns: should be two children, left (div) and right (img)
  const gridChildren = Array.from(grid.children);
  const leftCol = gridChildren.find((el) => el.tagName === 'DIV');
  const rightCol = gridChildren.find((el) => el.tagName === 'IMG');

  // Defensive: ensure both columns exist
  if (!leftCol || !rightCol) return;

  // Table header must match block name exactly
  const headerRow = ['Columns (columns28)'];
  // Table content: reference the actual elements, not clone or create new
  const contentRow = [leftCol, rightCol];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
