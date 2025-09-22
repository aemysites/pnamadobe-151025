/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate child divs
  const childDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (childDivs.length < 2) return; // Defensive: expect at least tab menu and tab content

  // Tab menu (labels)
  const tabMenu = childDivs.find(div => div.classList.contains('w-tab-menu'));
  // Tab content (panes)
  const tabContent = childDivs.find(div => div.classList.contains('w-tab-content'));
  if (!tabMenu || !tabContent) return;

  // Extract tab labels (in order)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));
  const tabLabels = tabLinks.map(link => {
    // The label is inside a div inside the link
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Extract tab panes (in order)
  const tabPanes = Array.from(tabContent.querySelectorAll(':scope > .w-tab-pane'));

  // Defensive: match labels and panes by order
  const rows = [];
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    if (!pane) continue;
    // The actual content is the first child of the pane (usually a div.grid-layout)
    let content = Array.from(pane.children);
    // If only one child, just use it directly
    if (content.length === 1) content = content[0];
    rows.push([label, content]);
  }

  // Build the table
  const headerRow = ['Tabs (tabs22)'];
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
