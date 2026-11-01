---
description: "Task list for Phase 1 — Project Foundation, Modular Token System & Visual Assets"
---

# Tasks: Phase 1 — Project Foundation, Modular Token System & Visual Assets

**Input**: Design documents from `/specs/001-foundation-and-tokens/`
**Prerequisites**: [plan.md](file:///Users/m.abdelfatah/Documents/Various/protofile/specs/001-foundation-and-tokens/plan.md), [spec.md](file:///Users/m.abdelfatah/Documents/Various/protofile/specs/001-foundation-and-tokens/spec.md), [research.md](file:///Users/m.abdelfatah/Documents/Various/protofile/specs/001-foundation-and-tokens/research.md), [data-model.md](file:///Users/m.abdelfatah/Documents/Various/protofile/specs/001-foundation-and-tokens/data-model.md), [css-tokens-and-assets.md](file:///Users/m.abdelfatah/Documents/Various/protofile/specs/001-foundation-and-tokens/contracts/css-tokens-and-assets.md)

**Organization**: Tasks are grouped by user story (`US1`, `US2`, `US3`) to enable independent implementation and verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`US1`, `US2`, `US3`)
- Exact file paths are included in every description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Vite configuration, package manifest, and gitignore rules

- [ ] T001 Create `package.json` with `"type": "module"`, Vite scripts (`dev`, `build`, `preview`), and devDependencies in `/Users/m.abdelfatah/Documents/Various/protofile/package.json`
- [ ] T002 [P] Create `vite.config.js` with HTML minification and `dist/` output configuration in `/Users/m.abdelfatah/Documents/Various/protofile/vite.config.js`
- [ ] T003 [P] Update `.gitignore` to ignore `node_modules/`, `dist/`, and `.DS_Store` in `/Users/m.abdelfatah/Documents/Various/protofile/.gitignore`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Scaffold Clean Architecture and Modular CSS directory trees

- [ ] T004 Create Clean Architecture script directories (`src/scripts/domain`, `src/scripts/data`, `src/scripts/presentation`) and asset directories (`src/assets/images/projects`, `src/assets/docs`) in `/Users/m.abdelfatah/Documents/Various/protofile/src/`
- [ ] T005 [P] Create modular CSS directories (`base`, `components`, `layout`, `pages/home`, `tokens`, `utilities`, `vendor/fontawesome/css`, `vendor/fontawesome/webfonts`) in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/`

**Checkpoint**: Directory tree matches target architecture — user story implementation can begin

---

## Phase 3: User Story 1 - Standardized Modular Project Structure & Build Pipeline (Priority: P1) 🎯 MVP

**Goal**: Provide a complete, compilable modular CSS & JS file tree orchestrated by `src/styles/main.css`, `src/scripts/main.js`, and `index.html`.

**Independent Test**: Run `npm run build` and verify that all `@import` statements in `src/styles/main.css` and module imports in `src/scripts/main.js` compile cleanly into `dist/`.

### Implementation for User Story 1

- [ ] T006 [P] [US1] Create CSS reset in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/base/normalize.css` and global element rules in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/base/globals.css`
- [ ] T007 [P] [US1] Create accessibility utility stylesheet in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/utilities/visually-hidden.css`
- [ ] T008 [P] [US1] Create layout stylesheets (`container.css`, `header.css`, `footer.css`) in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/layout/`
- [ ] T009 [P] [US1] Create component stylesheets (`article-card.css`, `dots-decoration.css`, `dropdown.css`, `navigation.css`, `scallop.css`, `section-heading.css`, `section-title.css`, `wave.css`, `zigzag.css`) in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/components/`
- [ ] T010 [P] [US1] Create home page section stylesheets (`features.css`, `gallery.css`, `hero.css`, `pricing.css`, `services.css`, `skills.css`, `statistics.css`, `team.css`, `testimonials.css`, `videos.css`, `work-steps.css`) in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/pages/home/`
- [ ] T011 [US1] Create master stylesheet entrypoint importing all layers in deterministic order in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/main.css`
- [ ] T012 [US1] Create composition root entrypoint in `/Users/m.abdelfatah/Documents/Various/protofile/src/scripts/main.js` and update `/Users/m.abdelfatah/Documents/Various/protofile/index.html` to reference `/src/styles/main.css` and `/src/scripts/main.js`

