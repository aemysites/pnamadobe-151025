/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid containing the two columns
  const topGrid = element.querySelector('.grid-layout');
  if (!topGrid) return;
  const columns = Array.from(topGrid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: headline, subheading, buttons
  const leftCol = columns[0];
  const leftContent = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) {
    // Only reference the button group, do not clone
    leftContent.push(buttonGroup);
  }

  // RIGHT COLUMN: images
  const rightCol = columns[1];
  const imageGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
  }
  // Only reference the image elements, do not clone

  // Table header as per spec
  const headerRow = ['Columns block (columns38)'];
  // Each cell is an array of referenced DOM nodes
  const row = [leftContent, images];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
