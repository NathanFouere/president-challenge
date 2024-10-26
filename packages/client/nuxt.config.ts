// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
    '@shared': path.resolve(__dirname, '../shared/src'),
  }
});
