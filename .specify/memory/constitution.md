<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0 (MINOR: two new principles + expanded workflow guidance)
- Modified principles:
  - I. Clean Architecture Separation — unchanged
  - II. SOLID Principles Enforcement — unchanged
  - III. Modular Token-Driven CSS Architecture — expanded (BEM naming, logical properties, no inline styles)
  - IV. Spec-Driven Phased Delivery — expanded (implementation MUST follow each phase's plan.md)
  - V. Luxury Visual Fidelity, Bilingual RTL & Accessibility — expanded (WCAG 2.2 AA explicit)
- Added principles:
  - VI. Frontend Engineering Best Practices
  - VII. Performance, Quality Gates & Tooling
- Added sections: none (existing sections expanded)
- Removed sections: none
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md (Constitution Check gates VI & VII)
  - ✅ updated: .specify/templates/tasks-template.md (frontend quality tasks in Polish phase)
  - ✅ verified (no change needed): .specify/templates/spec-template.md
  - ✅ verified (no change needed): .agents/skills/speckit-*/SKILL.md (generic references only)
  - ⚠ pending: specs/001-foundation-and-tokens/plan.md and tasks.md — re-run /speckit-plan and
    /speckit-tasks so Phase 1 adds lint/format tooling, Vitest setup and image optimization tasks
- Follow-up TODOs:
  - No root PLAN.md exists; the authoritative plan for each phase is specs/<phase>/plan.md.
-->
# Mostafa Abdel Fattah Portfolio Constitution

## Core Principles

### I. Clean Architecture Separation (NON-NEGOTIABLE)

All application code under `src/scripts/` MUST be separated into three concentric layers:

- **Domain (`src/scripts/domain/`)**: Pure entities (`Project`, `Category`, `SkillGroup`,
  `Statistic`, `Profile`), value objects, repository contracts, and use cases
  (`FilterProjectsUseCase`, `ToggleThemeUseCase`, `GetPortfolioSummaryUseCase`). Domain code MUST NOT
  reference `window`, `document`, `localStorage`, CSS classes, or any data/presentation module.
- **Data (`src/scripts/data/`)**: Concrete data sources (static portfolio dataset, `localStorage`
  theme storage) and repository implementations fulfilling Domain contracts. Raw data MUST be mapped
  to Domain entities before leaving this layer.
- **Presentation (`src/scripts/presentation/`)**: Controllers, view models and DOM renderers that
  invoke use cases. Presentation MUST NOT import data sources directly.

Dependencies MUST point inward only (presentation → domain ← data).

### II. SOLID Principles Enforcement (NON-NEGOTIABLE)

- **SRP**: Each module, class, and stylesheet MUST have one cohesive responsibility.
- **OCP**: Categories, filter strategies, theme palettes and card renderers MUST be extensible via
  configuration or composition without editing core use-case logic.
- **LSP**: Every concrete repository MUST be substitutable for its contract without behavior change.
- **ISP**: Consumers MUST depend on narrow, role-specific contracts (e.g. `ThemeReader` /
  `ThemeWriter`) rather than monolithic interfaces.
- **DIP**: Use cases and controllers MUST receive dependencies by constructor/factory injection
  wired exclusively in the composition root `src/scripts/main.js`.

### III. Modular Token-Driven CSS Architecture

All styles live under `src/styles/` and are orchestrated by `src/styles/main.css` in this cascade
order: `vendor/` → `tokens/` → `base/` → `utilities/` → `layout/` → `components/` → `pages/home/`.

- Hardcoded colors, spacing, radii, shadows and durations are prohibited outside `tokens/`; all
  other layers MUST consume CSS custom properties.
- Class names MUST follow BEM (`block__element--modifier`); styling MUST NOT target IDs or rely on
  deep descendant chains (max 3 levels of specificity nesting).
- Layout MUST use CSS logical properties (`margin-inline`, `padding-block`, `inset-inline-start`)
  so RTL content works without overrides.
- Inline `style` attributes and `!important` are prohibited except in `utilities/`.

### IV. Spec-Driven Phased Delivery

The redesign MUST be delivered in sequential Spec Kit phases, each with its own
`specs/00X-<phase>/` directory (`spec.md` → `plan.md` → `tasks.md` → implementation):

1. `001-foundation-and-tokens` — Vite setup, directory scaffolding, tokens, base styles, assets.
2. `002-clean-architecture-core` — Entities, contracts, repositories, use cases, composition root.
3. `003-hero-and-navigation` — Header, mobile navigation, theme toggle, Hero, statistics bar.
4. `004-projects-showcase` — Category filtering, featured project cards, full catalogue.
5. `005-skills-contact-and-polish` — Skills, contact, footer, responsive/a11y audit, build check.

Implementation MUST follow the active phase's `plan.md` exactly; any deviation MUST be recorded in
that plan's Complexity Tracking table before code is written. A phase MUST NOT begin until the
previous phase's tasks are all marked complete and its quality gates pass.

### V. Luxury Visual Fidelity, Bilingual RTL & Accessibility

- The UI MUST reproduce the gold-and-obsidian (Dark) and gold-and-alabaster (Light) design board,
  switching via `[data-theme]` on `<html>` with zero layout shift and no flash of wrong theme
  (theme resolved before first paint from stored preference or `prefers-color-scheme`).
- Arabic text MUST use `lang="ar"`, `dir="rtl"` and `unicode-bidi: isolate`.
- The site MUST meet **WCAG 2.2 AA**: semantic landmarks, one `<h1>`, logical heading order, visible
  `:focus-visible` states, ≥ 4.5:1 text contrast, ≥ 24×24px touch targets, `alt` text on every
  meaningful image (`alt=""` for decorative), ARIA only where native semantics are insufficient, full
  keyboard operability, and respect for `prefers-reduced-motion`.

### VI. Frontend Engineering Best Practices

- **Semantic HTML first**: Use native elements (`<button>`, `<nav>`, `<article>`, `<a>`) before
  custom widgets; links navigate, buttons act.
- **Progressive enhancement**: Core content (profile, projects, skills, contact) MUST be readable
  if JavaScript fails; JS enhances filtering, theming and motion.
- **Safe DOM rendering**: Dynamic content MUST be rendered with `textContent`, `createElement` or
  `<template>` cloning; `innerHTML` with interpolated data is prohibited. External links MUST use
  `rel="noopener noreferrer"`.
- **Modern JavaScript**: Native ES modules, `const`/`let`, no globals on `window`, no framework
  runtime in Domain/Data layers, event delegation for repeated elements, and cleanup of observers
  and listeners.
- **Responsive, mobile-first**: Styles are authored mobile-first with fluid `clamp()` typography
  and container-friendly layouts verified at 360px, 768px, 1024px and 1440px.
- **Asset discipline**: Images MUST be served in modern formats (WebP/AVIF with fallback), with
  explicit `width`/`height`, `srcset`/`sizes` where applicable, `loading="lazy"` below the fold and
  `fetchpriority="high"` for the Hero image. Fonts MUST be self-hosted with `font-display: swap`;
  icons SHOULD be inline SVG sprites rather than full icon-font payloads.
- **SEO & sharing**: Each build MUST include a descriptive `<title>`, meta description, canonical
  URL, Open Graph/Twitter cards, favicon set and JSON-LD `Person` structured data.

### VII. Performance, Quality Gates & Tooling

- **Performance budgets** (mobile, Lighthouse): Performance ≥ 90, Accessibility ≥ 95,
  Best Practices ≥ 95, SEO ≥ 95; LCP < 2.5s, CLS < 0.1, INP < 200ms; initial JS ≤ 50 KB gzip and
  CSS ≤ 60 KB gzip.
- **Linting & formatting**: ESLint (JS), Stylelint (CSS) and Prettier MUST pass with zero errors;
  `npm run lint` and `npm run format:check` scripts MUST exist.
- **Testing**: Domain use cases and Data repositories MUST have unit tests (Vitest); Presentation
  behavior SHOULD be covered by DOM tests (Vitest + jsdom). Tests run via `npm test`.
- **Build**: `npm run build` MUST succeed with zero warnings about unresolved assets.

## Architectural & Technical Constraints

- **Build System**: Vite with native ES modules (`"type": "module"`), `esbuild`,
  `vite-plugin-html` and `html-minifier-terser`; output to `dist/`.
- **Entry Points**: `index.html` imports `/src/styles/main.css` and `/src/scripts/main.js` only.
- **Browser Support**: Last 2 versions of evergreen browsers and iOS Safari 16+.
- **No runtime CDNs**: All fonts, icons, scripts and images are bundled locally.
- **Content integrity**: Existing portfolio data (projects, skills, contact, CV) MUST be preserved
  during refactoring; no shipped project may be dropped without explicit approval.

## Spec Kit Phased Workflow & Quality Gates

1. Each phase starts with `/speckit-specify`; its `checklists/requirements.md` MUST pass.
2. `/speckit-plan` MUST fill the Constitution Check for all seven principles; violations require a
   justified Complexity Tracking entry.
3. `/speckit-tasks` MUST produce file-explicit, dependency-ordered tasks per user story, including
   lint, test and accessibility verification tasks.
4. `/speckit-implement` follows `plan.md` and `tasks.md`; a phase closes only when `npm run lint`,
   `npm test` and `npm run build` pass and acceptance scenarios are verified.
5. `/speckit-analyze` SHOULD be run before implementation to confirm spec/plan/tasks consistency.

## Governance

This Constitution supersedes ad-hoc practices. Every plan and review MUST verify compliance with
all principles. Amendments require a documented rationale, a semantic version bump (MAJOR for
removed/redefined principles, MINOR for added/expanded guidance, PATCH for clarifications) and
synchronization of `.specify/templates/`. Phase `plan.md` files are the runtime implementation
guidance and MUST reference this Constitution's version.

**Version**: 1.1.0 | **Ratified**: 2026-11-01 | **Last Amended**: 2026-11-01
