import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { initCvPreview } from '../../src/scripts/presentation/cv-preview.js';

const html = readFileSync(new URL('../../src/pages/index.html', import.meta.url), 'utf8');
const CV = '/src/assets/docs/Mostafa-Abdel-Fattah-CV.pdf';

function setup({ canEmbedPdf = true } = {}) {
  const { window } = new JSDOM(html, { url: 'https://portfolio.test/' });
  const { document } = window;
  const dialog = document.querySelector('[data-cv-dialog]');
  // JSDOM has no modal dialog support; emulate the parts the controller uses.
  dialog.showModal = function showModal() {
    this.setAttribute('open', '');
  };
  dialog.close = function close() {
    this.removeAttribute('open');
    this.dispatchEvent(new window.Event('close'));
  };
  const controller = initCvPreview(document, { canEmbedPdf });
  const click = (el, init = {}) => {
    const event = new window.MouseEvent('click', { bubbles: true, cancelable: true, ...init });
    el.dispatchEvent(event);
    return event;
  };
  return { window, document, dialog, controller, click };
}

describe('CV preview and download', () => {
  it('offers both a preview and a download for the CV', () => {
    const { document } = setup();
    const previews = [...document.querySelectorAll('[data-cv-open]')];
    const downloads = [...document.querySelectorAll(`a[href="${CV}"][download]`)];
    expect(previews.length).toBeGreaterThanOrEqual(2);
    expect(downloads.length).toBeGreaterThanOrEqual(3);
    for (const link of previews) {
      // Without JavaScript the preview link still opens the PDF in a new tab.
      expect(link.getAttribute('href')).toBe(CV);
      expect(link.target).toBe('_blank');
      expect(link.getAttribute('aria-haspopup')).toBe('dialog');
    }
  });

  it('opens the dialog and lazily loads the PDF on first preview', () => {
    const { document, dialog, click } = setup();
    const frame = dialog.querySelector('[data-cv-frame]');
    expect(frame.getAttribute('src')).toBeNull();

    const event = click(document.querySelector('[data-cv-open]'));
    expect(event.defaultPrevented).toBe(true);
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(frame.getAttribute('src')).toBe(`${CV}#view=FitH`);
    expect(dialog.getAttribute('aria-labelledby')).toBe('cv-dialog-title');
  });

  it('closes from the close button and the backdrop, returning focus to the trigger', () => {
    const { document, dialog, click } = setup();
    const trigger = document.querySelector('[data-cv-open]');

    click(trigger);
    click(dialog.querySelector('[data-cv-close]'));
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(document.activeElement).toBe(trigger);

    click(trigger);
    click(dialog);
    expect(dialog.hasAttribute('open')).toBe(false);
  });

  it('keeps modified clicks as normal new-tab links', () => {
    const { document, dialog, click } = setup();
    const event = click(document.querySelector('[data-cv-open]'), { metaKey: true });
    expect(event.defaultPrevented).toBe(false);
    expect(dialog.hasAttribute('open')).toBe(false);
  });

  it('falls back to the native viewer when PDFs cannot be embedded', () => {
    const { document, dialog, controller, click } = setup({ canEmbedPdf: false });
    expect(controller).toBeNull();
    const event = click(document.querySelector('[data-cv-open]'));
    expect(event.defaultPrevented).toBe(false);
    expect(dialog.hasAttribute('open')).toBe(false);
  });
});
