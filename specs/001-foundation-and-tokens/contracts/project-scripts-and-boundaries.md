# Contract: npm Scripts, Layer Boundaries & HTML Shell

**Constitution**: v1.1.0

## 1. npm scripts (stable developer interface)

| Script | Command | Must succeed for phase close |
|---|---|---|
| `dev` | `vite` | — |
| `build` | `vite build` | ✅ |
| `preview` | `vite preview` | — |
| `lint` | `npm run lint:js && npm run lint:css` | ✅ |
| `lint:js` | `eslint .` | ✅ |
| `lint:css` | `stylelint "src/styles/**/*.css"` | ✅ |
| `format` | `prettier --write .` | — |
| `format:check` | `prettier --check .` | ✅ |
| `test` | `vitest run` | ✅ |
| `test:watch` | `vitest` | — |
| `images` | `node scripts/optimize-images.mjs` | — (outputs committed) |

## 2. Clean Architecture import rules (enforced by `eslint.config.js`)

| From \ To | domain | data | presentation | browser globals |
|---|---|---|---|---|
| `src/scripts/domain/**` | ✅ | ❌ | ❌ | ❌ (`window`, `document`, `localStorage`, `navigator`) |
| `src/scripts/data/**` | ✅ | ✅ | ❌ | ✅ (`localStorage` only via injected storage adapter) |
| `src/scripts/presentation/**` | ✅ | ❌ | ✅ | ✅ |
| `src/scripts/main.js` (composition root) | ✅ | ✅ | ✅ | ✅ |

Violations are ESLint **errors**. Phase 1 verifies the rules with a fixture test
(`tests/architecture/boundaries.test.js`) that lints known-bad snippets via the ESLint Node API.

## 3. HTML shell contract (`index.html`)

Required in `<head>`:
- `<meta charset>`, viewport, `<meta name="color-scheme" content="dark light">`
- `<title>` and `<meta name="description">` (injected by `vite-plugin-html`)
- canonical link, Open Graph (`og:title`, `og:description`, `og:image`, `og:type=profile`),
  `twitter:card=summary_large_image`
- favicon set (`/favicon-32.png`, `/apple-touch-icon.png`), `theme-color` for both schemes
- JSON-LD `Person` (name, jobTitle, url, sameAs: GitHub, LinkedIn)
- Inline theme bootstrap (≤ 400 bytes, runs before CSS):
  ```js
  (()=>{try{const s=localStorage.getItem('theme');document.documentElement.dataset.theme=
  s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')}
  catch{document.documentElement.dataset.theme='dark'}})();
  ```
- `<link rel="stylesheet">` via `/src/styles/main.css`; `<script type="module" src="/src/scripts/main.js">`

Required in `<body>`: skip link (`.visually-hidden-focusable` → `#main`), `<header>`,
`<main id="main">`, `<footer>`; exactly one `<h1>`; existing portfolio content kept as static
HTML fallback until replaced by later phases.
