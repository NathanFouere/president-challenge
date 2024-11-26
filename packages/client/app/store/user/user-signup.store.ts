export const useUserSignupStore = defineStore('userSignupStore', {
  state: () => ({
    isRegistering: false,
    error: '',
  }),
  getters: {
    getIsRegistering(state): boolean {
      return state.isRegistering;
    },
    getError(state): string {
      return state.error;
    },
  },
  actions: {
    setIsRegistering() {
      this.isRegistering = true;
    },
    unsetIsRegistering() {
      this.isRegistering = false;
    },
    setError(error: string) {
      this.error = error;
    },
  },
});
