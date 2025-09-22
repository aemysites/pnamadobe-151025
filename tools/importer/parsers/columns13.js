/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container inside the main container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Defensive: get all direct children of the grid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First child: heading (left column)
  const heading = gridChildren[0];
  // Second child: right column (contains paragraph and button)
  const rightCol = gridChildren[1];

  // We'll keep the heading as-is
  // For the right column, collect all children (paragraph, button)
  const rightColContent = Array.from(rightCol.childNodes).filter(node => {
    // Only include elements and non-empty text nodes
    return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
  });

  // Compose the table rows
  const headerRow = ['Columns block (columns13)'];
  const contentRow = [heading, rightColContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
