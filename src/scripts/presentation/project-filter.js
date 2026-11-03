/**
 * Category filter controller for Featured Projects cards and filter chips.
 *
 * When a user clicks one of the 3 Featured Projects cards (or a filter chip):
 * - Filters the project case-study cards and catalogue items by matching `data-category`
 * - Updates the active filter chip (`is-active` + `aria-pressed`)
 * - Smoothly scrolls to `#projects-detail` when triggered from a showcase card
 *
 * @param {Document} root
 */
export function initProjectFilter(root) {
  const projects = [...root.querySelectorAll('[data-project]')];
  const chips = [...root.querySelectorAll('[data-category-chip]')];
  const cardLinks = [...root.querySelectorAll('[data-category-filter]')];
  const detailAnchor = root.querySelector('#projects-detail');

  if (projects.length === 0) return null;

  const applyFilter = (filterValue) => {
    const allowed =
      !filterValue || filterValue === 'all'
        ? null
        : new Set(filterValue.split(',').map((s) => s.trim()));

    for (const item of projects) {
      const cat = item.getAttribute('data-category');
      const visible = !allowed || allowed.has(cat);
      item.hidden = !visible;
    }

    for (const chip of chips) {
      const active = chip.getAttribute('data-category-chip') === (filterValue || 'all');
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    }
  };

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      applyFilter(chip.getAttribute('data-category-chip'));
    });
  }

  for (const link of cardLinks) {
    link.addEventListener('click', (event) => {
      const filterValue = link.getAttribute('data-category-filter');
      if (!filterValue) return;
      event.preventDefault();
      applyFilter(filterValue);
      detailAnchor?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    });
  }

  return { applyFilter };
}
