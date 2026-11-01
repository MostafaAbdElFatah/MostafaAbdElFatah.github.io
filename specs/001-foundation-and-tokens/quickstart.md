# Quickstart Validation Guide: Phase 1 — Foundation, Tokens & Assets

## Prerequisites

- Node.js (v18+ or v20+) and npm installed.

## Setup & Verification Commands

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Verify Directory Structure**:
   ```bash
   ls -la src/assets src/scripts src/styles/tokens src/styles/base src/styles/layout src/styles/components src/styles/pages/home src/styles/utilities src/styles/vendor/fontawesome
   ```

3. **Run Production Build**:
   ```bash
   npm run build
   ```
   - **Expected Outcome**: Vite compiles `index.html`, `src/styles/main.css`, and `src/scripts/main.js` into `dist/` (`dist/index.html` and `dist/assets/*`) with exit code `0`.

4. **Verify Extracted & Generated Visual Assets**:
   ```bash
   ls -la src/assets/images src/assets/images/projects src/assets/docs
   ```
   - **Expected Outcome**: All logos, Hero portraits/backgrounds, project card images, and CV PDF are present and non-empty.
