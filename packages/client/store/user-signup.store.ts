import { defineStore } from '../.nuxt/imports';

export const useUserSignupStore = defineStore('userSignupStore', {
  state: () => ({
    isRegistering: false,
  }),
  getters: {
    getIsRegistering(state): boolean {
      return state.isRegistering;
    },
  },
  actions: {
    setIsRegistering() {
      this.isRegistering = true;
    },
    unsetIsRegistering() {
      this.isRegistering = false;
    },
  },
});
