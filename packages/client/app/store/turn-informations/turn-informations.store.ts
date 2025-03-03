export const useTurnInformationsStore = defineStore('turnInformationsStore', {
  state: () => ({
    maxTurnReached: false,
    eventNeedToBeAddress: false,
  }),
  getters: {
    getMaxTurnReached(state): boolean {
      return state.maxTurnReached;
    },
    getEventNeedToBeAddress(state): boolean {
      return state.eventNeedToBeAddress;
    },
  },
  actions: {
    setMaxTurnReached(maxTurnReached: boolean) {
      this.maxTurnReached = maxTurnReached;
    },
    setEventNeedToBeAddress(eventNeedToBeAddress: boolean) {
      this.eventNeedToBeAddress = eventNeedToBeAddress;
    },
  },
});
