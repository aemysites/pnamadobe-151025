/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Accordion (accordion23)'];
  const rows = [headerRow];

  // Defensive: get all immediate children that represent accordion items
  // In this HTML, each accordion item is a .divider containing a grid-layout
  const accordionItems = element.querySelectorAll(':scope > .divider');

  accordionItems.forEach((item) => {
    // Each item contains a grid-layout div
    const grid = item.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if structure is unexpected

    // The first child of grid is the heading/title
    // The second child is the content/body
    const children = grid.children;
    if (children.length < 2) return; // Defensive: skip if missing content

    const title = children[0]; // h4-heading
    const content = children[1]; // rich-text paragraph-lg

    rows.push([title, content]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
