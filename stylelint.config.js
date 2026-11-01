const BEM = '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$';

/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'color-no-hex': true,
    'color-named': 'never',
    'function-disallowed-list': ['rgb', 'rgba', 'hsl', 'hsla'],
    'declaration-no-important': true,
    'selector-max-id': 0,
    'selector-max-compound-selectors': 3,
    'selector-class-pattern': [
      BEM,
      { message: 'Use BEM: block__element--modifier (Constitution III)' },
    ],
    'import-notation': 'string',
  },
  overrides: [
    {
      files: ['src/styles/tokens/**/*.css'],
      rules: { 'color-no-hex': null, 'function-disallowed-list': null },
    },
    {
      files: ['src/styles/utilities/**/*.css'],
      rules: { 'declaration-no-important': null },
    },
  ],
};
