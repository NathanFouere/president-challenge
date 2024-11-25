import { defineStore } from '../../.nuxt/imports';

export const useUserLoginStore = defineStore('userLoginStore', {
  state: () => ({
    isLogging: false,
    error: '',
  }),
  getters: {
    getIsLogging(state): boolean {
      return state.isLogging;
    },
    getError(state): string {
      return state.error;
    },
  },
  actions: {
    setLogging() {
      this.isLogging = true;
    },
    unsetLogging() {
      this.isLogging = false;
    },
    setError(error: string) {
      this.error = error;
    },
  },
});
