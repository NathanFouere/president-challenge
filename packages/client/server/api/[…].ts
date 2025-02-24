import { joinURL } from 'ufo';
import { Routes } from './routes.server';

export default defineEventHandler(async (event) => {
  const coreUrl: string = useRuntimeConfig().NUXT_BASE_URL_JSON_PLACEHOLDER_SERVER as string;

  let path = '';
  let target = '';
  /*
    * Case: /api
    * */
  if (event.path.startsWith(Routes.core.name)) {
    path = event.path.replace(Routes.core.name, '');
    target = joinURL(coreUrl, path);
  }

  return proxyRequest(event, target);
});
