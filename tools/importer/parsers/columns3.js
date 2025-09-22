/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (contains the two columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the direct children of the grid (should be [image, content div])
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: the image
  const imageCol = gridChildren[0];
  // Second column: heading, subheading, buttons
  const contentCol = gridChildren[1];

  // Compose the table rows
  const headerRow = ['Columns block (columns3)'];
  const columnsRow = [imageCol, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
