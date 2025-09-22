/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a column cell)
  const columnDivs = Array.from(grid.children);

  // For each column, get the inner image (if present)
  const columns = columnDivs.map((col) => {
    // Try to find an img inside this column
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const headerRow = ['Columns (columns8)'];
  const columnsRow = columns;
  const tableRows = [headerRow, columnsRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
