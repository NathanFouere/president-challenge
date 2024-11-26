import { defineStore } from '../../../.nuxt/imports';

export const userUserDropdownStore = defineStore('userDropdownStore', {
  state: () => ({
    isLoggingOut: false,
  }),
  getters: {
    getIsLoggingOut(state): boolean {
      return state.isLoggingOut;
    },
  },
  actions: {
    setLoggingOut() {
      this.isLoggingOut = true;
    },
    unsetLoggingOut() {
      this.isLoggingOut = false;
    },
  },
});
