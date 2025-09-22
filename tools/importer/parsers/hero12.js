/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the background image (row 2)
  function findBackgroundImage() {
    const bgImg = element.querySelector('img.cover-image.utility-position-absolute');
    return bgImg || '';
  }

  // Helper to find the main content (row 3)
  function findMainContent() {
    // Find the main content container
    const containerDiv = element.querySelector('.container');
    if (!containerDiv) return '';
    const cardBody = containerDiv.querySelector('.card-body');
    if (!cardBody) return '';
    const grid = cardBody.querySelector('.grid-layout');
    if (!grid) return '';
    // Find the text content div (skip decorative image)
    const textDiv = Array.from(grid.children).find(child => child.tagName === 'DIV');
    if (!textDiv) return '';
    return textDiv;
  }

  const headerRow = ['Hero (hero12)'];
  const backgroundImage = findBackgroundImage();
  const mainContent = findMainContent();

  // Only include non-empty rows for background and main content
  const rows = [
    headerRow,
    [backgroundImage],
    [mainContent]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
