/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero40)'];

  // 2. Background image row
  // Find the image element (background)
  let bgImg = null;
  // The structure is: header > div.grid-layout > div.utility-min-height-100dvh > img.cover-image
  const gridLayout = element.querySelector('.grid-layout');
  if (gridLayout) {
    // Find the first child div with .utility-min-height-100dvh
    const bgDiv = gridLayout.querySelector('.utility-min-height-100dvh');
    if (bgDiv) {
      bgImg = bgDiv.querySelector('img.cover-image');
    }
  }
  // Defensive: If no image found, leave cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // The structure is: header > div.grid-layout > div.container > div.grid-layout > h1, div.flex-vertical > p, div.button-group > a
  let contentCell = [];
  let containerDiv = null;
  if (gridLayout) {
    // The second child div is the content container
    const children = getImmediateChildren(gridLayout, 'div');
    containerDiv = children.length > 1 ? children[1] : null;
  }

  if (containerDiv) {
    // Find the inner grid layout
    const innerGrid = containerDiv.querySelector('.grid-layout');
    if (innerGrid) {
      // Title
      const h1 = innerGrid.querySelector('h1');
      if (h1) contentCell.push(h1);
      // Subheading (paragraph)
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        const p = flexVertical.querySelector('p');
        if (p) contentCell.push(p);
        // CTA button
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          const a = buttonGroup.querySelector('a');
          if (a) contentCell.push(a);
        }
      }
    }
  }

  // Defensive: If no content found, leave cell empty
  if (contentCell.length === 0) contentCell = [''];
  const contentRow = [contentCell];

  // Compose table rows
  const rows = [headerRow, imageRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
