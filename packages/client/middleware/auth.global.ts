import type { User } from '@shared/types/user/user';
import { useUserStore } from '../store/user.store';
import { ROUTES } from '../config/routes';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $checkAuth } = useNuxtApp();

  if (to.fullPath === ROUTES.login || to.fullPath === ROUTES.signup) {
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
    return navigateTo(ROUTES.login);
  }
  else {
    userStore.setUser(user);
  }
});
