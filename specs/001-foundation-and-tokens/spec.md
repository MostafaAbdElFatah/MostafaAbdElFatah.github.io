# Feature Specification: Phase 1 — Project Foundation, Modular Token System & Visual Assets

**Feature Branch**: `001-foundation-and-tokens`

**Created**: 2026-11-01

**Revised**: 2026-11-01 (aligned with constitution v1.1.0, plan research R4–R10, and `/speckit-analyze` findings I1, C1, I2, I3, I4, B1)

**Status**: Implemented

**Input**: User description: "Phase 1 of portfolio redesign: Refactor project structure to Vite + modular CSS token architecture following the reference folder layout and Clean Architecture script directories (domain, data, presentation), plus extract/generate visual assets (MA gold/white logo, theme-aware Hero orbital background and side-profile portrait, project showcase visuals, icons, and CV asset)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Standardized Modular Project Structure & Build Pipeline (Priority: P1)

As the developer maintaining the portfolio, I need the project organized into a clean, modular
directory hierarchy with a one-command build and automated quality checks, so that styles,
scripts and assets are decoupled, architectural rules are enforced automatically, and every
change produces a production-ready bundle.

**Why this priority**: All later phases (architecture core, hero, projects, skills) build on this
scaffolding and its quality gates.

**Independent Test**: Install dependencies, run the lint, format-check, test and build commands;
all succeed, and the built page shows all existing portfolio content with a skip link and
semantic landmarks.

**Acceptance Scenarios**:

1. **Given** a fresh clone, **When** dependencies are installed and the build command runs, **Then** a production bundle with minified HTML, CSS and JS is emitted to `dist/`.
2. **Given** the refactored project, **When** inspecting the file tree, **Then** `src/assets/`, `src/scripts/{domain,data,presentation}/` and `src/styles/{tokens,base,utilities,layout,components,pages/home,vendor}/` exist, orchestrated by `src/styles/main.css` and `src/scripts/main.js`.
3. **Given** a script in the domain layer that references the browser document or imports from the data/presentation layers, **When** the lint command runs, **Then** it fails with a boundary error.
4. **Given** JavaScript is disabled, **When** the built page is opened, **Then** the hero text, all 33 projects, skills and contact details are still readable.

---

### User Story 2 - Dual-Theme Luxury Gold Design Token System (Priority: P1)

As a visitor viewing the portfolio in Dark or Light mode, I need a cohesive gold-accented visual
foundation (colors, typography, spacing, motion) so every element renders with consistent
hierarchy and accessible contrast, and switching themes never shifts the layout.

**Why this priority**: Every visual component in Phases 3–5 consumes these semantic tokens.

**Independent Test**: Toggle `data-theme="dark"` / `data-theme="light"` on `<html>`; every
semantic surface, text, border and accent token resolves to the palette defined in
[data-model.md](./data-model.md) §1.3, text pairs meet WCAG AA, and no element moves.

**Acceptance Scenarios**:

1. **Given** dark theme, **When** computed styles are inspected, **Then** the page surface is obsidian (`--color-surface` = `#0b0a09`), body text is warm ivory (`--color-text` = `#f7f4ee`), and accent text is gold (`--color-accent` = `#deb868`).
2. **Given** light theme, **When** computed styles are inspected, **Then** the page surface is alabaster (`--color-surface` = `#fcfbf9`), body text is obsidian (`--color-text` = `#0b0a09`), and accent text is deep gold (`--color-accent` = `#7a5a1c`) so it meets AA on light surfaces.
3. **Given** either theme, **When** a gold-filled call-to-action is shown, **Then** it uses the gold gradient fill with obsidian label text (`--color-on-accent`).
4. **Given** headings, body copy and Arabic project names, **When** rendered, **Then** headings use the display serif, body/UI uses the sans-serif, and Arabic text uses the Arabic font with isolated right-to-left direction.
5. **Given** a stored or OS-preferred theme, **When** the page first paints, **Then** it already shows that theme (no flash of the other theme).
6. **Given** the OS requests reduced motion, **When** any transition runs, **Then** it completes effectively instantly.

---

### User Story 3 - Brand & Visual Asset Availability (Priority: P2)

As a visitor, I need crisp brand marks, hero visuals, project artwork, icons and a downloadable CV
served from the site itself, so the portfolio looks complete and high-craft even on restricted
networks.

**Why this priority**: Assets define the signature look of the design board and must exist
before the hero (Phase 3) and project cards (Phase 4) are built.

**Independent Test**: Every asset listed in [data-model.md](./data-model.md) §2 exists, meets its
size target, has documented dimensions and alt text, and loads from the site's own origin with no
external requests.

**Acceptance Scenarios**:

