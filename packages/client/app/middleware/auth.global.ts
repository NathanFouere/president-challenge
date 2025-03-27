import type { UserDto } from '@president-challenge/shared/dist/user/user-dto';
import { useUserStore } from '../store/user/user.store';
import { NUXT_ROUTES } from '../../config/routes/nuxt-routes';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $checkAuth } = useNuxtApp();

  if (to.fullPath === NUXT_ROUTES.login || to.fullPath === NUXT_ROUTES.signup) {
    return;
  }

  const userStore = useUserStore();

  let user: UserDto | null;

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
