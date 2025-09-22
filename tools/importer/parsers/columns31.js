/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If there are fewer than 2 columns, don't convert
  if (columns.length < 2) return;

  // Header row as required
  const headerRow = ['Columns block (columns31)'];

  // Second row: one cell per column, each cell contains the original column content
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
