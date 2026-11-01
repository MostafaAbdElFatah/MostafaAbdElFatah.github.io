# Domain layer

Pure business logic: entities, value objects, repository contracts and use cases.

- MAY import: other files in `domain/` only.
- MUST NOT import: `data/`, `presentation/`.
- MUST NOT use: `window`, `document`, `localStorage`, `sessionStorage`, `navigator`, `location`.
- Enforced by ESLint (`eslint.config.js`). Unit-tested with Vitest.
