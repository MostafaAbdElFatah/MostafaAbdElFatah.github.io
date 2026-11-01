# Phase 0 Research: Foundation, Tokens & Assets

**Constitution**: v1.1.0 | **Updated**: 2026-11-01

All Technical Context unknowns are resolved below. Format: Decision / Rationale / Alternatives.

---

## R1. Build tooling

- **Decision**: Vite with the user-specified manifest (`"type": "module"`, `vite ^8.3.5`,
  `esbuild ^0.28.2`, `vite-plugin-html ^3.2.2`, `html-minifier-terser ^7.2.0`). Root `index.html`
  is the entry; output goes to `dist/`. `vite-plugin-html` handles minification and injects
  `<title>`/meta values from one config object.
- **Rationale**: Matches the user's package.json and reference tree; native ESM + CSS `@import`
  bundling, hashed assets, fast dev server.
- **Alternatives**: Unbundled static files (no hashing/minification), Webpack/Parcel (not requested).

## R2. Lint, format & test tooling (Constitution VII)

- **Decision**: Add devDependencies `eslint` + `@eslint/js` + `globals` (flat config),
  `stylelint` + `stylelint-config-standard`, `prettier`, `vitest` + `jsdom`.
  Scripts: `lint`, `lint:js`, `lint:css`, `format`, `format:check`, `test`, `test:watch`.
- **Rationale**: Constitution VII makes `npm run lint`, `npm run format:check`, `npm test` mandatory
  phase gates; establishing them in Phase 1 means every later phase is checked from day one.
- **Alternatives**: Biome (single tool, but no mature CSS linting for BEM/token rules);
  Jest (heavier, duplicates Vite transform pipeline).

## R3. Enforcing Clean Architecture boundaries (Constitution I)

- **Decision**: ESLint `no-restricted-imports` overrides per layer plus `no-restricted-globals`:
  - `src/scripts/domain/**`: may not import `../data/**`, `../presentation/**`; may not use
    `window`, `document`, `localStorage`, `navigator`.
  - `src/scripts/data/**`: may not import `../presentation/**`.
  - `src/scripts/presentation/**`: may not import `../data/**` (only `main.js` wires data).
- **Rationale**: Turns architectural rules into failing lint errors rather than review comments,
  with zero extra dependencies.
- **Alternatives**: `eslint-plugin-boundaries` / `dependency-cruiser` (more powerful, extra deps —
  revisit if layers grow).

## R4. Stylesheet structure vs. reference tree

