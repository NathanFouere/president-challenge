import type { User } from '@shared/types/user/user';
import { useUserStore } from '../store/user.store';
import { NUXT_ROUTES } from '../config/routes/nuxt-routes';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $checkAuth } = useNuxtApp();

  if (to.fullPath === NUXT_ROUTES.login || to.fullPath === NUXT_ROUTES.signup) {
    return;
  }

  const userStore = useUserStore();

  let user: User | null;

  if (!userStore.user) {
    user = await $checkAuth();
  }
  else {
    user = userStore.user;
  }

  if (!user) {
    return navigateTo(NUXT_ROUTES.login);
  }
  else {
    userStore.setUser(user);
  }
});
