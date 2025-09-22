/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing all columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row (block name)
  const headerRow = ['Columns block (columns21)'];

  // Second row: each column's content
  // For this block, each column is a cell
  const secondRow = columns.map((col) => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
