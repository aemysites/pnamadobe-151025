/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a>)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Find image element (first .utility-aspect-3x2 > img)
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageContainer) {
      imageEl = imageContainer.querySelector('img');
    }

    // Find text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional, above heading)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        // Use the whole tag group (preserves style and structure)
        textContent.push(tagGroup);
      }
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Compose row: [image, text content]
    // Always use array for text cell to preserve tag, heading, and description
    rows.push([
      imageEl,
      textContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
