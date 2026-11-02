/**
 * CV preview controller (presentation layer).
 *
 * Progressive enhancement over plain links:
 * - Without JavaScript, every [data-cv-open] link opens the PDF in a new tab.
 * - With JavaScript and an embeddable PDF viewer, the link opens a modal
 *   <dialog> that shows the PDF inline, with Download / Open-in-tab actions.
 * - Where inline PDFs work poorly (no viewer, small touch screens) the link is
 *   left alone, so the device's native PDF viewer handles it.
 *
 * The PDF is only requested the first time the dialog opens.
 *
 * @param {Document} root
 * @param {{ canEmbedPdf: boolean }} options
 * @returns {{ open: (trigger?: HTMLElement) => void, close: () => void } | null}
 */
export function initCvPreview(root, { canEmbedPdf }) {
  const dialog = root.querySelector('[data-cv-dialog]');
  const frame = dialog?.querySelector('[data-cv-frame]');
  const triggers = [...root.querySelectorAll('[data-cv-open]')];

  if (!dialog || !frame || triggers.length === 0) return null;
  if (!canEmbedPdf || typeof dialog.showModal !== 'function') return null;

  let lastTrigger = null;

  const open = (trigger) => {
    lastTrigger = trigger ?? null;
    if (!frame.getAttribute('src')) frame.setAttribute('src', frame.dataset.src);
    dialog.showModal();
    dialog.querySelector('[data-cv-close]')?.focus();
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  for (const trigger of triggers) {
    trigger.addEventListener('click', (event) => {
      // Let modified clicks (new tab / window) behave like normal links.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      open(trigger);
    });
  }

  dialog.querySelector('[data-cv-close]')?.addEventListener('click', close);

  // A click whose target is the <dialog> itself landed on the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('close', () => {
    lastTrigger?.focus();
  });

  return { open, close };
}
