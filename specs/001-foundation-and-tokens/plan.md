# Implementation Plan: Phase 1 — Project Foundation, Modular Token System & Visual Assets

**Branch**: `001-foundation-and-tokens` | **Date**: 2026-11-01 | **Spec**: [spec.md](file:///Users/m.abdelfatah/Documents/Various/protofile/specs/001-foundation-and-tokens/spec.md)

**Input**: Feature specification from `/specs/001-foundation-and-tokens/spec.md`

## Summary

Refactor the repository into the target Vite modular architecture (`src/assets`, `src/scripts/{domain,data,presentation}`, `src/styles/{tokens,base,layout,components,pages/home,utilities,vendor/fontawesome}`), implement the complete dual-theme (Dark Obsidian & Gold / Light Alabaster & Gold) CSS token system, and extract/generate all visual assets from the provided design board (`MA` logos, Hero side-profile portrait, Dark & Light Hero orbital backgrounds, project card visuals, and CV PDF).

## Technical Context

**Language/Version**: HTML5, CSS3 (Custom Properties & Modular `@import`), JavaScript ES2022+ (`"type": "module"`)

**Primary Dependencies**: `vite`, `esbuild`, `html-minifier-terser`, `vite-plugin-html`

**Storage**: Static asset files in `src/assets/` and `localStorage` for theme preference

**Testing**: Build verification (`npm run build`), asset integrity verification, and CSS cascade inspection

**Target Platform**: Modern evergreen desktop & mobile browsers (iOS Safari, Chrome, Firefox, Edge)

**Project Type**: Modular single-page web application (Portfolio)

**Performance Goals**: `< 1s` First Contentful Paint, zero runtime network dependencies, clean CSS/JS bundle output in `dist/`

**Constraints**: Zero hardcoded hex/RGB colors outside `src/styles/tokens/`; strict Clean Architecture directory boundaries in `src/scripts/`

**Scale/Scope**: 31 modular CSS files, Clean Architecture JS directory scaffolding, 12+ brand & showcase visual assets

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Clean Architecture Separation**: `src/scripts/` is partitioned into `domain/`, `data/`, and `presentation/` with `main.js` as the composition root.
- [x] **II. SOLID Principles Enforcement**: Every CSS file and JS directory has a single, well-defined responsibility (SRP) and extensible token contracts (OCP).
- [x] **III. Modular Token-Driven CSS Architecture**: Matches the exact directory layout (`tokens/`, `base/`, `layout/`, `components/`, `pages/home/`, `utilities/`, `vendor/fontawesome/`, `main.css`) from the user's reference structure.
- [x] **IV. Spec-Driven Phased Delivery**: Scoped strictly to Phase 1 (`001-foundation-and-tokens`) with validated `spec.md` and `checklists/requirements.md`.
- [x] **V. Luxury Visual Fidelity, Bilingual RTL & Accessibility**: Includes Dark & Light semantic tokens, display serif + sans + Arabic font stacks, and `visually-hidden.css` / focus-visible base rules.

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-and-tokens/
├── spec.md              # Feature specification
├── plan.md              # This implementation plan
├── research.md          # Phase 0 architectural & asset decisions
├── data-model.md        # Token hierarchy & asset manifest
├── quickstart.md        # Build and verification commands
├── contracts/
│   └── css-tokens-and-assets.md
└── tasks.md             # Dependency-ordered implementation tasks
```

### Source Code (repository root)

```text
├── index.html
├── package.json
├── vite.config.js
├── dist/
└── src/
    ├── assets/
    │   ├── docs/
    │   │   └── Mostafa-Abdel-Fattah-CV.pdf
    │   └── images/
    │       ├── brand/
    │       │   ├── logo-ma-gold.png
    │       │   ├── logo-ma-gold.svg
    │       │   └── logo-ma-white.svg
    │       ├── hero/
    │       │   ├── hero-portrait-dark.png
    │       │   ├── hero-portrait-light.png
    │       │   ├── hero-bg-dark.png
    │       │   └── hero-bg-light.png
    │       ├── profile/
    │       │   └── profile-suit.png
    │       └── projects/
    │           ├── project-health.png
    │           ├── project-travel.png
    │           ├── project-architecture.png
    │           └── project-uiux.png
    ├── scripts/
    │   ├── main.js
    │   ├── domain/
    │   ├── data/
    │   └── presentation/
    └── styles/
        ├── main.css
        ├── base/
        │   ├── globals.css
        │   └── normalize.css
        ├── components/
        │   ├── article-card.css
        │   ├── dots-decoration.css
        │   ├── dropdown.css
        │   ├── navigation.css
        │   ├── scallop.css
        │   ├── section-heading.css
        │   ├── section-title.css
        │   ├── wave.css
        │   └── zigzag.css
        ├── layout/
        │   ├── container.css
        │   ├── footer.css
        │   └── header.css
        ├── pages/
        │   └── home/
        │       ├── features.css
        │       ├── gallery.css
        │       ├── hero.css
        │       ├── pricing.css
        │       ├── services.css
        │       ├── skills.css
        │       ├── statistics.css
        │       ├── team.css
        │       ├── testimonials.css
        │       ├── videos.css
        │       └── work-steps.css
        ├── tokens/
        │   ├── components.css
        │   ├── motion.css
        │   ├── primitives.css
        │   ├── semantic-dark.css
        │   ├── semantic-light.css
        │   ├── spacing.css
        │   └── typography.css
        ├── utilities/
        │   └── visually-hidden.css
        └── vendor/
            └── fontawesome/
                ├── css/
                │   └── all.min.css
                └── webfonts/
```

**Structure Decision**: Matches the exact Vite + modular CSS structure shown in the user's reference screenshots, paired with Clean Architecture subdirectories (`domain/`, `data/`, `presentation/`) inside `src/scripts/`.

## Complexity Tracking

No Constitution violations.
