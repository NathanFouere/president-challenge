export const useTurnInformationsStore = defineStore('turnInformationsStore', {
  state: () => ({
    allowChangeTurn: false,
  }),
  getters: {
    isAllowingChangeTurn(state) {
      return state.allowChangeTurn;
    },
  },
  actions: {
    setAllowChangeTurn(allows: boolean) {
      this.allowChangeTurn = allows;
    },
  },
});
