import type { UserDto } from '@president-challenge/shared/dist/user/user-dto';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as UserDto | null,
  }),
  getters: {
    connectedUser(state): UserDto | null {
      return state.user;
    },
    hasConnectedUser(state): boolean {
      return state.user != null;
    },
  },
  actions: {
    setUser(user: UserDto) {
      this.user = user;
    },

    unsetUser() {
      this.user = null;
    },
  },
});
