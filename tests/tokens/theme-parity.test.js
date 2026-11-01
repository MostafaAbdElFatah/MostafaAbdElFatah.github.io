import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (f) => readFileSync(new URL(`../../src/styles/tokens/${f}`, import.meta.url), 'utf8');
const names = (css) => new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));

const REQUIRED = [
  '--color-surface',
  '--color-surface-raised',
  '--color-surface-sunken',
  '--color-text',
  '--color-text-muted',
  '--color-accent',
  '--color-accent-fill',
  '--color-on-accent',
  '--color-border',
  '--color-border-strong',
  '--color-border-accent',
  '--color-focus-ring',
  '--glow-hero',
  '--shadow-card',
];

describe('semantic theme tokens', () => {
  const dark = names(read('semantic-dark.css'));
  const light = names(read('semantic-light.css'));

  it('dark and light define the identical set of tokens', () => {
    expect([...dark].sort()).toEqual([...light].sort());
  });

  it.each(REQUIRED)('both themes define %s', (token) => {
    expect(dark.has(token)).toBe(true);
    expect(light.has(token)).toBe(true);
  });
});
