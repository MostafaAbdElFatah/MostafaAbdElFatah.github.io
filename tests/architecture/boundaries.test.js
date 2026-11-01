import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

const eslint = new ESLint();
async function ruleIds(code, filePath) {
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages.map((m) => m.ruleId);
}

describe('clean architecture boundaries', () => {
  it('domain cannot import data', async () => {
    const ids = await ruleIds(
      "import { x } from '../data/x.js';\nexport const y = x;\n",
      'src/scripts/domain/fixture.js',
    );
    expect(ids).toContain('no-restricted-imports');
  });

  it('domain cannot import presentation', async () => {
    const ids = await ruleIds(
      "import { x } from '../presentation/x.js';\nexport const y = x;\n",
      'src/scripts/domain/fixture.js',
    );
    expect(ids).toContain('no-restricted-imports');
  });

  it('domain cannot use browser globals', async () => {
    const ids = await ruleIds(
      'export const title = () => document.title;\n',
      'src/scripts/domain/fixture.js',
    );
    expect(ids).toContain('no-restricted-globals');
  });

  it('data cannot import presentation', async () => {
    const ids = await ruleIds(
      "import { x } from '../presentation/x.js';\nexport const y = x;\n",
      'src/scripts/data/fixture.js',
    );
    expect(ids).toContain('no-restricted-imports');
  });

  it('presentation cannot import data', async () => {
    const ids = await ruleIds(
      "import { x } from '../data/x.js';\nexport const y = x;\n",
      'src/scripts/presentation/fixture.js',
    );
    expect(ids).toContain('no-restricted-imports');
  });

  it('main.js may import every layer', async () => {
    const code =
      "import { a } from './domain/a.js';\nimport { b } from './data/b.js';\nimport { c } from './presentation/c.js';\nexport default [a, b, c];\n";
    expect(await ruleIds(code, 'src/scripts/main.js')).not.toContain('no-restricted-imports');
  });

  it('innerHTML assignment is banned', async () => {
    const ids = await ruleIds(
      'export const f = (el, s) => {\n  el.innerHTML = s;\n};\n',
      'src/scripts/presentation/fixture.js',
    );
    expect(ids).toContain('no-restricted-syntax');
  });
});
