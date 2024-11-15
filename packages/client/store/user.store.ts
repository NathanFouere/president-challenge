import type { User } from '@shared/typesuser/user';
import { defineStore } from '../.nuxt/imports';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    connectedUser(): User | null {
      return this.user;
    },
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },

    fetchUser() {
      const { $api } = useNuxtApp();
      try {
        $api.auth.authenticate().then((response: User) => {
          console.log(response);
        });
      }
      catch (error) {
        console.log(error);
      }
    },
  },
});
