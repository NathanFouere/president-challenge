// fix https://github.com/nuxt/nuxt/discussions/19290
export default defineNuxtPlugin(async () => {
  if (import.meta.server && typeof globalThis.crypto === 'undefined') {
    const { Crypto } = await import('@peculiar/webcrypto');
    globalThis.crypto = new Crypto();
  }
});
