import type { UserDto } from '@president-challenge/shared/dist/user/user-dto';
import { useUserStore } from '~/store/user/user.store';
import { NUXT_ROUTES } from '~~/config/routes/nuxt-routes';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $checkAuth } = useNuxtApp();
  const userStore = useUserStore();

  // Accès libre aux routes login/signup
  if (to.fullPath === NUXT_ROUTES.login || to.fullPath === NUXT_ROUTES.signup) {
    return;
  }

  // Vérification d'auth sur toutes les autres routes
  let user: UserDto | null;
  if (!userStore.user) {
    user = await $checkAuth();
  }
  else {
    user = userStore.user;
  }

  // Si utilisateur non authentifié, redirige vers login
  if (!user) {
    return navigateTo(NUXT_ROUTES.login);
  }

  // Mets à jour le store si besoin
  userStore.setUser(user);

  // Si route racine ('/'), redirige vers /games si loggé
  if (to.path === '/') {
    return navigateTo(NUXT_ROUTES.games);
  }
});
