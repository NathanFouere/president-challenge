import { Transmit } from '@adonisjs/transmit-client';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const sseClient = new Transmit({
    baseUrl: config.public.baseURLProxyServer,
  });

  return {
    provide: {
      sseClient: sseClient,
    },
  };
});
