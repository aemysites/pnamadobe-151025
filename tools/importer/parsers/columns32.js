/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Block header row as required
  const headerRow = ['Columns block (columns32)'];

  // Left column: gather all content except the image (if any)
  const leftCol = columns[0];
  const leftColChildren = Array.from(leftCol.children);
  // Find the image (if any) in leftCol
  const leftImageIdx = leftColChildren.findIndex(child => child.querySelector && child.querySelector('img.image'));
  let leftContentBlock;
  if (leftImageIdx !== -1) {
    leftContentBlock = leftColChildren.slice(0, leftImageIdx);
  } else {
    leftContentBlock = leftColChildren;
  }
  if (!leftContentBlock || leftContentBlock.length === 0) {
    leftContentBlock = leftColChildren;
  }

  // Right column: reference the image block if present, else the whole column
  const rightCol = columns[1];
  let rightImageBlock = null;
  const rightImg = rightCol.querySelector('img');
  if (rightImg) {
    rightImageBlock = rightCol;
  } else {
    rightImageBlock = rightCol;
  }

  // Table structure: header row, then one row with two columns
  const cells = [
    headerRow,
    [leftContentBlock, rightImageBlock]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
