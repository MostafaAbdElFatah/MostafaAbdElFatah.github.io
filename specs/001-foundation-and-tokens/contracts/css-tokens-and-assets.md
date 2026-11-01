# Interface Contract: CSS Design Tokens & Asset Paths

## 1. Root Theme Attribute Contract

The HTML root element (`<html>`) MUST expose a `data-theme` attribute supporting two valid states:
- `data-theme="dark"` (Default)
- `data-theme="light"`

All stylesheets under `src/styles/base/`, `src/styles/layout/`, `src/styles/components/`, and `src/styles/pages/home/` MUST consume only semantic and component tokens:

```css
/* Required Semantic Surface & Ink Contract */
var(--color-bg-primary)
var(--color-bg-secondary)
var(--color-bg-card)
var(--color-text-primary)
var(--color-text-secondary)
var(--color-text-muted)
var(--color-accent-gold)
var(--color-border-subtle)
var(--color-border-gold)
var(--gradient-gold-primary)
```

## 2. Stylesheet Entrypoint Contract (`src/styles/main.css`)

`src/styles/main.css` MUST import every modular stylesheet in exact cascade order:

```css
/* 1. Vendor */
@import "./vendor/fontawesome/css/all.min.css";

/* 2. Design Tokens */
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
@import "./layout/header.css";
@import "./layout/footer.css";

/* 6. Components */
@import "./components/navigation.css";
@import "./components/section-heading.css";
@import "./components/section-title.css";
@import "./components/article-card.css";
@import "./components/dropdown.css";
@import "./components/dots-decoration.css";
@import "./components/scallop.css";
@import "./components/wave.css";
@import "./components/zigzag.css";

/* 7. Pages - Home */
@import "./pages/home/hero.css";
@import "./pages/home/features.css";
@import "./pages/home/gallery.css";
@import "./pages/home/pricing.css";
@import "./pages/home/services.css";
@import "./pages/home/skills.css";
@import "./pages/home/statistics.css";
@import "./pages/home/team.css";
@import "./pages/home/testimonials.css";
@import "./pages/home/videos.css";
@import "./pages/home/work-steps.css";
```
