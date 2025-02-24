import type { User } from '@shared/user/user';
import { useUserStore } from '~/store/user/user.store';

export default defineNuxtPlugin(() => {
  const checkAuth = async (): Promise<User | null> => {
    const userStore = useUserStore();
    const { $api } = useNuxtApp();

    if (!userStore.connectedUser) {
      try {
        const user: User = await $api.auth.me();
        userStore.setUser(user);
        return user;
      }
      catch (error) {
        console.error('Error in checkAuth:', error);
        return null;
      }
    }

    return userStore.user;
  };

  return {
    provide: {
      checkAuth,
    },
  };
});
