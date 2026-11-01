# Feature Specification: Phase 1 — Project Foundation, Modular Token System & Visual Assets

**Feature Branch**: `001-foundation-and-tokens`

**Created**: 2026-11-01

**Status**: Approved

**Input**: User description: "Phase 1 of portfolio redesign: Refactor project structure to Vite + modular CSS token architecture (tokens, base, layout, components, pages/home, utilities, vendor/fontawesome) and Clean Architecture script directories (domain, data, presentation), plus extract/generate visual assets (MA gold/white logo, Hero dark/light orbital backgrounds and side-profile portrait, project card mockups, and CV asset)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standardized Modular Project Structure & Build Pipeline (Priority: P1)

As a developer maintaining the portfolio, I need the project organized into a clean, modular directory hierarchy powered by a fast build tool so that styles, scripts, and assets are decoupled, maintainable, and compile into a production-ready bundle (`dist/`).

**Why this priority**: This foundational scaffolding is a prerequisite for all subsequent Clean Architecture layers and UI section implementations.

**Independent Test**: Run the development server and production build command (`npm run build`) and verify that `dist/index.html` and bundled assets in `dist/assets/` are generated without errors while preserving existing portfolio access.

**Acceptance Scenarios**:

1. **Given** a fresh clone or workspace state, **When** dependencies are installed and the build command is executed, **Then** a production bundle is emitted to `dist/` with minified HTML, CSS, and JS assets.
2. **Given** the refactored `src/` directory, **When** inspecting the file tree, **Then** `src/assets/`, `src/scripts/{domain,data,presentation}/`, and `src/styles/{base,components,layout,pages/home,tokens,utilities,vendor/fontawesome}/` exist and are cleanly orchestrated via `src/styles/main.css` and `src/scripts/main.js`.

---

### User Story 2 - Dual-Theme Luxury Gold Design Token System (Priority: P1)

As a visitor viewing the portfolio in either Dark or Light mode, I need a cohesive, luxury gold-accented visual foundation (colors, typography, spacing, motion, and component tokens) so that every UI element renders with consistent contrast, hierarchy, and smooth theme transitions.

**Why this priority**: Every visual component in Phases 3–5 depends on semantic CSS custom properties for Dark (obsidian & gold) and Light (alabaster & warm gold) themes.

**Independent Test**: Load the application shell in a browser and toggle `data-theme="dark"` and `data-theme="light"` on `<html>`, verifying that all semantic surface, text, border, and gold accent tokens resolve accurately with AA/AAA contrast.

**Acceptance Scenarios**:

1. **Given** `data-theme="dark"` on the root element, **When** computed styles are inspected, **Then** background surfaces resolve to deep obsidian tones (`#0b0a09` / `#121110`), primary text to crisp warm ivory (`#f6f3ee`), and primary accents to metallic gold (`#d6b25e` / `#e8cb8b` gradients).
2. **Given** `data-theme="light"` on the root element, **When** computed styles are inspected, **Then** background surfaces resolve to warm alabaster/white (`#ffffff` / `#faf8f5`), primary text to deep charcoal (`#121110`), and accents to rich bronze-gold (`#9a7428` / `#d6b25e`).
3. **Given** editorial headings and Arabic text snippets, **When** rendered on screen, **Then** typography tokens apply display serif fonts for hero/section headlines, geometric sans-serif for body/UI controls, and dedicated Arabic script fonts with isolated RTL directionality.

---

### User Story 3 - Brand & Visual Asset Availability (Priority: P2)

As a visitor exploring the portfolio, I need crisp brand logos (`MA` monogram in gold and white), Hero section visuals (side-profile developer portrait and dark/light golden orbital wave backgrounds), project category showcase artwork, and downloadable CV/icon assets so the site looks complete and high-craft even offline or on restricted networks.

**Why this priority**: Visual assets define the signature identity shown in the design board and must be locally hosted under `src/assets/` before building the Hero and Project cards.

**Independent Test**: Verify all image, SVG, font, and PDF assets exist in `src/assets/` and `src/styles/vendor/fontawesome/`, load with HTTP 200 in the dev server, and render without broken links.

**Acceptance Scenarios**:

