/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the background image (img.cover-image)
  const bgImg = element.querySelector('img.cover-image');
  let bgImgCell = '';
  if (bgImg) {
    // Reference the existing image element, do not clone or use src string
    bgImgCell = bgImg;
  }

  // 3. Content row (title, subheading, CTA)
  // Find the card with content
  const card = element.querySelector('.card');
  let contentCell = '';
  if (card) {
    // We'll collect the heading, subheading, and buttons
    const contentParts = [];
    // Heading
    const heading = card.querySelector('h1');
    if (heading) contentParts.push(heading);
    // Subheading (paragraph)
    const subheading = card.querySelector('p');
    if (subheading) contentParts.push(subheading);
    // CTA buttons (all <a> inside .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Reference the existing button group element
      contentParts.push(buttonGroup);
    }
    // Only add non-empty content
    if (contentParts.length > 0) {
      contentCell = contentParts;
    }
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
