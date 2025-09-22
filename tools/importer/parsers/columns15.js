/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: find the grid-layout container (should be direct child of .container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  // Defensive: skip empty columns
  const contentRow = columns.map(col => {
    // If the column has only one child, just use that child
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, collect all children as an array
    return Array.from(col.childNodes);
  });

  // Compose the table rows
  const rows = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
