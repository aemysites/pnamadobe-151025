/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a>
  function extractCard(cardEl) {
    // Find image (mandatory)
    const imgWrapper = cardEl.querySelector('.utility-aspect-2x3');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Find tag and date
    const metaRow = cardEl.querySelector('.flex-horizontal');
    let tag = null;
    let date = null;
    if (metaRow) {
      const metaDivs = metaRow.querySelectorAll('div');
      if (metaDivs.length > 0) tag = metaDivs[0];
      if (metaDivs.length > 1) date = metaDivs[1];
    }
    // Find heading
    const heading = cardEl.querySelector('h3');
    // Compose text cell
    const textCell = document.createElement('div');
    textCell.style.display = 'flex';
    textCell.style.flexDirection = 'column';
    // Tag and date row
    if (tag || date) {
      const metaWrap = document.createElement('div');
      metaWrap.style.display = 'flex';
      metaWrap.style.gap = '0.5em';
      if (tag) metaWrap.appendChild(tag);
      if (date) metaWrap.appendChild(date);
      textCell.appendChild(metaWrap);
    }
    // Heading
    if (heading) textCell.appendChild(heading);
    // Optionally, add a link to the article (CTA)
    // For this block, CTA is optional and not visually present, so skip unless required
    return [img, textCell];
  }

  // Get all cards (direct children <a> of the block)
  const cardEls = element.querySelectorAll(':scope > a');
  const rows = [];
  // Header row
  rows.push(['Cards (cards14)']);
  // Card rows
  cardEls.forEach(cardEl => {
    rows.push(extractCard(cardEl));
  });
  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
