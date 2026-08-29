const tseslint = require('typescript-eslint');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    ignores: ['dist/', 'coverage/', 'node_modules/', '*.config.js', '*.config.ts', '*.test.js', '*.test.ts'],
  },
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  }
);
