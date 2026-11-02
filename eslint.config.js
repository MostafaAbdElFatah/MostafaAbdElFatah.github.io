import js from '@eslint/js';
import globals from 'globals';

const BROWSER_ONLY = [
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'navigator',
  'location',
];
const NO_HTML_INJECTION = 'Use textContent, createElement or <template> (Constitution VI).';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'public/**',
      'src/assets/**',
      '.specify/**',
      '.agents/**',
      '.claude/**',
      '.kiro/**',
      '.kilo/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-restricted-syntax': [
        'error',
        {
          selector: "AssignmentExpression[left.property.name='innerHTML']",
          message: NO_HTML_INJECTION,
        },
        {
          selector: "AssignmentExpression[left.property.name='outerHTML']",
          message: NO_HTML_INJECTION,
        },
        {
          selector: "CallExpression[callee.property.name='insertAdjacentHTML']",
          message: NO_HTML_INJECTION,
        },
      ],
    },
  },
  {
    files: ['*.config.js', 'src/tools/**/*.mjs', 'tests/**/*.js'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ['src/scripts/domain/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '(^|/)(data|presentation)/',
              message: 'Domain must not depend on data or presentation (Constitution I).',
            },
          ],
        },
      ],
      'no-restricted-globals': [
        'error',
        ...BROWSER_ONLY.map((name) => ({
          name,
          message: 'Domain must stay free of browser APIs (Constitution I).',
        })),
      ],
    },
  },
  {
    files: ['src/scripts/data/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '(^|/)presentation/',
              message: 'Data must not depend on presentation (Constitution I).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/scripts/presentation/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '(^|/)data/',
              message:
                'Presentation receives data through use cases; only main.js wires data (Constitution I).',
            },
          ],
        },
      ],
    },
  },
];
