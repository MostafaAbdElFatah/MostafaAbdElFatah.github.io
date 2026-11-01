# Implementation Plan: Phase 1 — Project Foundation, Modular Token System & Visual Assets

**Branch**: `001-foundation-and-tokens` | **Date**: 2026-11-01 | **Spec**: [spec.md](./spec.md)
**Constitution**: v1.1.0

**Input**: Feature specification from `/specs/001-foundation-and-tokens/spec.md`

## Summary

Replace the single-file site (`index.html` + `css/style.css` + `js/*.js` + Alpine CDN) with a Vite
project that follows the user's reference folder layout and the constitution's Clean Architecture
and frontend rules. Phase 1 delivers: the build/lint/format/test toolchain with architecture
boundaries enforced by ESLint; the three-tier dual-theme gold token system with no-flash theme
bootstrap; base/utility/container styles; a semantic, SEO-ready HTML shell that keeps existing
content as a fallback; and an optimized, locally hosted asset set (MA logos, SVG hero orbit,
hi-res side-profile portrait, project visuals, SVG icon sprite, favicons, OG image, CV).
Section UI (hero, nav, cards, skills, contact) is explicitly deferred to Phases 3–5.

## Technical Context

**Language/Version**: HTML5, CSS (custom properties, `@import`, logical properties), JavaScript ES2022 modules

**Primary Dependencies**: vite ^8.3.5, esbuild ^0.28.2, vite-plugin-html ^3.2.2, html-minifier-terser ^7.2.0;
fonts `@fontsource/playfair-display`, `@fontsource-variable/inter`, `@fontsource/noto-naskh-arabic`

**Dev Tooling**: eslint + @eslint/js + globals, stylelint + stylelint-config-standard, prettier, vitest + jsdom, sharp (image pipeline)

**Storage**: `localStorage['theme']` (bootstrap read only in Phase 1); static files in `src/assets/` and `public/`

**Testing**: Vitest — architecture boundary fixture test, token-parity test (dark/light define identical names), contrast test for semantic text pairs

**Target Platform**: Last 2 evergreen browsers, iOS Safari 16+

**Project Type**: Static single-page portfolio site (frontend only)

**Performance Goals**: Phase 1 CSS ≤ 15 KB gzip (excluding fonts), JS ≤ 2 KB gzip; Lighthouse A11y/BP/SEO ≥ 95 on the shell

**Constraints**: No runtime CDN; no raw colors outside `tokens/`; no `innerHTML` with data; no empty placeholder files; content integrity of all 33 projects

**Scale/Scope**: ~12 CSS files, 1 JS entry + empty layer folders with `README.md` contracts, ~20 optimized assets, 4 config files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.* — **Pre-research: PASS · Post-design: PASS**

- [x] **I. Clean Architecture Separation**: `domain/`, `data/`, `presentation/` created with layer `README.md` contracts; `main.js` is the sole composition root; ESLint `no-restricted-imports`/`no-restricted-globals` make violations errors (R3).
- [x] **II. SOLID Principles Enforcement**: One responsibility per CSS file; token tiers make themes open for extension (new theme = one semantic file) and closed for modification (R9). No empty stubs (R4).
- [x] **III. Modular Token-Driven CSS Architecture**: Reference folder layout adopted; cascade order fixed in `main.css`; Stylelint blocks hex/rgb outside `tokens/`, enforces BEM selector pattern, disallows `!important` and ID selectors; base styles use logical properties.
- [x] **IV. Spec-Driven Phased Delivery**: Scope limited to foundation; component/page CSS deferred with an explicit per-phase file map (R4).
- [x] **V. Luxury Visual Fidelity, Bilingual RTL & Accessibility**: Dark/light semantic sets with documented contrast (light accent text uses gold-700 for AA, R9); inline no-flash bootstrap (R8); Arabic font + `:lang(ar)` isolation rule in `globals.css`; skip link + focus ring; reduced-motion tokens.
- [x] **VI. Frontend Engineering Best Practices**: Semantic shell with landmarks and one `<h1>`; static content fallback (progressive enhancement); AVIF/WebP + fallback with `srcset`, `width`/`height`; self-hosted fonts with `swap`; SVG sprite icons; SEO/OG/JSON-LD.
- [x] **VII. Performance, Quality Gates & Tooling**: `lint`, `format:check`, `test`, `build` scripts with tests; asset size targets in data-model; Lighthouse spot-check in quickstart. One justified deviation (Font Awesome) — see Complexity Tracking.

## Project Structure

### Documentation (this feature)

```text
specs/001-foundation-and-tokens/
├── spec.md
├── plan.md                 # this file
├── research.md             # R1–R10 decisions
├── data-model.md           # token tiers + asset manifest
├── quickstart.md           # validation guide
├── contracts/
│   ├── css-tokens-and-assets.md
│   └── project-scripts-and-boundaries.md
├── checklists/requirements.md
└── tasks.md                # regenerate with /speckit-tasks
```

