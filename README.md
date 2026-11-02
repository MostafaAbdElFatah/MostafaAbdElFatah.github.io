# Mostafa Abdel Fattah — Senior iOS Developer Portfolio

## Overview

High-performance, semantic, and accessibility-first personal portfolio of Mostafa Abdel Fattah Mohammed (Senior iOS Developer). Features 33 shipped projects spanning national platforms, government deployments, and commercial systems.

## Tech Stack

- **Build Tool**: Vite 8
- **Core Architecture**: Clean Architecture (Domain, Data, Presentation)
- **Styling**: Modern CSS with CSS Cascade Layers (`@layer`), three-tier Design Tokens (primitives, semantic, component), BEM methodology
- **Typography & Icons**: Self-hosted variable fonts (Playfair Display, Inter Variable, Noto Naskh Arabic) and inline SVG sprite (Lucide + Simple Icons)
- **Testing & Quality**: Vitest, JSDOM, ESLint (Clean Architecture import rules & HTML injection bans), Stylelint, Prettier

## Getting Started

Prerequisites: Node.js 18+

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Script            | Command                                                                              | Purpose                                                   |
| ----------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `dev`             | `vite`                                                                               | Start local Vite development server                       |
| `build`           | `vite build`                                                                         | Build minified static site to `dist/`                     |
| `preview`         | `vite preview`                                                                       | Locally preview `dist/` build                             |
| `lint`            | `npm run lint:js && npm run lint:css`                                                | Run JavaScript and CSS linters                            |
| `lint:js`         | `eslint .`                                                                           | Lint codebase with Clean Architecture boundary rules      |
| `lint:css`        | `stylelint "src/styles/**/*.css"`                                                    | Lint CSS tokens, BEM naming, and properties               |
| `format`          | `prettier --write .`                                                                 | Format all source files                                   |
| `format:check`    | `prettier --check .`                                                                 | Verify formatting across files                            |
| `test`            | `vitest run`                                                                         | Execute test suite                                        |
| `test:watch`      | `vitest`                                                                             | Run test suite in watch mode                              |
| `icons`           | `node src/tools/build-icons.mjs`                                                     | Build `public/icons.svg` sprite                           |
| `images`          | `node src/tools/optimize-images.mjs`                                                 | Generate AVIF, WebP, PNG, JPG image variants and favicons |
| `images:fallback` | `node src/tools/crop-board-fallback.mjs`                                             | Crop and upscale fallback board visuals                   |
| `render:fallback` | `node src/tools/render-static-projects.mjs && prettier --write src/pages/index.html` | Statically pre-render projects for no-JS environments     |

## Architecture

Strict adherence to Clean Architecture layers:

- **Domain (`src/scripts/domain/`)**: Pure business logic, entities, value objects, and repository contracts. No browser globals or dependencies on data/presentation.
- **Data (`src/scripts/data/`)**: Data sources and repository implementations. No presentation imports.
- **Presentation (`src/scripts/presentation/`)**: Controllers, view models, and DOM renderers. No data imports; dependencies are injected.
- **Composition Root (`src/scripts/main.js`)**: Entry point allowed to wire domain, data, and presentation.
- **Build tools (`src/tools/`)**: Node-only scripts (icon sprite, image optimization, static project render). Never shipped to the browser.

| Layer          | Can Import                       | Must Not Import                         |
| -------------- | -------------------------------- | --------------------------------------- |
| `domain`       | `domain`                         | `data`, `presentation`, browser globals |
| `data`         | `domain`, `data`                 | `presentation`                          |
| `presentation` | `domain`, `presentation`         | `data`                                  |
| `main.js`      | `domain`, `data`, `presentation` | (composition root)                      |

## Styles

Cascade layers declared in `src/styles/main.css` guarantee predictability without `!important`:

1. `reset`: `src/styles/base/normalize.css`
2. `vendor`: `src/styles/vendor/fonts.css`
3. `tokens`: `primitives.css`, `semantic-light.css`, `semantic-dark.css`, `components.css`, `spacing.css`, `typography.css`, `motion.css`
4. `base`: `src/styles/base/globals.css`
5. `layout`: `src/styles/layout/container.css`
6. `components`: `src/styles/components/skip-link.css`
7. `pages`: Page-specific scoped styles
8. `utilities`: `src/styles/utilities/visually-hidden.css`

## Assets

Complete documentation of dimensions, formats, alt text, and licensing is recorded in the [Asset Manifest](src/assets/README.md).

## Spec Kit Workflow

- **001-foundation-and-tokens**: Completed — Project Foundation, Modular Token System & Visual Assets
- **002-portfolio-core**: Planned — Dynamic project filtering, details modal, and search
- **003-editorial-design**: Planned — Enhanced typography, animations, and editorial layout
- **004-interactive-features**: Planned — Interactive CV, contact form, and media previews
- **005-polish-and-seo**: Planned — PWA features, performance tuning, and schema validations

## Commit Convention

Follows Conventional Commits (`<type>(<scope>): <description>` in imperative, lowercase, ≤ 72 chars):

- `feat(features): add responsive feature cards`
- `style(contact): refine contact section layout`
- `refactor(css): centralize design tokens and improve comments`
- `fix(pricing): correct price alignment`
- `chore(deps): update dependencies`
