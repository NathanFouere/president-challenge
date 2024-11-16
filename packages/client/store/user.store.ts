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

    async fetchUser(email: string, password: string) {
      const { $api } = useNuxtApp();
      try {
        $api.auth.login(email, password).then((response: User) => {
          this.setUser(response);
        });
      }
      catch (error) {
        console.log(error);
      }
    },

    async fetchMe() {
      const { $api } = useNuxtApp();
      try {
        $api.auth.me().then((response: User) => {
          this.setUser(response);
        });
      }
      catch (error) {
        console.log(error);
      }
    },

    async registerUser(email: string, fullName: string, password: string) {
      const { $api } = useNuxtApp();
      try {
        $api.auth.register(email, fullName, password).then((response: User) => {
          this.setUser(response);
        });
      }
      catch (error) {
        console.log(error);
      }
    },
  },
});
