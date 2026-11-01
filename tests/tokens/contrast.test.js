import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (f) => readFileSync(new URL(`../../src/styles/tokens/${f}`, import.meta.url), 'utf8');
const parseVars = (css) =>
  Object.fromEntries(
    [...css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  );

function resolve(value, vars, primitives) {
  const ref = value?.match(/^var\((--[a-z0-9-]+)\)$/);
  if (!ref) return value;
  return resolve(vars[ref[1]] ?? primitives[ref[1]], vars, primitives);
}

function luminance(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const PAIRS = [
  ['--color-text', '--color-surface', 15],
  ['--color-text-muted', '--color-surface', 4.5],
  ['--color-accent', '--color-surface', 4.5],
  ['--color-on-accent', '--color-accent-fill', 7],
  ['--color-focus-ring', '--color-surface', 3],
  ['--color-border-strong', '--color-surface', 3],
];

describe.each([
  ['dark', 'semantic-dark.css'],
  ['light', 'semantic-light.css'],
])('%s theme contrast', (_theme, file) => {
  it.each(PAIRS)('%s on %s ≥ %d:1', (fg, bg, min) => {
    const primitives = parseVars(read('primitives.css'));
    const vars = parseVars(read(file));
    const a = resolve(vars[fg], vars, primitives);
    const b = resolve(vars[bg], vars, primitives);
    expect(a, `${fg} must resolve to a hex color`).toMatch(/^#[0-9a-f]{3,6}$/i);
    expect(b, `${bg} must resolve to a hex color`).toMatch(/^#[0-9a-f]{3,6}$/i);
    expect(ratio(a, b)).toBeGreaterThanOrEqual(min);
  });
});