**Checkpoint**: Modular project structure and build pipeline compile cleanly

---

## Phase 4: User Story 2 - Dual-Theme Luxury Gold Design Token System (Priority: P1)

**Goal**: Implement the complete Dark (Obsidian & Gold) and Light (Alabaster & Gold) design token system under `src/styles/tokens/`.

**Independent Test**: Toggle `data-theme="dark"` and `data-theme="light"` on `<html>` and verify all primitive, semantic, typography, spacing, motion, and component CSS custom properties resolve with proper contrast.

### Implementation for User Story 2

- [ ] T013 [P] [US2] Implement raw color, gold gradient, and scale primitives in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/tokens/primitives.css`
- [ ] T014 [P] [US2] Implement Dark theme (`:root, [data-theme="dark"]`) semantic tokens in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/tokens/semantic-dark.css`
- [ ] T015 [P] [US2] Implement Light theme (`[data-theme="light"]`) semantic tokens in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/tokens/semantic-light.css`
- [ ] T016 [P] [US2] Implement editorial serif, geometric sans, and RTL Arabic typography tokens in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/tokens/typography.css`
- [ ] T017 [P] [US2] Implement spatial grid, container widths, and border-radius tokens in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/tokens/spacing.css`
- [ ] T018 [P] [US2] Implement easing curves, durations, and `prefers-reduced-motion` tokens in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/tokens/motion.css`
- [ ] T019 [P] [US2] Implement component-scoped tokens (buttons, chips, cards, navbar, circular gold icon badges) in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/tokens/components.css`

**Checkpoint**: Dual-theme luxury gold design token system complete

---

## Phase 5: User Story 3 - Brand & Visual Asset Availability (Priority: P2)

**Goal**: Populate `src/assets/` and `src/styles/vendor/fontawesome/` with all brand logos, extracted Hero side-profile portraits & golden orbital backgrounds, project card visuals, icons, and CV PDF.

**Independent Test**: Verify all asset files exist in `src/assets/` and `src/styles/vendor/fontawesome/` and load without errors.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Copy uploaded gold MA logo to `/Users/m.abdelfatah/Documents/Various/protofile/src/assets/images/logo-ma-gold.png` and create crisp vector SVG logos (`logo-ma-gold.svg`, `logo-ma-white.svg`) in `/Users/m.abdelfatah/Documents/Various/protofile/src/assets/images/`
- [ ] T021 [P] [US3] Extract high-resolution Hero side-profile portraits (`hero-portrait-dark.png`, `hero-portrait-light.png`) and golden orbital backgrounds (`hero-bg-dark.png`, `hero-bg-light.png`) from the design board into `/Users/m.abdelfatah/Documents/Various/protofile/src/assets/images/`
- [ ] T022 [P] [US3] Extract high-resolution project card visuals (`project-health.png`, `project-travel.png`, `project-architecture.png`, `project-uiux.png`) from the design board into `/Users/m.abdelfatah/Documents/Various/protofile/src/assets/images/projects/`
- [ ] T023 [P] [US3] Migrate `Mostafa-Abdel-Fattah-CV.pdf` to `/Users/m.abdelfatah/Documents/Various/protofile/src/assets/docs/Mostafa-Abdel-Fattah-CV.pdf` and preserve `profile-suit.png` in `/Users/m.abdelfatah/Documents/Various/protofile/src/assets/images/profile-suit.png`
- [ ] T024 [P] [US3] Set up local FontAwesome stylesheet (`all.min.css`) andwebfont placeholders/assets in `/Users/m.abdelfatah/Documents/Various/protofile/src/styles/vendor/fontawesome/`

**Checkpoint**: All visual, font, and document assets available locally

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize README, preserve legacy data for Phase 2 migration, and verify production build (`dist/`)

- [ ] T025 Update `/Users/m.abdelfatah/Documents/Various/protofile/README.md` with architecture documentation, Spec Kit workflow phases, and build instructions
- [ ] T026 Install dependencies and run `npm run build` to verify `dist/index.html` and `dist/assets/` generation

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** → **Phase 2 (Foundational)** → **Phases 3, 4, 5 (US1, US2, US3 can proceed in parallel)** → **Phase 6 (Polish & Build Validation)**.
