/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout div (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the left text block, right contacts, and bottom image
  const gridChildren = Array.from(grid.children);
  const leftDiv = gridChildren.find(child => child.tagName === 'DIV');
  const rightUl = gridChildren.find(child => child.tagName === 'UL');
  const bottomImg = gridChildren.find(child => child.tagName === 'IMG');

  if (!leftDiv || !rightUl || !bottomImg) return;

  // First row: block name
  const headerRow = ['Columns block (columns16)'];

  // Second row: left and right columns
  const secondRow = [leftDiv, rightUl];

  // Third row: image spanning both columns (put image in first cell, and duplicate in second cell)
  // To comply with: 'Additional rows may be added below and must contain the same number of columns as the second row.'
  const thirdRow = [bottomImg.cloneNode(true), bottomImg.cloneNode(true)];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
    thirdRow,
  ], document);

  element.replaceWith(table);
}
