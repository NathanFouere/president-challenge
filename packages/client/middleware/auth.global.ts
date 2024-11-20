import type { User } from '@shared/types/user/user';
import { useUserStore } from '../store/user.store';

export default defineNuxtRouteMiddleware(async (to) => {
  const { $checkAuth } = useNuxtApp();

  if (to.name === 'login' || to.name === 'signup') {
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
    return navigateTo('/login');
  }
  else {
    userStore.setUser(user);
  }
});
