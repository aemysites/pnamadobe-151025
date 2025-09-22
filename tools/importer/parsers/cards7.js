/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified (exactly one column)
  const headerRow = ['Cards (cards7)'];

  // Get all immediate child divs (each card)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside this card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Use the image alt text as the card title (heading)
    const alt = img.getAttribute('alt') || '';
    // Collect all text nodes (excluding img alt) from the cardDiv
    let textContent = '';
    cardDiv.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent;
      }
    });
    textContent = textContent.trim();
    const textDiv = document.createElement('div');
    if (alt) {
      const heading = document.createElement('h3');
      heading.textContent = alt;
      textDiv.appendChild(heading);
    }
    if (textContent) {
      const desc = document.createElement('p');
      desc.textContent = textContent;
      textDiv.appendChild(desc);
    }
    return [img, textDiv];
  }).filter(Boolean);

  // Compose table cells
  // Header row must have one column, card rows must have two columns
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Fix header row to have one cell with colspan if needed
  const table = block;
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1 && rows.length && rows[0].length === 2) {
    headerTr.firstElementChild.setAttribute('colspan', '2');
  }

  // Replace the original element with the new block
  element.replaceWith(table);
}
