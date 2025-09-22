/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor element
  function extractCardInfo(cardEl) {
    // Find image (mandatory for this block)
    let img = cardEl.querySelector('img');
    if (!img) return null;
    // Find tag (if present)
    let tag = cardEl.querySelector('.tag');
    // Find heading (h2, h3, or heading class)
    let heading = cardEl.querySelector('h2, h3, .h2-heading, .h4-heading');
    // Find all paragraphs (some cards may have more than one)
    let paragraphs = Array.from(cardEl.querySelectorAll('p'));
    // Compose text cell
    const textParts = [];
    if (tag) textParts.push(tag);
    if (heading) textParts.push(heading);
    paragraphs.forEach(p => textParts.push(p));
    // Also include any direct text nodes or additional elements that may contain text
    Array.from(cardEl.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textParts.push(document.createTextNode(node.textContent.trim()));
      }
      // If node is an element and not already included, and contains text
      if (node.nodeType === Node.ELEMENT_NODE && !textParts.includes(node) && node.textContent.trim()) {
        // Avoid duplicating tag/heading/paragraph
        if (!node.classList.contains('tag') && !node.classList.contains('h2-heading') && !node.classList.contains('h4-heading') && node.tagName !== 'P') {
          textParts.push(node);
        }
      }
    });
    return [img, textParts];
  }

  // Get main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect all card anchors with images
  const cardAnchors = Array.from(grid.querySelectorAll('a.utility-link-content-block')).filter(card => card.querySelector('img'));

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards36)']);

  // Add each card row
  cardAnchors.forEach(card => {
    const info = extractCardInfo(card);
    if (info) rows.push(info);
  });

  // Create table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}
