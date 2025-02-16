// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
  features: {
    stylistic: {
      semi: true,
      indent: 2,
      quotes: 'single',
    },
    tooling: true,
  },
  dirs: {
    src: [
      'playground',
      'docs',
    ],
    componentsPrefixed: [
      'playground/components-prefixed',
    ],
  },
}).append(
  {
    ignores: [
      'packages-legacy/**',
    ],
  },
  {
    files: ['docs/**/*.vue'],
    rules: {
      'vue/no-v-html': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
);
