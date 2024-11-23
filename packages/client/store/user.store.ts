import type { User } from '@shared/typesuser/user';
import { defineStore } from '../.nuxt/imports';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    connectedUser(state): User | null {
      return state.user;
    },
    requireConnectedUser(state): User {
      if (state.user == null) {
        throw new Error('No connected user');
      }
      return state.user;
    },
    hasConnectedUser(state): boolean {
      return state.user != null;
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
