# Phase 1 Data Model: Design Tokens & Asset Manifest

## 1. Design Token Hierarchy (`src/styles/tokens/`)

### 1.1 Primitive Tokens (`primitives.css`)
Raw, theme-agnostic color, opacity, and radius scales:
- **Obsidian / Charcoal Scale**: `--primitive-obsidian-950: #070605`, `--primitive-obsidian-900: #0b0a09`, `--primitive-obsidian-850: #11100e`, `--primitive-obsidian-800: #161412`, `--primitive-obsidian-700: #221f1b`, `--primitive-obsidian-600: #332e27`
- **Alabaster / Ivory Scale**: `--primitive-ivory-50: #ffffff`, `--primitive-ivory-100: #fcfbf9`, `--primitive-ivory-150: #f7f4ee`, `--primitive-ivory-200: #efeae0`, `--primitive-ivory-300: #dfd8ca`, `--primitive-ivory-400: #b8b0a2`, `--primitive-ivory-500: #8c8478`
- **Metallic Gold Scale**: `--primitive-gold-200: #f5e2b8`, `--primitive-gold-300: #ebd094`, `--primitive-gold-400: #deb868`, `--primitive-gold-500: #c89d46`, `--primitive-gold-600: #9e782b`, `--primitive-gold-700: #755619`
- **Gold Gradients**:
  - `--primitive-gradient-gold-cta`: `linear-gradient(135deg, #f3dcab 0%, #d5ad58 52%, #b88933 100%)`
  - `--primitive-gradient-gold-text`: `linear-gradient(135deg, #f6e3ba 0%, #d8b261 55%, #b58938 100%)`

### 1.2 Semantic Theme Tokens (`semantic-dark.css` & `semantic-light.css`)
Mapped to `:root, [data-theme="dark"]` and `[data-theme="light"]`:
- **Surfaces**: `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-elevated`, `--color-bg-card`, `--color-bg-glass`
- **Typography / Ink**: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-accent`, `--color-text-on-gold`
- **Borders & Dividers**: `--color-border-subtle`, `--color-border-default`, `--color-border-gold`, `--color-border-gold-strong`
- **Interactive / CTA**: `--color-cta-primary-bg`, `--color-cta-primary-fg`, `--color-cta-secondary-bg`, `--color-cta-secondary-border`

### 1.3 Typography, Spacing, Motion & Component Tokens
- **`typography.css`**:
  - `--font-display`: `"Playfair Display", "Cormorant Garamond", Georgia, "Times New Roman", serif`
  - `--font-sans`: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - `--font-arabic`: `"Geeza Pro", "Noto Naskh Arabic", "SF Arabic", Tahoma, sans-serif`
  - Fluid `clamp()` font sizes (`--text-xs` through `--text-hero`)
- **`spacing.css`**: 4px/8px spatial grid (`--space-1` through `--space-24`), container max-widths (`--container-max: 1200px`), and border radii (`--radius-sm` through `--radius-pill`).
- **`motion.css`**: Easing curves (`--ease-out-expo`, `--ease-standard`) and transition durations (`--duration-fast`, `--duration-normal`, `--duration-slow`).
- **`components.css`**: Scoped variables for buttons, chips, cards, navigation bar height (`--header-height`), and icon circular badges.

---

## 2. Visual Asset Manifest (`src/assets/`)

| Asset ID | Relative Path | Format | Purpose |
|----------|---------------|--------|---------|
| `logo-ma-gold-png` | `src/assets/images/logo-ma-gold.png` | PNG | High-res uploaded metallic gold MA developer logo |
| `logo-ma-gold-svg` | `src/assets/images/logo-ma-gold.svg` | SVG | Vector gold MA monogram for crisp navbar/hero branding |
| `logo-ma-white-svg` | `src/assets/images/logo-ma-white.svg` | SVG | Vector white MA monogram for dark-background contrast |
| `hero-portrait-dark` | `src/assets/images/hero-portrait-dark.png` | PNG | Side-profile developer visual with dark golden orbital aura |
| `hero-portrait-light` | `src/assets/images/hero-portrait-light.png` | PNG | Side-profile developer visual with light golden orbital aura |
| `hero-bg-dark` | `src/assets/images/hero-bg-dark.png` | PNG | Dark golden orbital mesh background |
| `hero-bg-light` | `src/assets/images/hero-bg-light.png` | PNG | Light golden orbital mesh background |
| `project-health` | `src/assets/images/projects/project-health.png` | PNG | Health & Wellness iOS App Design card visual |
| `project-travel` | `src/assets/images/projects/project-travel.png` | PNG | Travel & Lifestyle App Design card visual |
| `project-architecture` | `src/assets/images/projects/project-architecture.png` | PNG | Clean Architecture layers showcase card visual |
| `project-uiux` | `src/assets/images/projects/project-uiux.png` | PNG | Mobile App UI/UX showcase card visual |
| `cv-pdf` | `src/assets/docs/Mostafa-Abdel-Fattah-CV.pdf` | PDF | Downloadable curriculum vitae |
