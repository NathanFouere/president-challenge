import { NUXT_ROUTES } from '~~/config/routes/nuxt-routes';

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo(NUXT_ROUTES.games);
  }
});
