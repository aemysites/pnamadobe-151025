/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all images from the hero background grid
  function getBackgroundImages() {
    // Find the grid with images
    const grid = element.querySelector('.desktop-3-column');
    if (!grid) return [];
    // Get all img elements inside this grid
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper to get the hero text content (title, subheading, CTAs)
  function getHeroContent() {
    // Find the content container
    const content = element.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) return null;
    // Return the entire content container (includes h1, p, and buttons)
    return content.querySelector('.container');
  }

  // Build the block table rows
  const headerRow = ['Hero (hero20)'];

  // Row 2: background images (as a single cell, containing all images)
  const bgImages = getBackgroundImages();
  let backgroundCell = '';
  if (bgImages.length > 0) {
    backgroundCell = bgImages;
  }

  // Row 3: hero content (title, subheading, CTAs)
  const heroContent = getHeroContent();
  let contentCell = '';
  if (heroContent) {
    contentCell = heroContent;
  }

  const tableRows = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
