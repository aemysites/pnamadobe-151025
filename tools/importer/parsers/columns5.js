/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');
  if (!grid) return;

  // The left column: the first child (text + buttons)
  const leftCol = grid.children[0];
  // The right column: the image (direct child of grid)
  let rightCol = null;
  for (const child of Array.from(grid.children)) {
    if (child.tagName === 'IMG') {
      rightCol = child;
      break;
    }
  }
  if (!leftCol || !rightCol) return;

  // Extract the content for the left column
  const leftFrag = document.createDocumentFragment();
  Array.from(leftCol.childNodes).forEach(node => leftFrag.appendChild(node.cloneNode(true)));

  // Extract the image for the right column
  const rightImg = rightCol.cloneNode(true);

  // Compose the table rows
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftFrag, rightImg];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