1. **Given** the `src/assets/` directory, **When** inspected, **Then** it contains the `MA` monogram logo (Gold & White SVG/PNG), Hero side-profile portrait, Dark & Light Hero orbital backgrounds, project card preview images (Health & Wellness, Travel & Lifestyle, Architecture, Mobile App UI/UX), and `Mostafa-Abdel-Fattah-CV.pdf`.
2. **Given** the `src/styles/vendor/fontawesome/` directory, **When** loaded by `src/styles/main.css`, **Then** icon classes and custom SVG icon badges render cleanly without external CDN failures.

---

### Edge Cases

- What happens when an external font or CDN is unreachable? Local system font fallbacks and locally bundled FontAwesome/SVG icons ensure zero broken glyphs.
- How does the token system handle user OS-level `prefers-reduced-motion`? `motion.css` tokens reduce transition durations to near-instant (`0.01ms`) when reduced motion is requested.
- What happens to the existing root `index.html`, `css/`, `js/`, and `assets/` during Phase 1? Legacy data (`js/data.js`) and CV (`assets/Mostafa-Abdel-Fattah-CV.pdf`) are migrated into `src/` before cleaning up obsolete root `css/` and `js/` directories so no portfolio content is lost.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a `package.json` and `vite.config.js` supporting `npm run dev`, `npm run build`, and `npm run preview` with ES module bundling and HTML minification into `dist/`.
- **FR-002**: System MUST organize stylesheets under `src/styles/` using the reference folder layout (`tokens/`, `base/`, `layout/`, `components/`, `pages/home/`, `utilities/`, `vendor/`) orchestrated by `src/styles/main.css` in a fixed cascade order. Phase 1 delivers the files that carry foundation content:
  - `src/styles/tokens/` (`primitives.css`, `semantic-dark.css`, `semantic-light.css`, `typography.css`, `spacing.css`, `motion.css`, `components.css`)
  - `src/styles/base/` (`normalize.css`, `globals.css`)
  - `src/styles/layout/` (`container.css`)
  - `src/styles/utilities/` (`visually-hidden.css`)
  - Component and page-section stylesheets are created only for sections the portfolio actually has, in the phase that builds them (see research R4); no empty placeholder files.
- **FR-003**: System MUST scaffold the Clean Architecture script directories under `src/scripts/` (`domain/`, `data/`, `presentation/`, and `main.js`) with import boundaries enforced automatically.
- **FR-004**: System MUST provide complete local visual assets including the `MA` logo (gold & white, plus a compact mark), an orbital Hero background that works in both themes, a high-resolution Hero side-profile portrait, 4 project showcase visuals, an icon set, favicons, a social-sharing image, and the downloadable CV PDF — all optimized for web delivery.
- **FR-005**: System MUST provide automated quality checks (code linting, style linting, formatting, unit tests) runnable by single commands, all passing at phase close.
- **FR-006**: The page shell MUST render the visitor's chosen or OS-preferred theme on first paint with no flash, include search/social metadata, a skip link, semantic landmarks, and keep all existing portfolio content readable without JavaScript.
- **FR-007**: All 33 existing projects and the CV MUST be preserved during migration.

### Key Entities

- **DesignTokenSet**: Hierarchical CSS custom properties categorized into primitives (raw palette, scales), semantics (theme-aware surfaces, ink, borders, gold gradients), typography, spacing, motion, and component-scoped variables.
- **AssetManifest**: Structured collection of local visual assets (logos, hero portraits/backgrounds, project card illustrations, icons, CV document) stored in `src/assets/`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Phase 1 directories and files exist and are imported in `src/styles/main.css` without broken `@import` paths.
- **SC-002**: Production build (`npm run build`) completes in under 10 seconds with 0 errors or unresolved asset references.
- **SC-003**: Both Dark and Light theme token sets pass WCAG AA contrast ratios (minimum 4.5:1 for body text, 3:1 for large headings and UI accents).
- **SC-004**: 100% of visual assets (MA logos, Hero portrait, Hero dark/light backgrounds, project card images, icons, and CV PDF) load locally with 0 external network dependencies required at runtime.

## Assumptions

- Local Node.js and npm are available in the workspace environment to install and run Vite.
- Visual assets shown in the design board that are not separately uploaded as individual files will be extracted/cropped at high resolution or generated as crisp SVG/PNG equivalents in `src/assets/`.
