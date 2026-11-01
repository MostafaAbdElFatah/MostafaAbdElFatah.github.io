# Presentation layer

Controllers, view models and DOM renderers. Calls domain use cases; renders with
`textContent`, `createElement` or `<template>` cloning — never `innerHTML`.

- MAY import: `domain/`, other files in `presentation/`.
- MUST NOT import: `data/` (dependencies are injected by `src/scripts/main.js`).
