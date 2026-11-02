import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import { bootstrap } from '../../src/scripts/main.js';

const html = readFileSync(new URL('../../src/pages/index.html', import.meta.url), 'utf8');
const darkThemeCss = readFileSync(
  new URL('../../src/styles/tokens/semantic-dark.css', import.meta.url),
  'utf8',
);
const homeCss = readFileSync(
  new URL('../../src/styles/pages/home/hero-orbit.css', import.meta.url),
  'utf8',
);
const skillIconPaths = {
  Swift: '/src/assets/icons/skills/swift.svg',
  SwiftUI: '/src/assets/icons/skills/swiftui.svg',
  Flutter: '/src/assets/icons/skills/flutter.svg',
  Dart: '/src/assets/icons/skills/dart.svg',
  iOS: '/src/assets/icons/skills/ios.svg',
};
const skillIconSources = Object.fromEntries(
  Object.entries(skillIconPaths).map(([skill, path]) => [
    skill,
    readFileSync(new URL(`../..${path}`, import.meta.url), 'utf8'),
  ]),
);
const moonIcon = readFileSync(
  new URL('../../src/assets/icons/theme-moon.svg', import.meta.url),
  'utf8',
);
const sunIcon = readFileSync(
  new URL('../../src/assets/icons/theme-sun.svg', import.meta.url),
  'utf8',
);
const { document } = new JSDOM(html).window;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

