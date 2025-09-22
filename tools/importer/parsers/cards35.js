/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: exactly one column
  const headerRow = ['Cards (cards35)'];

  // Get all direct card divs (each contains an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows: each row is [image, text]
  const rows = [];
  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image

    // Use the alt text as a heading if present, styled as a heading (h3)
    let textCell = document.createElement('div');
    if (img.alt && img.alt.trim()) {
      const heading = document.createElement('h3');
      heading.textContent = img.alt;
      textCell.appendChild(heading);
    }
    // Also collect any text nodes or elements (other than the image) inside the cardDiv
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCell.appendChild(p);
      } else if (node.nodeType === Node.ELEMENT_NODE && node !== img) {
        if (node.tagName !== 'IMG') {
          const clone = node.cloneNode(true);
          textCell.appendChild(clone);
        }
      }
    });
    rows.push([img, textCell]);
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix: set colspan=2 on the header row cell
  const table = block;
  const headerTh = table.querySelector('tr:first-child th');
  if (headerTh) {
    headerTh.setAttribute('colspan', '2');
  }

  // Replace the original element
  element.replaceWith(block);
}
