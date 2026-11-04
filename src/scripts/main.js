/**
 * Composition root (Constitution I & II).
 * The only module allowed to import from domain/, data/ and presentation/ together.
 * Styles are linked from index.html so they load before this script.
 *
 * Phase 2 wires repositories → use cases → controllers here.
 */
import { initCvPreview } from './presentation/cv-preview.js';
import { initMobileMenu } from './presentation/mobile-menu.js';
import { initProjectFilter } from './presentation/project-filter.js';

export function bootstrap(root = document, storage = localStorage) {
  initProjectFilter(root);
  initMobileMenu(root);
  const skillSystem = root.querySelector('[data-skill-system]');
  const IntersectionObserver = root.defaultView?.IntersectionObserver;
  if (skillSystem && IntersectionObserver) {
    let isInViewport = false;
    const syncOrbitPlayback = () => {
      skillSystem.classList.toggle('is-visible', isInViewport && root.visibilityState !== 'hidden');
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        syncOrbitPlayback();
      },
      { threshold: 0.15 },
    );
    observer.observe(skillSystem);
    root.addEventListener('visibilitychange', syncOrbitPlayback);
  }

  // CV: preview inline where the browser can embed PDFs; otherwise the links
  // fall back to opening the native PDF viewer in a new tab.
  const view = root.defaultView;
  const isSmallTouchScreen = Boolean(
    view?.matchMedia?.('(pointer: coarse) and (max-width: 48rem)').matches,
  );
  initCvPreview(root, {
    canEmbedPdf: view?.navigator?.pdfViewerEnabled !== false && !isSmallTouchScreen,
  });

  const toggle = root.querySelector('[data-theme-toggle]');

  if (!toggle) return;

  const themeColor = root.querySelector('meta[name="theme-color"]');
  if (!themeColor) {
    throw new Error('The theme toggle requires theme-color metadata.');
  }

  const syncThemeControl = () => {
    const isLight = root.documentElement.dataset.theme === 'light';
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
    const surfaceColor =
      root.defaultView.getComputedStyle(root.body).getPropertyValue('background-color') ||
      (isLight ? '#fcfbf9' : '#0b0a09');
    themeColor.content = surfaceColor;
  };

  syncThemeControl();
  toggle.addEventListener('click', () => {
    const nextTheme = root.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    // Temporarily bypass body background-color transition so getComputedStyle
    // returns the final target surface color instead of an interpolated frame.
    const prevTransition = root.body.style.transition;
    root.body.style.transition = 'none';
    root.documentElement.dataset.theme = nextTheme;
    syncThemeControl();
    root.body.style.transition = prevTransition;
    storage.setItem('theme', nextTheme);
  });
}

if (typeof document !== 'undefined') bootstrap();
