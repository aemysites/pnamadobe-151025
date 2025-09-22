/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card container
  function extractCardContent(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text content (title and description)
    let title = null;
    let desc = null;
    // Defensive: look for h3 or h2 for title, p for description
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem') || cardDiv;
    title = textContainer.querySelector('h3, h2');
    desc = textContainer.querySelector('p');
    // Compose text cell contents
    const cellContents = [];
    if (title) cellContents.push(title);
    if (desc) cellContents.push(desc);
    return [img, cellContents];
  }

  // Get all immediate children (cards)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Compose rows for each card
  const rows = [];
  for (const cardDiv of cardDivs) {
    // Only include cards that have an image
    const img = cardDiv.querySelector('img');
    if (!img) continue;
    rows.push(extractCardContent(cardDiv));
  }

  // Table header
  const headerRow = ['Cards (cards26)'];
  // Final table data
  const tableData = [headerRow, ...rows];
  // Create table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace original element
  element.replaceWith(block);
}
