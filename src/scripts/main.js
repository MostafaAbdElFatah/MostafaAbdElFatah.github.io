/**
 * Composition root (Constitution I & II).
 * The only module allowed to import from domain/, data/ and presentation/ together.
 * Styles are linked from index.html so they load before this script.
 *
 * Phase 2 wires repositories → use cases → controllers here.
 */
export function bootstrap(root = document, storage = localStorage) {
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
    const surfaceColor = root.defaultView
      .getComputedStyle(root.body)
      .getPropertyValue('background-color');
    if (surfaceColor) themeColor.content = surfaceColor;
  };

  syncThemeControl();
  toggle.addEventListener('click', () => {
    const nextTheme = root.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    root.documentElement.dataset.theme = nextTheme;
    storage.setItem('theme', nextTheme);
    syncThemeControl();
  });
}

if (typeof document !== 'undefined') bootstrap();
