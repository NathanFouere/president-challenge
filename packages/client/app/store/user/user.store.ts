import type { User } from '@shared/user/user';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    connectedUser(state): User | null {
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