- **Decision**: Adopt the reference **folder** layout exactly (`tokens/`, `base/`, `layout/`,
  `components/`, `pages/home/`, `utilities/`, `vendor/fontawesome/`, `main.css`) but create
  **only files for sections the portfolio actually has**, named by portfolio purpose. Each file is
  created in the phase that implements it; `main.css` grows per phase.

  | Reference file (template) | Portfolio file | Phase |
  |---|---|---|
  | tokens/* (7 files) | same 7 files | 1 |
  | base/normalize.css, globals.css | same | 1 |
  | utilities/visually-hidden.css | same | 1 |
  | layout/container.css | same | 1 |
  | layout/header.css, footer.css | same | 3 / 5 |
  | components/navigation.css, section-heading.css | same | 3 |
  | components/(button, chip, icon-badge, theme-toggle, orbit-decoration) | new | 3 |
  | components/article-card.css | components/project-card.css | 4 |
  | pages/home/hero.css, statistics.css | same | 3 |
  | pages/home/features.css, gallery.css | pages/home/projects.css, catalogue.css | 4 |
  | pages/home/skills.css, services.css, work-steps.css | skills.css, services.css (expertise), work-steps.css (approach) | 5 |
  | pricing.css, team.css, testimonials.css, videos.css, dropdown, scallop, wave, zigzag, dots | **not created** (no matching content) | — |
- **Rationale**: Constitution II (SRP) and VII (bundle budget) forbid empty/unused files; Principle IV
  forbids implementing later-phase UI in Phase 1. Folder parity keeps the user's familiar structure.
- **Alternatives**: Create all 31 reference files as stubs (dead code, misleading names, fails SRP).
- **Spec impact**: FR-002 updated accordingly.

## R5. Icons (Constitution VI: SVG sprite preferred)

- **Decision**: Primary icon system is an inline SVG sprite `src/assets/icons/sprite.svg`
  (sun, moon, download, arrow-right, menu, check, code, layers, globe, user, grid, settings,
  github, linkedin, mail, phone, app-store, google-play) rendered via `<svg><use href="#id">`.
  `vendor/fontawesome/` folder is kept but **subset** — only if a later phase needs a glyph not in
  the sprite; it is NOT imported in Phase 1.
- **Rationale**: Full Font Awesome CSS + 4 woff2 ≈ 300 KB, breaking the 60 KB CSS budget. The design
  board shows ~12 icons — a sprite is < 8 KB, themable via `currentColor`, crisp at any DPI.
- **Alternatives**: Full Font Awesome (budget violation); per-icon `<img>` (no `currentColor`).
- **Logged in plan Complexity Tracking** (reference tree lists fontawesome as active vendor).

## R6. Fonts (self-hosted, `font-display: swap`)

- **Decision**: `@fontsource/playfair-display` (display serif, weights 500/600, latin subset),
  `@fontsource-variable/inter` (UI/body), `@fontsource/noto-naskh-arabic` (400/500, arabic subset),
  imported at the top of `src/styles/main.css` (vendor layer) so Vite bundles the woff2 files into
  `dist/assets/`; `tokens/typography.css` only declares the font-family stacks. Preload the
  Playfair 600 and Inter files used above the fold.
- **Rationale**: Matches the design board (high-contrast serif headline "Building mobile
  experiences", clean sans body); no runtime CDN (Constitution constraint); fontsource ships
  `font-display: swap`.
- **Alternatives**: Google Fonts CDN (runtime network dependency); system fonts only (loses brand).

## R7. Visual assets — source quality & generation strategy

Available sources: logo PNG 1536×1024 (white background) and suit photo 768×1344 (transparent PNG).
No design board was supplied.

| Asset | Strategy | Reason |
|---|---|---|
| MA logo gold | Trim + remove white background (near-white → alpha) with `sharp`; export `logo-ma-gold.png` (2×, ≤ 600px wide) and `.webp` | Source is high quality; vectors would not match the calligraphy |
| MA logo white | Derived from gold alpha mask, filled `#f6f3ee` | Consistent shape, needed for dark surfaces |
| Monogram-only mark (nav/favicon) | Crop "MA" without tagline → `logo-ma-mark.png/.webp`, favicons 32/180/512 | Tagline unreadable at 32px |
| Hero dark/light backgrounds | **Authored as SVG + CSS** (`hero-orbit.svg`: thin gold elliptical arcs + star dots; radial gold glow via tokens) | Board crop would be ~1024px & JPEG-blurry; SVG is < 5 KB, crisp, theme-tinted via `currentColor` |
| Hero side-profile portrait | Generate hi-res (≥ 1200×1500, transparent/black-fade) via image-generator using the board as reference; export AVIF/WebP + PNG fallback, `srcset` 480/800/1200 | Board crop is ~230px — unusable as LCP image. **User choice: side-profile from board** |
| Project card visuals (4) | Generate hi-res phone-mockup artwork (Health & Wellness, Travel & Lifestyle, Architecture, Project Card) from board reference; 800×600 WebP + fallback | Board crops ~180px wide |
| Suit photo | Keep as `profile-suit.webp/.png` for About/contact / OG image | Preserve user asset |
| CV | Move to `public/docs/Mostafa-Abdel-Fattah-CV.pdf` (served at stable URL, not hashed) | Stable download link |
| OG image | 1200×630 composed from logo + headline on obsidian | SEO (Constitution VI) |

- **Fallback**: if image generation is unavailable, crop from the board and upscale 2× with
  `sharp` (lanczos3), flagged as temporary in `src/assets/README.md`.
- **Optimization pipeline**: `scripts/optimize-images.mjs` (devDependency `sharp`), run via
  `npm run images`; outputs committed to `src/assets/images/` so builds stay deterministic.
- **Alternatives**: Downloading stock imagery from the web (not the user's design; sandbox has no
  network); `vite-imagetools` (on-the-fly, slower builds, extra dep surface).

## R8. Theme bootstrap without flash (Constitution V)

- **Decision**: A ≤ 400-byte inline `<script>` in `<head>` reads `localStorage['theme']`, falls back
  to `prefers-color-scheme`, sets `document.documentElement.dataset.theme` before CSS paints. Also
  `<meta name="color-scheme" content="dark light">`. Full toggle logic arrives in Phase 2/3 via
  `ToggleThemeUseCase`.
- **Rationale**: The only reliable way to avoid a wrong-theme flash on static hosting.
- **Alternatives**: Set theme in `main.js` (runs after paint → flash).

## R9. Token naming & theming

- **Decision**: Three tiers — primitives (`--gold-500`), semantic (`--color-surface`,
  `--color-text`, `--color-accent`), component (`--btn-primary-bg`). Components only read semantic
  or component tokens. Light theme overrides semantic tokens only.
- **Rationale**: OCP — adding a theme means one new semantic file; no component edits.
- **Contrast**: Light theme accent text uses `--gold-700` (#7a5a1c on #fff ≈ 6.6:1) because
  bright gold (#c89d46 on #fff ≈ 2.6:1) fails AA for text; bright gold is reserved for fills/large
  display text with dark ink.

## R10. Legacy migration

- **Decision**: Phase 1 moves `assets/Mostafa-Abdel-Fattah-CV.pdf` → `public/docs/`, moves
  `js/data.js` → `legacy/data.js` (untouched, consumed by Phase 2 mapping), and deletes `css/` and
  `js/app.js` only after the new `index.html` builds. Root `index.html` is rewritten as the new
  shell (semantic landmarks, SEO meta, theme bootstrap) preserving the current content text as
  progressive-enhancement fallback until Phases 3–5 replace each section.
- **Rationale**: Constitution "content integrity" — no project data lost.
