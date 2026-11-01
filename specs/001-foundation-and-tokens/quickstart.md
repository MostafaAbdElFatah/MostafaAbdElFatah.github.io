# Quickstart Validation: Phase 1 — Foundation, Tokens & Assets

**Constitution**: v1.1.0

## Prerequisites

- Node.js ≥ 20 (workspace has v24.13.1), npm ≥ 10
- Network access for the first `npm install`

## 1. Install

```bash
npm install
```
Expected: exits 0; `node_modules/` created; no peer-dependency errors.

## 2. Quality gates (all must exit 0)

```bash
npm run lint          # ESLint + Stylelint, incl. layer-boundary and no-raw-color rules
npm run format:check  # Prettier
npm test              # Vitest: boundary fixture test + token parity test
npm run build         # Vite -> dist/
```

Expected `dist/`: `index.html` (minified), `assets/*.css`, `assets/*.js`, hashed fonts/images,
`docs/Mostafa-Abdel-Fattah-CV.pdf`, `og-image.jpg`, favicons.

## 3. Structure check

```bash
ls src/styles/{tokens,base,utilities,layout} src/scripts/{domain,data,presentation} \
   src/assets/images/{brand,hero,projects,profile} src/assets/icons public/docs legacy
```
Expected: every directory exists; `css/` and `js/` at the repo root are gone; `legacy/data.js`
still contains all 33 project entries.

## 4. Theme & token scenarios (manual, `npm run dev`)

| # | Action | Expected |
|---|---|---|
| 1 | Load page with OS in dark mode, empty storage | `<html data-theme="dark">`, obsidian surface, no flash |
| 2 | `localStorage.theme='light'`; reload | Light alabaster surface on first paint, no flash |
| 3 | DevTools contrast check on body text & accent text, both themes | ≥ 4.5:1 |
| 4 | Enable "Emulate prefers-reduced-motion" | Transitions effectively instant |
| 5 | Tab from page top | Skip link appears with visible gold focus ring |

## 5. Asset checks

- Network tab: zero requests to external origins.
- `hero-portrait-800.webp` ≤ 120 KB; sprite ≤ 8 KB; all rasters have `width`/`height` documented
  in `src/assets/README.md`.

## 6. Budget spot-check

```bash
npm run build && npx vite preview
```
Lighthouse (mobile) on the preview URL: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95,
SEO ≥ 95; LCP < 2.5 s; CLS < 0.1 (SC-006). Also record `time npm run build` (< 10 s, SC-002).
