import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import nextPlugin from 'eslint-plugin-next';

/**
 * Flat ESLint configuration for the entire monorepo.
 * - Relies on Nx presets to bring in sensible TS + React rules.
 * - Does *not* enable type-aware linting (no `parserOptions.project`),
 *   removing the "Cannot read file 'tsconfig.json'" errors.
 */
export default [
  // Base JS rules (eslint:recommended)
  js.configs.recommended,

  // Nx workspace-wide TypeScript rules
  ...nxPlugin.configs.typescript,

  // React / JSX rules (a11y + hooks) – works for both Next.js & plain React
  ...nxPlugin.configs['react-jsx'],

  // Next.js specific rules (core web vitals)
  ...nextPlugin.configs['core-web-vitals'],

  // Your custom tweaks
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Ignore generated folders
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/build/**'],
  },
];
