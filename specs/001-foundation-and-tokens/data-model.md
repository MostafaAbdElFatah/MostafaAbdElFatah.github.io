# Phase 1 Data Model: Design Tokens & Asset Manifest

**Constitution**: v1.1.0

Phase 1 has no runtime domain entities (those arrive in Phase 2). Its "data" is the design-token
system and the asset manifest.

---

## 1. Design Token System (`src/styles/tokens/`)

### 1.1 Tier rules

| Tier | File(s) | May be referenced by | Validation |
|---|---|---|---|
| Primitive | `primitives.css` | semantic & component tokens only | Raw values only; no `var()` to other tiers |
| Semantic | `semantic-dark.css`, `semantic-light.css` | components, layout, pages, base | Both files define the **identical** set of property names |
| Scale | `typography.css`, `spacing.css`, `motion.css` | everyone | Theme-independent |
| Component | `components.css` | matching component stylesheet | Built from semantic + scale tokens |

Stylelint rule: `color-no-hex` + `declaration-property-value-disallowed-list` for raw colors
everywhere except `src/styles/tokens/**`.

### 1.2 Primitives (`primitives.css`, `:root`)

| Group | Tokens |
|---|---|
| Obsidian | `--obsidian-950 #070605`, `--obsidian-900 #0b0a09`, `--obsidian-850 #11100e`, `--obsidian-800 #161412`, `--obsidian-700 #221f1b`, `--obsidian-600 #332e27` |
| Ivory | `--ivory-50 #ffffff`, `--ivory-100 #fcfbf9`, `--ivory-150 #f7f4ee`, `--ivory-200 #efeae0`, `--ivory-300 #dfd8ca`, `--ivory-400 #b8b0a2`, `--ivory-500 #8c8478`, `--ivory-600 #5e584f` |
| Gold | `--gold-200 #f5e2b8`, `--gold-300 #ebd094`, `--gold-400 #deb868`, `--gold-500 #c89d46`, `--gold-600 #9e782b`, `--gold-700 #7a5a1c` |
| Gradients | `--gradient-gold: linear-gradient(135deg, #f3dcab 0%, #d5ad58 52%, #b88933 100%)` |
| Alpha | `--gold-alpha-08`, `--gold-alpha-16`, `--gold-alpha-32` (rgba of gold-500) |

### 1.3 Semantic tokens (same names in both themes)

| Token | Dark | Light | Contrast target |
|---|---|---|---|
| `--color-surface` | obsidian-900 | ivory-100 | — |
| `--color-surface-raised` | obsidian-850 | ivory-50 | — |
| `--color-surface-sunken` | obsidian-950 | ivory-150 | — |
| `--color-text` | ivory-150 | obsidian-900 | ≥ 15:1 |
| `--color-text-muted` | ivory-400 | ivory-600 | ≥ 4.5:1 |
| `--color-accent` (text/links) | gold-400 | gold-700 | ≥ 4.5:1 |
| `--color-accent-fill` | gold-500 | gold-500 | non-text, ≥ 3:1 vs surface |
| `--color-on-accent` | obsidian-900 | obsidian-900 | ≥ 7:1 on gold fill |
| `--color-border` | obsidian-700 | ivory-200 | decorative dividers/card outlines (no contrast requirement) |
| `--color-border-strong` | ivory-500 | ivory-500 | ≥ 3:1 — borders of interactive controls |
| `--color-border-accent` | gold-alpha-32 | gold-alpha-32 | — |
| `--color-focus-ring` | gold-300 | gold-700 | ≥ 3:1 |
| `--glow-hero` | radial gold-alpha-16 | radial gold-alpha-08 | decorative |
| `--shadow-card` | dark elevation | soft elevation | decorative |

### 1.4 Scales

- **Typography**: `--font-display` (Playfair Display, Georgia, serif), `--font-sans` (Inter
  Variable, system-ui, sans-serif), `--font-arabic` (Noto Naskh Arabic, Geeza Pro, serif); fluid
  sizes `--text-xs … --text-5xl` and `--text-hero: clamp(2.5rem, 6vw, 4.5rem)`; line-heights;
  `--tracking-wide: .2em` (for "SENIOR iOS DEVELOPER" eyebrow).
- **Spacing**: `--space-1 … --space-24` (4px base), `--container-max: 75rem`,
  `--container-pad: clamp(1rem, 4vw, 2rem)`, radii `--radius-sm 6px, --radius-md 10px,
  --radius-lg 16px, --radius-xl 24px, --radius-pill 999px`; breakpoints documented as comments
  (custom properties cannot be used in media queries): 48rem / 64rem / 90rem.
- **Motion**: `--ease-standard`, `--ease-out-expo`, `--duration-fast 120ms`,
  `--duration-base 200ms`, `--duration-slow 400ms`; under
  `@media (prefers-reduced-motion: reduce)` durations become `0.01ms`.

### 1.5 Component tokens (`components.css`)

`--header-height`, `--btn-height`, `--btn-radius`, `--btn-primary-bg (gradient-gold)`,
`--btn-primary-fg`, `--btn-secondary-border`, `--chip-bg`, `--chip-bg-active`,
`--icon-badge-size 3rem`, `--icon-badge-border`, `--card-radius`, `--card-bg`, `--card-border`,
`--tap-target-min 2.75rem` (44px ≥ WCAG 24px minimum).

---

## 2. Asset Manifest

| ID | Path | Formats | Size target | Used in |
|---|---|---|---|---|
| logo-gold | `src/assets/images/brand/logo-ma-gold` | webp, png | ≤ 40 KB | Hero / footer |
| logo-white | `src/assets/images/brand/logo-ma-white` | webp, png | ≤ 40 KB | Dark surfaces |
| logo-mark | `src/assets/images/brand/logo-ma-mark` | webp, png, svg-free | ≤ 10 KB | Nav |
| favicons | `public/favicon-32.png`, `apple-touch-icon.png` (180), `icon-512.png` | png | — | `<head>` |
| hero-orbit | `src/assets/images/hero/hero-orbit.svg` | svg | ≤ 5 KB | Hero bg (both themes) |
| hero-portrait | `src/assets/images/hero/hero-portrait-{480,800,1200}` | avif, webp, jpg | ≤ 120 KB @800 webp | Hero (LCP) |
| project-health | `src/assets/images/projects/project-health` | webp, jpg | ≤ 60 KB | Phase 4 cards |
| project-travel | `src/assets/images/projects/project-travel` | webp, jpg | ≤ 60 KB | Phase 4 cards |
| project-architecture | `src/assets/images/projects/project-architecture` | webp, jpg | ≤ 60 KB | Phase 4 cards |
| project-card | `src/assets/images/projects/project-card` | webp, jpg | ≤ 60 KB | Phase 4 cards |
| profile-suit | `src/assets/images/profile/profile-suit` | webp, png | ≤ 80 KB | Contact/about |
| og-image | `public/og-image.jpg` (1200×630) | jpg | ≤ 150 KB | Social cards |
| icons | `public/icons.svg` | svg | ≤ 8 KB | All phases |
| fonts | `public/fonts/*.woff2` (4 files) | woff2 | ≤ 160 KB total | All phases |
| cv | `public/docs/Mostafa-Abdel-Fattah-CV.pdf` | pdf | as-is | Download CTA |
| legacy data | `legacy/data.js` | js | as-is | Phase 2 migration input |

**Validation**: every raster has an explicit intrinsic size recorded in
`src/assets/README.md` (needed for `width`/`height` attributes); every non-decorative image gets
an `alt` string defined alongside it.
