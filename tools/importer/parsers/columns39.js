/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Table header row
  const headerRow = ['Columns block (columns39)'];

  // Second row: each cell is the content of a column (usually a div with an image inside)
  // Reference the existing column elements directly (do not clone)
  const contentRow = columns.map((col) => col);

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
