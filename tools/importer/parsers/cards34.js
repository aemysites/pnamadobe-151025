/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each <a> card element
  function extractCardContent(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the card content container (the div after the image)
    const cardContentDiv = img.nextElementSibling;

    // Defensive: If no content div, fallback to cardEl
    const contentRoot = cardContentDiv || cardEl;

    // Find the tag and read time (optional, grouped at top)
    const tagRow = contentRoot.querySelector('.flex-horizontal');
    let tagText = '', readTimeText = '';
    if (tagRow) {
      const tag = tagRow.querySelector('.tag > div');
      tagText = tag ? tag.textContent.trim() : '';
      const readTime = tagRow.querySelector('.paragraph-sm');
      readTimeText = readTime ? readTime.textContent.trim() : '';
    }

    // Find the heading (mandatory)
    const heading = contentRoot.querySelector('h3, .h4-heading');
    // Find the description (mandatory)
    const desc = contentRoot.querySelector('p');
    // Find the CTA (optional, usually 'Read')
    // It's the last div inside contentRoot, but not the tagRow
    let cta = null;
    const divs = Array.from(contentRoot.querySelectorAll('div'));
    for (let d of divs) {
      if (d !== tagRow && d.textContent.trim().toLowerCase() === 'read') {
        cta = d;
        break;
      }
    }

    // Compose the text content cell
    const textCellContent = [];
    // Tag and read time row (optional)
    if (tagText || readTimeText) {
      const tagWrap = document.createElement('div');
      if (tagText) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagText;
        tagSpan.style.fontWeight = 'bold';
        tagWrap.appendChild(tagSpan);
      }
      if (readTimeText) {
        const readSpan = document.createElement('span');
        readSpan.textContent = ' ' + readTimeText;
        tagWrap.appendChild(readSpan);
      }
      textCellContent.push(tagWrap);
    }
    // Heading (mandatory)
    if (heading) {
      textCellContent.push(heading);
    }
    // Description (mandatory)
    if (desc) {
      textCellContent.push(desc);
    }
    // CTA (optional)
    if (cta) {
      textCellContent.push(cta);
    }
    return [img, textCellContent];
  }

  // Get all direct <a> children (each is a card)
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const rows = [];
  // Header row as specified
  rows.push(['Cards (cards34)']);
  // Card rows
  cardEls.forEach(cardEl => {
    rows.push(extractCardContent(cardEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
