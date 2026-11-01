# Phase 0 Research: Project Foundation, Modular Token System & Visual Assets

## Decision 1: Build Tooling & Bundler Configuration

- **Decision**: Use **Vite** (`vite: ^8.3.5` or compatible locally installable Vite release, `esbuild: ^0.28.2`, `html-minifier-terser: ^7.2.0`, `vite-plugin-html: ^3.2.2`) with `"type": "module"` in `package.json`.
- **Rationale**: Directly matches the user's requested `package.json` configuration and sample project structure (`vite.config.js`, `index.html`, `src/`, `dist/`). Vite natively bundles `@import` chains in `src/styles/main.css` and ES module graphs in `src/scripts/main.js` into optimized production assets under `dist/assets/`.
- **Alternatives considered**:
  - Raw unbundled HTML/CSS/JS: Rejected because the target structure requires modular `@import` compilation, asset hashing, and `dist/` generation via `vite build`.
  - Webpack/Parcel: Rejected in favor of the user's explicit Vite configuration.

## Decision 2: Layered CSS Token & Cascade Architecture

- **Decision**: Structure `src/styles/` into 7 explicit layers imported in strict cascade order inside `src/styles/main.css`:
  1. `vendor/fontawesome/css/all.min.css`
  2. `tokens/` (`primitives.css`, `semantic-dark.css`, `semantic-light.css`, `typography.css`, `spacing.css`, `motion.css`, `components.css`)
  3. `base/` (`normalize.css`, `globals.css`)
  4. `utilities/` (`visually-hidden.css`)
  5. `layout/` (`container.css`, `header.css`, `footer.css`)
  6. `components/` (`navigation.css`, `section-heading.css`, `section-title.css`, `article-card.css`, `dropdown.css`, `dots-decoration.css`, `scallop.css`, `wave.css`, `zigzag.css`)
  7. `pages/home/` (`hero.css`, `features.css`, `gallery.css`, `pricing.css`, `services.css`, `skills.css`, `statistics.css`, `team.css`, `testimonials.css`, `videos.css`, `work-steps.css`)
- **Rationale**: Guarantees predictable specificity and enforces Single Responsibility Principle (SRP) and Open/Closed Principle (OCP) in styling—every token, base reset, layout container, component, and page section has a dedicated, single-purpose file matching the user's reference screenshots.
- **Alternatives considered**:
  - Monolithic `css/style.css`: Rejected because it violates the modular architecture requirement.
  - Tailwind utility classes: Rejected because the user provided an explicit custom CSS token + component directory tree.

## Decision 3: Visual Asset Extraction & Generation Strategy

- **Decision**:
  1. Copy and optimize the user-uploaded `MA` gold logo (`media_1793518098575_fa1fe7fa.png`) to `src/assets/images/logo-ma-gold.png`, and provide crisp vector SVG counterparts (`logo-ma-gold.svg`, `logo-ma-white.svg`) for lossless scaling in navigation and footer.
  2. Extract high-resolution crops from the user-uploaded design board (`media_1793518098581_0845a983.jpg`) for:
     - Hero side-profile developer portrait (`src/assets/images/hero-portrait-dark.png`, `src/assets/images/hero-portrait-light.png`)
     - Dark & Light Hero golden orbital wave backgrounds (`src/assets/images/hero-bg-dark.png`, `src/assets/images/hero-bg-light.png` + high-DPI SVG orbital overlay)
     - Project showcase card visuals (`project-health.png`, `project-travel.png`, `project-architecture.png`, `project-uiux.png`)
  3. Preserve the user's uploaded suit portrait (`src/assets/images/profile-suit.png`) and CV (`src/assets/docs/Mostafa-Abdel-Fattah-CV.pdf`) so all personal assets are safely retained in `src/assets/`.
- **Rationale**: Ensures 100% offline/self-hosted reliability and pixel-accurate alignment with the luxury gold design board without relying on fragile external image URLs.
- **Alternatives considered**:
  - Fetching external stock images from the web: Rejected per user instruction ("find my attachments new design and assets if assets can’t get it from net") and sandbox self-containment.
