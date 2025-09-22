/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Helper to extract card info from anchor blocks
  function extractCard(anchor) {
    // Find image (mandatory)
    const imgContainer = anchor.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgContainer ? imgContainer.querySelector('img') : null;

    // Find heading (h3)
    let heading = anchor.querySelector('h3');
    // If not found, try h4
    if (!heading) heading = anchor.querySelector('h4');

    // Find description (p)
    const desc = anchor.querySelector('p');

    // Find CTA (div.button)
    const cta = anchor.querySelector('.button');

    // Compose text cell
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);

    return [img, textCellContent];
  }

  // Find all card anchors at top level and inside nested grid
  const topLevelCards = Array.from(element.querySelectorAll(':scope > div > .grid-layout > a.utility-link-content-block'));
  // Nested grid (second column)
  const nestedGrid = element.querySelector(':scope > div > .grid-layout > .grid-layout');
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.querySelectorAll(':scope > a.utility-link-content-block'));
  }

  // First card is the left column card ("Fresh fits, bold moves")
  if (topLevelCards.length > 0) {
    rows.push(extractCard(topLevelCards[0]));
  }

  // Remaining cards are in the nested grid (right column)
  nestedCards.forEach(cardAnchor => {
    rows.push(extractCard(cardAnchor));
  });

  // Create table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
