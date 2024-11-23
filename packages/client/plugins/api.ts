import AuthModule from '../repository/modules/auth.module';
import GameModule from '../repository/modules/game.module';
import 'reflect-metadata';

export interface IApiInstance {
  auth: AuthModule;
  game: GameModule;
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const NUXT_BASE_URL_PROXY_SERVER: string = config.public.baseURLProxyServer;

  const apiFetcher = $fetch.create({
    baseURL: NUXT_BASE_URL_PROXY_SERVER,
  });

  const modules: IApiInstance = {
    auth: new AuthModule(apiFetcher),
    game: new GameModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
