// Builds public/icons.svg from Lucide (ISC) and Simple Icons (CC0) source SVGs.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const SOURCES = {
  lucide: 'node_modules/lucide-static/icons',
  simple: 'node_modules/simple-icons/icons',
};

// [sprite id, source set, file name in that set]
const ICONS = [
  ['sun', 'lucide', 'sun'],
  ['moon', 'lucide', 'moon'],
  ['download', 'lucide', 'download'],
  ['arrow-right', 'lucide', 'arrow-right'],
  ['menu', 'lucide', 'menu'],
  ['close', 'lucide', 'x'],
  ['check', 'lucide', 'check'],
  ['code', 'lucide', 'code'],
  ['layers', 'lucide', 'layers'],
  ['globe', 'lucide', 'globe'],
  ['user', 'lucide', 'user'],
  ['grid', 'lucide', 'layout-grid'],
  ['settings', 'lucide', 'settings'],
  ['mail', 'lucide', 'mail'],
  ['phone', 'lucide', 'phone'],
  ['github', 'simple', 'github'],
  ['linkedin', 'custom', 'linkedin'],
  ['app-store', 'simple', 'appstore'],
  ['google-play', 'simple', 'googleplay'],
];

const LINKEDIN_SVG =
  '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>';

const inner = (svg) =>
  svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .trim();

const symbols = ICONS.map(([id, set, name]) => {
  if (set === 'custom' && id === 'linkedin') {
    return `<symbol id="${id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${LINKEDIN_SVG}</symbol>`;
  }
  const file = `${SOURCES[set]}/${name}.svg`;
  if (!existsSync(file)) {
    throw new Error(`Missing ${file}. Find the right file name with ls and update ICONS.`);
  }
  const body = inner(readFileSync(file, 'utf8'));
  return set === 'lucide'
    ? `<symbol id="${id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${body}</symbol>`
    : `<symbol id="${id}" viewBox="0 0 24 24" fill="currentColor">${body}</symbol>`;
});

writeFileSync(
  'public/icons.svg',
  `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>\n`,
);
console.log(`Wrote ${symbols.length} icons to public/icons.svg`);
