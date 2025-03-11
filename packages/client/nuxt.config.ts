// https://nuxt.com/docs/api/configuration/nuxt-config
import 'reflect-metadata';

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/fonts',
  ],
  plugins: [
    '~/plugins/api.ts',
    '~/plugins/check-auth.ts',
    '~/plugins/inversify.ts',
  ],
  ssr: false,
  devtools: { enabled: true },
  ui: {
    global: true,
  },
  runtimeConfig: {
    public: {
      baseURLProxyServer: process.env.NUXT_PUBLIC_BASE_URL_PROXY_SERVER,
    },
  },
  build: {
    transpile: ['@nuxt/ui'],
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },
  compatibilityDate: '2024-04-03',
  vite: {
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
});
