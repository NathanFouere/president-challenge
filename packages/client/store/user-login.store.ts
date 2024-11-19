import { defineStore } from '../.nuxt/imports';

export const useUserLoginStore = defineStore('userLoginStore', {
  state: () => ({
    isLogging: false,
  }),
  getters: {
    getIsLogging(state): boolean {
      return state.isLogging;
    },
  },
  actions: {
    setLogging() {
      this.isLogging = true;
    },
    unsetLogging() {
      this.isLogging = false;
    },
  },
});
