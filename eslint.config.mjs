
import js from '@eslint/js';
import eslintPluginSolid from 'eslint-plugin-solid';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
    },
    plugins: {
      solid: eslintPluginSolid,
    },
    rules: {
      ...eslintPluginSolid.configs.recommended.rules,
      'no-return-await': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'indent': ['error', 2]
    },
    settings: {
      ...eslintPluginSolid.configs.recommended.settings,
    },
  },
];