### Source Code (repository root, end of Phase 1)

```text
├── index.html                      # semantic shell, SEO, theme bootstrap, content fallback
├── package.json
├── vite.config.js
├── eslint.config.js                # incl. layer boundary rules
├── stylelint.config.js             # no raw colors outside tokens, BEM, no !important / IDs
├── .prettierrc.json / .prettierignore
├── vitest.config.js
├── README.md
├── legacy/
│   └── data.js                     # original project data, input for Phase 2
├── public/
│   ├── docs/Mostafa-Abdel-Fattah-CV.pdf
│   ├── og-image.jpg
│   ├── favicon-32.png  apple-touch-icon.png  icon-512.png
│   ├── icons.svg                   # SVG sprite built by scripts/build-icons.mjs
│   └── fonts/                      # 4 self-hosted woff2 files (preloadable stable URLs)
├── scripts/
│   ├── optimize-images.mjs         # sharp pipeline (npm run images)
│   ├── crop-board-fallback.mjs     # fallback crops from design board
│   ├── build-icons.mjs             # Lucide/Simple Icons → public/icons.svg
│   └── render-static-projects.mjs  # legacy/data.js → static HTML fallback in index.html
├── src/
│   ├── assets/
│   │   ├── README.md               # asset manifest: sizes, alt text, source
│   │   ├── source/                 # original uploads (not referenced by the site)
│   │   └── images/
│   │       ├── brand/   logo-ma-gold.{webp,png} logo-ma-white.{webp,png} logo-ma-mark.{webp,png}
│   │       ├── hero/    hero-orbit.svg hero-portrait-{480,800,1200}.{avif,webp,png}
│   │       ├── projects/ project-{health,travel,architecture,card}.{webp,png}
│   │       └── profile/ profile-suit.{webp,png}
│   ├── scripts/
│   │   ├── main.js                 # composition root (Phase 1: wiring placeholder; CSS is linked from index.html)
│   │   ├── domain/README.md
│   │   ├── data/README.md
│   │   └── presentation/README.md
│   └── styles/
│       ├── main.css
│       ├── tokens/      primitives.css semantic-dark.css semantic-light.css typography.css
│       │                spacing.css motion.css components.css
│       ├── base/        normalize.css globals.css
│       ├── utilities/   visually-hidden.css
│       ├── layout/      container.css
│       ├── components/  (Phases 3–5)
│       ├── pages/home/  (Phases 3–5)
│       └── vendor/fontawesome/  (reserved; not imported — see Complexity Tracking)
└── tests/
    ├── architecture/boundaries.test.js
    └── tokens/theme-parity.test.js  contrast.test.js
```

Removed at end of Phase 1: `css/`, `js/`, `assets/` (contents migrated), Alpine CDN script.

**Structure Decision**: Single Vite frontend project. Folder names mirror the user's reference
tree; files exist only when they carry real content, created in the phase that needs them
(file map in research R4).

## Phase sequencing inside this feature

1. Toolchain (package.json, Vite, ESLint/Stylelint/Prettier/Vitest configs) → `npm install`.
2. Directory scaffold + layer READMEs + legacy migration (CV → `public/docs`, data → `legacy/`).
3. Tokens (primitives → semantic dark/light → scales → component tokens) + parity/contrast tests.
4. Base, utilities, container, `main.css`, `main.js`.
5. HTML shell (SEO, bootstrap, skip link, landmarks, content fallback restyled with tokens).
6. Assets: logo processing, SVG orbit + sprite authoring, portrait/project generation, favicons,
   OG image, optimization pipeline, asset README.
7. Gates: lint → format:check → test → build → quickstart scenarios; delete legacy `css/`, `js/`.

## Risks

| Risk | Mitigation |
|---|---|
| Design-board crops are too low-res (board is 1024×682) | Generate hi-res portrait/project art from the board reference; crop+upscale fallback flagged in asset README |
| `vite ^8.3.5` / plugin peer ranges mismatch | Pin exact resolved versions in lockfile; if `vite-plugin-html` peer conflicts, document and use `--legacy-peer-deps` only after confirming build works |
| Font payload threatens LCP | Latin/arabic subsets only, 2–3 weights, preload only above-the-fold faces |
| `npm install` needs network | First install requires approval for network access |

## Complexity Tracking

| Violation / Deviation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Reference tree lists `vendor/fontawesome` as active; we keep the folder but do not import it, using an SVG sprite instead | Constitution VI prefers SVG sprites; full FA (~300 KB) breaks the VII CSS budget | Importing full FA violates budgets; subsetting FA still ships a font per glyph style |
| Reference page/component files (pricing, team, videos, testimonials, dropdown, scallop, wave, zigzag, dots) not created | No matching portfolio content; empty files violate SRP and add dead weight | Creating stubs adds misleading, unused code |
| Small inline `<script>` in `<head>` for theme bootstrap | Only way to prevent wrong-theme flash (Constitution V) | Running in `main.js` executes after first paint |
