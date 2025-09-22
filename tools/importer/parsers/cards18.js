/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each card is an <a> inside the grid
    const cardLinks = Array.from(grid.querySelectorAll(':scope > a'));
    cardLinks.forEach((cardLink) => {
      let imgEl = cardLink.querySelector('img');
      // Defensive: sometimes the img is wrapped in a div, sometimes not
      // If not found, check for a div with class utility-aspect-3x2 and get its img
      if (!imgEl) {
        const aspectDiv = cardLink.querySelector('.utility-aspect-3x2');
        if (aspectDiv) {
          imgEl = aspectDiv.querySelector('img');
        }
      }
      // Text content: heading and description
      let textContent = [];
      const heading = cardLink.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description: look for .paragraph-sm or div after heading
      let desc = null;
      if (heading) {
        // Try next sibling
        desc = heading.nextElementSibling;
        if (desc && desc.classList.contains('paragraph-sm')) {
          textContent.push(desc);
        } else {
          // Try to find .paragraph-sm anywhere
          const para = cardLink.querySelector('.paragraph-sm');
          if (para && para !== heading) {
            textContent.push(para);
          }
        }
      } else {
        // Try to find .paragraph-sm anywhere
        const para = cardLink.querySelector('.paragraph-sm');
        if (para) {
          textContent.push(para);
        }
      }
      // If the card has no heading or description, fallback to all text
      if (textContent.length === 0) {
        textContent.push(document.createTextNode(cardLink.textContent.trim()));
      }
      // Compose row: [image, text]
      cards.push([
        imgEl || '',
        textContent.length === 1 ? textContent[0] : textContent,
      ]);
    });
    return cards;
  }

  // Find all tab panes (each contains a grid of cards)
  const tabPanes = Array.from(element.querySelectorAll(':scope > div'));
  const allCards = [];
  tabPanes.forEach((tabPane) => {
    // Find the grid in this tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      allCards.push(...cards);
    }
  });

  // Build the table rows
  const headerRow = ['Cards (cards18)'];
  const tableRows = [headerRow, ...allCards];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
