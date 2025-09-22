/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  accordionItems.forEach((item) => {
    // Title cell: find the toggle div with the visible label
    const toggle = item.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      // The label is usually inside a div with class 'paragraph-lg'
      title = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content cell: find the dropdown content
    const nav = item.querySelector('nav.accordion-content');
    let content = null;
    if (nav) {
      // Usually content is inside a rich-text div
      const rich = nav.querySelector('.w-richtext');
      if (rich) {
        content = rich;
      } else {
        // fallback: use the nav itself
        content = nav;
      }
    }

    // Defensive: if title or content missing, fallback to item
    rows.push([
      title || document.createTextNode(''),
      content || document.createTextNode(''),
    ]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
