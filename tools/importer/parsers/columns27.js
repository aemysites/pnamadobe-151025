/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children of a node
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find the main grid layout (holds the columns)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get the main content pieces
  // The first two elements are the heading and the quote
  const children = getDirectChildren(mainGrid, '*');
  if (children.length < 3) return;
  const heading = children[0]; // h2-heading
  const quote = children[1];   // paragraph-lg
  const lowerGrid = children[2]; // grid-layout inside mainGrid

  // Lower grid: contains divider, avatar+name, and logo
  const lowerChildren = getDirectChildren(lowerGrid, '*');
  // Defensive: divider, avatar+name, logo
  let divider = null, avatarName = null, logo = null;
  if (lowerChildren.length >= 3) {
    divider = lowerChildren[0];
    avatarName = lowerChildren[1];
    logo = lowerChildren[2];
  }

  // Compose left column: heading, divider, avatar+name
  const leftColumn = document.createElement('div');
  leftColumn.appendChild(heading);
  if (divider) leftColumn.appendChild(divider);
  if (avatarName) leftColumn.appendChild(avatarName);

  // Compose right column: quote, logo
  const rightColumn = document.createElement('div');
  rightColumn.appendChild(quote);
  if (logo) rightColumn.appendChild(logo);

  // Table structure: header row, then one row with two columns
  const headerRow = ['Columns block (columns27)'];
  const contentRow = [leftColumn, rightColumn];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
