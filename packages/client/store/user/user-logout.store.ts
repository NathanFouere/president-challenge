import { defineStore } from '../../.nuxt/imports';

export const useUserLogoutStore = defineStore('userLogoutStore', {
  state: () => ({
    isLoggingOut: false,
    error: '',
  }),
  getters: {
    getIsLoggingOut(state): boolean {
      return state.isLoggingOut;
    },
    getError(state): string {
      return state.error;
    },
  },
  actions: {
    setLoggingOut() {
      this.isLoggingOut = true;
    },
    unsetLoggingOut() {
      this.isLoggingOut = false;
    },
    setError(error: string) {
      this.error = error;
    },
  },
});
