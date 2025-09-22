/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link from iframe src
  function createLinkFromIframe(iframe) {
    if (!iframe || !iframe.src) return null;
    const a = document.createElement('a');
    a.href = iframe.src;
    a.textContent = 'Video';
    a.target = '_blank';
    return a;
  }

  // 1. Header row
  const headerRow = ['Hero (hero25)'];

  // 2. Background asset row (YouTube video as link)
  let backgroundAssetCell = '';
  const gridDiv = element.querySelector('.grid-layout');
  if (gridDiv) {
    // Find the video wrapper
    const videoWrapper = Array.from(gridDiv.children).find(child =>
      child.querySelector('iframe')
    );
    if (videoWrapper) {
      const iframe = videoWrapper.querySelector('iframe');
      const videoLink = createLinkFromIframe(iframe);
      if (videoLink) {
        backgroundAssetCell = videoLink;
      }
    }
  }

  // 3. Content row (title, subheading, CTA)
  let contentCell = [];
  if (gridDiv) {
    // Title
    const titleDiv = gridDiv.querySelector('.h1-heading');
    if (titleDiv) {
      // Convert to <h1> for semantic heading
      const h1 = document.createElement('h1');
      h1.textContent = titleDiv.textContent;
      contentCell.push(h1);
    }
    // Subheading
    const subheadingDiv = gridDiv.querySelector('.utility-padding-top-2rem');
    if (subheadingDiv) {
      const p = subheadingDiv.querySelector('p');
      if (p) contentCell.push(p);
    }
    // CTA buttons
    const buttonGroup = gridDiv.querySelector('.button-group');
    if (buttonGroup) {
      // Collect all buttons
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) {
        const btnContainer = document.createElement('div');
        buttons.forEach(btn => btnContainer.appendChild(btn));
        contentCell.push(btnContainer);
      }
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [backgroundAssetCell],
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
