# Contract: CSS Tokens, Cascade & Asset Paths

**Constitution**: v1.1.0

## 1. Theme attribute

`<html data-theme="dark|light">` — set before first paint by the inline bootstrap script
(see `contracts/project-scripts-and-boundaries.md` §3). Default when nothing stored:
`prefers-color-scheme`, else `dark`.

## 2. Semantic token surface (consumed by all non-token CSS)

```css
--color-surface  --color-surface-raised  --color-surface-sunken
--color-text     --color-text-muted
--color-accent   --color-accent-fill     --color-on-accent
--color-border   --color-border-strong   --color-border-accent   --color-focus-ring
--glow-hero      --shadow-card           --gradient-gold
```

Both `semantic-dark.css` (`:root, [data-theme="dark"]`) and `semantic-light.css`
(`[data-theme="light"]`) MUST define every name above. Removing or renaming one is a breaking
change requiring a constitution-compliant plan entry.

## 3. `src/styles/main.css` cascade (Phase 1 state)

```css
/* 1. Vendor (self-hosted fonts: @font-face pointing to /fonts/*.woff2 in public/) */
@import "./vendor/fonts.css";

/* 2. Tokens */
@import "./tokens/primitives.css";
@import "./tokens/semantic-dark.css";
@import "./tokens/semantic-light.css";
@import "./tokens/typography.css";
@import "./tokens/spacing.css";
@import "./tokens/motion.css";
@import "./tokens/components.css";

/* 3. Base */
@import "./base/normalize.css";
@import "./base/globals.css";

/* 4. Utilities */
@import "./utilities/visually-hidden.css";

/* 5. Layout */
@import "./layout/container.css";

/* 6. Components — appended by Phases 3–5 */
/* 7. Pages/home — appended by Phases 3–5 */
```

Later phases MUST append imports only inside their own layer block, never reorder layers.

## 4. Asset path contract

| Import style | Location | Example |
|---|---|---|
| Bundled/hashed (via `import` or CSS `url()`) | `src/assets/**` | `import portrait from '../assets/images/hero/hero-portrait-800.webp'` |
| Stable URL (not hashed) | `public/**` | `/docs/Mostafa-Abdel-Fattah-CV.pdf`, `/og-image.jpg`, `/favicon-32.png`, `/fonts/*.woff2` (preloaded in `<head>`) |
| Icon usage | `public/icons.svg` (built by `scripts/build-icons.mjs`) | `<svg class="icon" aria-hidden="true"><use href="/icons.svg#download"></use></svg>` |

Icon IDs (stable): `sun moon download arrow-right menu close check code layers globe user grid
settings github linkedin mail phone app-store google-play`.
