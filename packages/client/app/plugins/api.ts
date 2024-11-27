import AuthModule from '../../server/repository/modules/auth.module';
import GameModule from '../../server/repository/modules/game.module';
import PoliticalPartyModule from '../../server/repository/modules/political-party.module';
import 'reflect-metadata';

export interface IApiInstance {
  auth: AuthModule;
  game: GameModule;
  politicalParty: PoliticalPartyModule;
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
    politicalParty: new PoliticalPartyModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
