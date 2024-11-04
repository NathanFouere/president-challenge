// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'path';

// eslint-disable-next-line no-undef
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  alias: {
    // eslint-disable-next-line no-undef
    '@shared': path.resolve(__dirname, '../shared/src'),
  },

  modules: ['@nuxt/ui']
});