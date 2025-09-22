/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be image and text column)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image
  const image = gridChildren.find(el => el.tagName === 'IMG');

  // Second column: text content
  const textCol = gridChildren.find(el => el !== image);

  // Defensive: Only proceed if both columns exist
  if (!image || !textCol) return;

  // Compose the header row
  const headerRow = ['Columns block (columns33)'];

  // Compose the columns row - reference the actual elements
  const columnsRow = [image, textCol];

  // Build the table using the WebImporter utility
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
