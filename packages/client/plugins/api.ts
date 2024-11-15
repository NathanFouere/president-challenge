import AuthModule from '../repository/modules/auth.module';

export interface IApiInstance {
  auth: AuthModule;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const NUXT_BASE_URL_PROXY_SERVER: string = config.public.baseURLProxyServer;

  const apiFetcher = $fetch.create({
    baseURL: NUXT_BASE_URL_PROXY_SERVER,
  });

  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