describe('index.html shell', () => {
  it('has exactly one h1', () => expect($$('h1')).toHaveLength(1));
  it('has a main landmark with id main', () => expect($('main#main')).not.toBeNull());
  it('has header and footer landmarks', () => {
    expect($('body > header')).not.toBeNull();
    expect($('body > footer')).not.toBeNull();
  });
  it('has a skip link to #main', () => expect($('a.skip-link[href="#main"]')).not.toBeNull());
  it('renders the orbiting mobile skill system with branded marks', () => {
    expect(document.documentElement.dataset.theme).toBe('light');
    expect($('[data-theme-toggle][aria-pressed="true"]')).not.toBeNull();
    expect($('[data-skill-system][role="img"]')?.getAttribute('aria-label')).toContain(
      'Swift, SwiftUI, Flutter, Dart, and mobile development',
    );
    expect(
      $$('[data-skill-system] .skill-orbit').map((orbit) =>
        orbit.querySelector('.skill-planet__label')?.textContent.trim(),
      ),
    ).toEqual(['Swift', 'SwiftUI', 'Flutter', 'Dart', 'Mobile']);
    for (const [skill, path] of Object.entries(skillIconPaths)) {
      expect($(`[data-skill-system] img[src="${path}"]`)).not.toBeNull();
      expect(skillIconSources[skill]).toContain('<svg');
    }
    expect(homeCss).toContain('@keyframes skill-orbit');
    expect(homeCss).toContain('@media (prefers-reduced-motion: reduce)');
    expect($('.hero__photo')).toBeNull();
    expect($$('.project-gallery__item')).toHaveLength(0);
  });
  it('uses an iPhone outline for the iOS skill mark', () => {
    expect(skillIconSources.iOS).toContain('<rect');
    expect(skillIconSources.iOS).toContain('stroke="#11100E"');
    // Planets are pearl spheres in both themes, so the dark iPhone outline stays legible
    // without inverting it in dark mode.
    expect(homeCss).toContain('var(--planet-surface-light)');
    expect(homeCss).not.toContain('invert(');
  });
  it('pauses orbital motion outside the viewport', () => {
    const page = new JSDOM(html, { url: 'https://portfolio.test/' });
    const { document } = page.window;
    let intersectionCallback;

    page.window.IntersectionObserver = class {
      constructor(callback) {
        intersectionCallback = callback;
      }

      observe() {}
    };
    bootstrap(document, page.window.localStorage);

    const system = document.querySelector('[data-skill-system]');
    intersectionCallback([{ isIntersecting: true }]);
    expect(system.classList.contains('is-visible')).toBe(true);

    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' });
    document.dispatchEvent(new page.window.Event('visibilitychange'));
    expect(system.classList.contains('is-visible')).toBe(false);

    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' });
    document.dispatchEvent(new page.window.Event('visibilitychange'));
    expect(system.classList.contains('is-visible')).toBe(true);

    intersectionCallback([{ isIntersecting: false }]);
    expect(system.classList.contains('is-visible')).toBe(false);
  });
  it('keeps existing theme icons in separate files', () => {
    expect($('[data-theme-icon="moon"]')?.getAttribute('src')).toBe(
      '/src/assets/icons/theme-moon.svg',
    );
    expect($('[data-theme-icon="sun"]')?.getAttribute('src')).toBe(
      '/src/assets/icons/theme-sun.svg',
    );
    expect(moonIcon.trimStart()).toMatch(/^<svg\b/);
    expect(sunIcon.trimStart()).toMatch(/^<svg\b/);
  });
  it('toggles and persists the selected theme', () => {
    const page = new JSDOM(html, {
      url: 'https://portfolio.test/',
      runScripts: 'dangerously',
    });
    const button = page.window.document.querySelector('[data-theme-toggle]');

    expect(page.window.document.documentElement.dataset.theme).toBe('light');
    bootstrap(page.window.document, page.window.localStorage);
    expect(button.getAttribute('aria-pressed')).toBe('true');
    button.click();

    expect(page.window.document.documentElement.dataset.theme).toBe('dark');
    expect(page.window.localStorage.getItem('theme')).toBe('dark');
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.getAttribute('aria-label')).toBe('Switch to light theme');
    expect(button.querySelector('[data-theme-icon="moon"]')?.getAttribute('src')).toBe(
      '/src/assets/icons/theme-moon.svg',
    );
    expect(button.querySelector('[data-theme-icon="sun"]')?.getAttribute('src')).toBe(
      '/src/assets/icons/theme-sun.svg',
    );
  });
  it('updates browser theme color from the current page surface', () => {
    const page = new JSDOM(html, { url: 'https://portfolio.test/' });
    const { document } = page.window;
    const meta = document.querySelector('meta[name="theme-color"]');

    document.body.style.backgroundColor = 'rgb(252, 251, 249)';
    bootstrap(document, page.window.localStorage);
    expect(meta.content).toBe('rgb(252, 251, 249)');

    document.body.style.backgroundColor = 'rgb(11, 10, 9)';
    document.querySelector('[data-theme-toggle]').click();
    expect(meta.content).toBe('rgb(11, 10, 9)');
  });
  it('restores a saved theme on reload', () => {
    const page = new JSDOM(html, {
      url: 'https://portfolio.test/',
      runScripts: 'dangerously',
      beforeParse(window) {
        window.localStorage.setItem('theme', 'dark');
      },
    });

    expect(page.window.document.documentElement.dataset.theme).toBe('dark');
  });
  it('has a meta description', () =>
    expect($('meta[name="description"]')?.content.length).toBeGreaterThan(50));
  it('declares color-scheme', () =>
    expect($('meta[name="color-scheme"]')?.content).toBe('dark light'));
  it('keeps the light theme from being overridden by dark fallback tokens', () => {
    expect(darkThemeCss).toContain(':root:not([data-theme])');
    expect(darkThemeCss).toContain("[data-theme='dark']");
  });
  it('has open graph and twitter cards', () => {
    expect($('meta[property="og:image"]')).not.toBeNull();
    expect($('meta[name="twitter:card"]')?.content).toBe('summary_large_image');
  });
  it('has JSON-LD Person data', () => {
    const data = JSON.parse($('script[type="application/ld+json"]').textContent);
    expect(data['@type']).toBe('Person');
  });
  it('runs the theme bootstrap before the stylesheet', () => {
    const head = [...document.head.children];
    const boot = head.findIndex(
      (el) => el.tagName === 'SCRIPT' && !el.src && el.textContent.includes('dataset.theme'),
    );
    const css = head.findIndex((el) => el.matches('link[rel="stylesheet"]'));
    expect(boot).toBeGreaterThanOrEqual(0);
    expect(boot).toBeLessThan(css);
  });
  it('loads nothing from external origins', () => {
    const urls = [
      ...$$('script[src]').map((el) => el.getAttribute('src')),
      ...$$(
        'link[rel="stylesheet"], link[rel="preload"], link[rel="icon"], link[rel="apple-touch-icon"]',
      ).map((el) => el.getAttribute('href')),
      ...$$('img[src]').map((el) => el.getAttribute('src')),
    ];
    expect(urls.filter((u) => /^https?:/.test(u))).toEqual([]);
  });
  it('renders all 33 projects without JavaScript', () =>
    expect($$('[data-project]')).toHaveLength(33));
  it('marks Arabic text with lang and dir', () => {
    for (const el of $$('[lang="ar"]')) expect(el.getAttribute('dir')).toBe('rtl');
  });
  it('opens external links safely', () => {
    for (const a of $$('a[target="_blank"]')) expect(a.rel).toContain('noopener');
  });
});
