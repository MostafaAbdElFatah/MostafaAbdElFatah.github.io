import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { beforeEach, describe, expect, it } from 'vitest';
import { initMobileMenu } from '../../src/scripts/presentation/mobile-menu.js';

const html = readFileSync(new URL('../../src/pages/index.html', import.meta.url), 'utf8');

describe('Mobile Menu Navigation & Header', () => {
  let dom;
  let document;
  let menuToggle;
  let mobileNav;
  let backdrop;
  let links;
  let controller;

  beforeEach(() => {
    dom = new JSDOM(html, { url: 'https://portfolio.test/' });
    document = dom.window.document;
    controller = initMobileMenu(document);
    menuToggle = document.querySelector('[data-menu-toggle]');
    mobileNav = document.querySelector('[data-mobile-nav]');
    backdrop = document.querySelector('[data-menu-backdrop]');
    links = [...document.querySelectorAll('[data-menu-link]')];
  });

  it('renders primary desktop navigation matching image reference', () => {
    const desktopLinks = [...document.querySelectorAll('.site-nav__link')].map((el) => ({
      text: el.textContent.trim(),
      href: el.getAttribute('href'),
    }));

    expect(desktopLinks).toEqual([
      { text: 'Work', href: '#work' },
      { text: 'Expertise', href: '#skills' },
      { text: 'About', href: '#about' },
      { text: 'Contact', href: '#contact' },
    ]);
  });

  it('has initial accessible closed state', () => {
    expect(menuToggle).not.toBeNull();
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(menuToggle.getAttribute('aria-controls')).toBe('mobile-nav-dialog');
    expect(mobileNav.hasAttribute('hidden')).toBe(true);
    expect(mobileNav.classList.contains('is-open')).toBe(false);
  });

  it('toggles open on click and updates aria attributes', () => {
    menuToggle.click();
    expect(controller.isOpen()).toBe(true);
    expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileNav.hasAttribute('hidden')).toBe(false);
    expect(mobileNav.classList.contains('is-open')).toBe(true);
    expect(document.body.classList.contains('has-mobile-menu-open')).toBe(true);

    menuToggle.click();
    expect(controller.isOpen()).toBe(false);
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileNav.classList.contains('is-open')).toBe(false);
    expect(document.body.classList.contains('has-mobile-menu-open')).toBe(false);
  });

  it('closes when backdrop is clicked', () => {
    menuToggle.click();
    expect(controller.isOpen()).toBe(true);

    backdrop.click();
    expect(controller.isOpen()).toBe(false);
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes when any navigation link is clicked', () => {
    menuToggle.click();
    expect(controller.isOpen()).toBe(true);

    const firstLink = links[0];
    firstLink.click();
    expect(controller.isOpen()).toBe(false);
  });

  it('closes when tapping outside of menu panel', () => {
    menuToggle.click();
    expect(controller.isOpen()).toBe(true);

    // Clicking anywhere in the mobileNav wrapper outside the panel dismisses it
    mobileNav.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    expect(controller.isOpen()).toBe(false);
    expect(menuToggle.getAttribute('aria-expanded')).toBe('false');

    // Tapping on document body outside menu dismisses it
    menuToggle.click();
    expect(controller.isOpen()).toBe(true);
    document.body.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    expect(controller.isOpen()).toBe(false);

    // Pointerdown outside menu dismisses it
    menuToggle.click();
    expect(controller.isOpen()).toBe(true);
    document.body.dispatchEvent(new dom.window.Event('pointerdown', { bubbles: true }));
    expect(controller.isOpen()).toBe(false);
  });

  it('closes when Escape key is pressed', () => {
    menuToggle.click();
    expect(controller.isOpen()).toBe(true);

    const escEvent = new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    document.dispatchEvent(escEvent);
    expect(controller.isOpen()).toBe(false);
  });
});
