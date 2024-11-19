// https://nuxt.com/docs/api/configuration/nuxt-config
import * as path from 'node:path';
import 'reflect-metadata';

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  plugins: [
    '~/plugins/api.ts',
    '~/plugins/check-auth.ts',
  ],
  ssr: false,

  devtools: { enabled: true },
  ui: {
    global: true,
  },
  runtimeConfig: {
    public: {
      baseURLProxyServer: process.env.NUXT_PUBLIC_BASE_URL_PROXY_SERVER || 'http://localhost:3333',
    },
  },

  alias: {
    '@shared': path.resolve(__dirname, '../shared/src'),
  },
  build: {
    transpile: ['@nuxt/ui'],
  },
  compatibilityDate: '2024-04-03',
});
