import type { User } from '@shared/typesuser/user';
import { useUserStore } from '../store/user.store';

export default defineNuxtPlugin(() => {
  const checkAuth = async (): Promise<User | null> => {
    const userStore = useUserStore();
    const { $api } = useNuxtApp();

    if (!userStore.user) {
      try {
        // Appelle l'API pour récupérer les informations utilisateur
        const user: User = await $api.auth.me();
        userStore.setUser(user); // Met à jour le store
        return user;
      }
      catch (error) {
        console.error('Error in checkAuth:', error);
        return null;
      }
    }

    return userStore.user; // Retourne l'utilisateur stocké s'il existe
  };

  // Injecte la méthode `checkAuth` dans l'application Nuxt
  return {
    provide: {
      checkAuth,
    },
  };
});
