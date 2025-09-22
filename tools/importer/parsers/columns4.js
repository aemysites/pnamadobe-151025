/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid container (the columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 2. Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // 3. The header row as required
  const headerRow = ['Columns block (columns4)'];

  // 4. The columns row: each cell is a column's content (reference, not clone)
  const columnsRow = columns.map(col => col);

  // 5. Build the table data
  const tableData = [headerRow, columnsRow];

  // 6. Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 7. Replace the original element with the new block table
  element.replaceWith(block);
}
