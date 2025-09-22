/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Carousel block
  const headerRow = ['Carousel (carousel24)'];

  // Defensive: find the card body
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    cardBody = element.querySelector('[class*="card-body"]');
  }

  // Find the image (mandatory)
  let img = cardBody ? cardBody.querySelector('img') : null;

  // Find the heading (optional)
  let heading = cardBody ? cardBody.querySelector('.h4-heading') : null;

  // Compose the text cell
  let textCell = '';
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell = h2;
  }
  // No extra description or CTA in this HTML

  // Compose the slide row: [image, textCell]
  const slideRow = [img || '', textCell];

  // Build the table rows
  const rows = [headerRow, slideRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
