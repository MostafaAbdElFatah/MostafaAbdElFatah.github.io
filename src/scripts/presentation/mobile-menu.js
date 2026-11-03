/**
 * Mobile Navigation Menu (mobile-menu.js)
 * Controls the mobile dropdown / dialog: toggle state, animations, focus,
 * keyboard navigation (Esc to close), and dismissing when tapping outside.
 */
export function initMobileMenu(root = document) {
  const menuToggle = root.querySelector('[data-menu-toggle]');
  const mobileNav = root.querySelector('[data-mobile-nav]');

  if (!menuToggle || !mobileNav) return null;

  const backdrop = mobileNav.querySelector('[data-menu-backdrop]');
  const panel = mobileNav.querySelector('.mobile-nav__panel');
  const links = mobileNav.querySelectorAll('[data-menu-link]');
  const defaultView = root.defaultView || window;

  let isOpen = false;
  let closeTimeoutId = null;

  const openMenu = () => {
    if (isOpen) return;
    isOpen = true;

    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId);
      closeTimeoutId = null;
    }

    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');

    mobileNav.removeAttribute('hidden');
    // Force a style recalc so the CSS transition plays smoothly
    void mobileNav.offsetWidth;
    mobileNav.classList.add('is-open');

    if (root.body) {
      root.body.classList.add('has-mobile-menu-open');
    }
  };

  const closeMenu = (restoreFocus = false) => {
    if (!isOpen) return;
    isOpen = false;

    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileNav.classList.remove('is-open');

    if (root.body) {
      root.body.classList.remove('has-mobile-menu-open');
    }

    // Keep element visible during the closing fade/slide animation
    closeTimeoutId = setTimeout(() => {
      if (!isOpen) {
        mobileNav.setAttribute('hidden', '');
      }
      closeTimeoutId = null;
    }, 280);

    if (restoreFocus && typeof menuToggle.focus === 'function') {
      menuToggle.focus();
    }
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu(true);
    } else {
      openMenu();
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Dismiss if tapping directly on the backdrop or in the mobileNav wrapper outside panel
  mobileNav.addEventListener('click', (event) => {
    if (panel && !panel.contains(event.target)) {
      closeMenu(false);
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', () => closeMenu(false));
  }

  // Dismiss if tapping anywhere outside of the menu panel and toggle button
  const onOutsideTap = (event) => {
    if (!isOpen) return;
    if (panel && !panel.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu(false);
    }
  };

  root.addEventListener('click', onOutsideTap);
  root.addEventListener('pointerdown', onOutsideTap);

  links.forEach((link) => {
    link.addEventListener('click', () => closeMenu(false));
  });

  const onKeyDown = (event) => {
    if (isOpen && event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    }
  };

  const onResize = () => {
    if (isOpen && defaultView.innerWidth > 768) {
      closeMenu(false);
    }
  };

  root.addEventListener('keydown', onKeyDown);
  defaultView.addEventListener('resize', onResize);

  return {
    open: openMenu,
    close: closeMenu,
    toggle: toggleMenu,
    isOpen: () => isOpen,
  };
}
