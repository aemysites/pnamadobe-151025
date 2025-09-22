/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirements
  const headerRow = ['Cards (cards19)'];

  // Get all direct card divs (each card is a flex-horizontal)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for each card
  const rows = cardDivs.map(card => {
    // Icon: find the first img inside .icon
    let iconImg = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Text: collect all text content from the card except the icon
    // We'll clone the card, remove the icon, and use the rest as the text cell
    const cardClone = card.cloneNode(true);
    const iconClone = cardClone.querySelector('.icon');
    if (iconClone) iconClone.remove();
    // Remove any empty divs left after icon removal
    Array.from(cardClone.querySelectorAll('div')).forEach(div => {
      if (!div.textContent.trim() && !div.querySelector('p')) div.remove();
    });

    // Use the remaining content as the text cell
    let textCell = null;
    // If only one child left and it's a <p>, use that
    const children = Array.from(cardClone.children).filter(c => c.tagName !== 'DIV' || c.textContent.trim());
    if (children.length === 1 && children[0].tagName === 'P') {
      textCell = children[0];
    } else {
      textCell = cardClone;
    }

    return [iconImg, textCell];
  });

  // Compose the full table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