1. **Given** `src/assets/images/`, **When** inspected, **Then** it contains the MA logo in gold and white plus a compact monogram mark (WebP + PNG), a theme-aware orbital hero background (SVG), a high-resolution side-profile hero portrait in multiple widths (AVIF/WebP/PNG), four project visuals (Health & Wellness, Travel & Lifestyle, Architecture, Project Card), and the profile photo.
2. **Given** `public/`, **When** inspected, **Then** it contains the CV at `docs/Mostafa-Abdel-Fattah-CV.pdf`, the SVG icon sprite `icons.svg`, favicons and a 1200×630 social-sharing image.
3. **Given** an icon is rendered from the sprite, **When** the theme changes, **Then** it recolors with the surrounding text and stays sharp at any size.

---

### Edge Cases

- **External font or CDN unreachable**: Fonts and icons are self-hosted (fonts bundled, icons in a local SVG sprite) with system font fallbacks, so no glyphs break and no external request is needed.
- **Reduced motion**: Motion tokens reduce durations to near-instant when the OS requests it.
- **Storage unavailable (private mode)**: Theme falls back to the OS preference, then dark, without errors.
- **Legacy files during migration**: Project data (`js/data.js`) moves to `legacy/data.js` and the CV moves to `public/docs/`; the old root `css/`, `js/` and `assets/` folders are removed only after both moves are verified, so no content is lost.
- **Low-resolution design-board sources**: Hero portrait and project visuals are generated at high resolution from the board as reference; if generation is unavailable, upscaled crops are used and flagged as temporary.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a `package.json` and `vite.config.js` supporting `npm run dev`, `npm run build` and `npm run preview`, with ES module bundling and HTML minification into `dist/`.
- **FR-002**: System MUST organize stylesheets under `src/styles/` using the reference folder layout (`tokens/`, `base/`, `layout/`, `components/`, `pages/home/`, `utilities/`, `vendor/`) orchestrated by `src/styles/main.css` in a fixed cascade order. Phase 1 delivers the files that carry foundation content:
  - `src/styles/tokens/` (`primitives.css`, `semantic-dark.css`, `semantic-light.css`, `typography.css`, `spacing.css`, `motion.css`, `components.css`)
  - `src/styles/base/` (`normalize.css`, `globals.css`)
  - `src/styles/layout/` (`container.css`)
  - `src/styles/utilities/` (`visually-hidden.css`)
  - Component and page-section stylesheets are created only for sections the portfolio actually has, in the phase that builds them (research R4); no empty placeholder files.
- **FR-003**: System MUST scaffold the Clean Architecture script directories under `src/scripts/` (`domain/`, `data/`, `presentation/`, `main.js`) with layer import boundaries enforced automatically.
- **FR-004**: System MUST provide all assets in [data-model.md](./data-model.md) §2 — MA logo (gold, white, compact mark), theme-aware orbital hero background, high-resolution side-profile portrait, four project visuals, profile photo, SVG icon sprite, favicons, social-sharing image and CV PDF — optimized for web delivery and served from the site's own origin.
- **FR-005**: System MUST provide automated quality checks (code linting, style linting, formatting, unit tests) runnable by single commands, all passing at phase close.
- **FR-006**: The page shell MUST render the visitor's stored or OS-preferred theme on first paint with no flash, include search and social-sharing metadata, a skip link and semantic landmarks, and keep all existing portfolio content readable without JavaScript.
- **FR-007**: All 33 existing projects and the CV MUST be preserved during migration.
- **FR-008**: Dark and light themes MUST define the identical set of semantic tokens, and switching themes MUST cause zero layout shift.

### Key Entities

- **DesignTokenSet**: Three tiers of CSS custom properties — primitives (raw palette and scales), semantic (theme-aware surfaces, text, accents, borders, focus, glow, shadow) and component-scoped tokens — plus typography, spacing and motion scales.
- **AssetManifest**: The documented list of local assets (path, formats, intrinsic size, size target, alt text, source) across `src/assets/` (bundled) and `public/` (stable URLs).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of Phase 1 directories and files exist and every `@import` in `src/styles/main.css` resolves.
- **SC-002**: The production build completes in under 10 seconds with 0 errors or unresolved asset references.
- **SC-003**: Both themes meet WCAG AA contrast — at least 4.5:1 for body and accent text, 3:1 for large headings, UI borders and focus indicators.
- **SC-004**: 100% of assets (logos, theme-aware hero background, hero portrait, project visuals, icons, favicons, social image, CV) load from the site's own origin; 0 external requests at runtime.
- **SC-005**: Lint, format check and unit tests report 0 errors at phase close.
- **SC-006**: On a mobile Lighthouse audit of the built shell: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95; largest content paint under 2.5 s and layout shift under 0.1.

## Assumptions

- Node.js (≥ 20) and npm are available; the first dependency install has network access.
- The side-profile portrait from the design board is the chosen hero image (user decision); the uploaded suit photo is kept for contact/about use and the social image.
- Design-board-only visuals are produced at high resolution using the board as reference; logos are processed from the uploaded high-resolution logo file.
- Font Awesome is not loaded in Phase 1; the `vendor/` folder is reserved for future third-party styles if a later phase needs them.
