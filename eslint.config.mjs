import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist', 'docs'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {},
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      // Ignore dependency rules in hooks, since everything is offending
      // 'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          filter: {
            regex: '^_', // this is where we differ from airBnb, allowing '_ignoredvariable' makes ignoring stuff a little bit better
            match: false,
          },
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      // override airBnB config to allow for of loops
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
          'for..in loops iterate over the entire prototype chain, which you probably wouldnt want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
      'no-restricted-properties': [
        'warn',
        {
          object: 'screen',
          property: 'debug',
          message: 'Please remove it when you are done debugging.',
        },
      ],
      curly: [2, 'multi-line'],
    },
  },
)
