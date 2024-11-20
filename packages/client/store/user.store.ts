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
    hasConnectedUser(): boolean {
      return !this.user;
    },
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },

    unsetUser() {
      this.user = null;
    },
  },
});
