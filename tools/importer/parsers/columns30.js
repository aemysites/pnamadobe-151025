/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column contains an image inside a div
  const cells = columns.map(col => {
    // Find the image inside this column
    const img = col.querySelector('img');
    // Reference the existing image element if it exists
    return img || '';
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns30)'];
  const contentRow = cells;
  const tableData = [headerRow, contentRow];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
