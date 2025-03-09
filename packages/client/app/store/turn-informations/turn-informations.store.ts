export const useTurnInformationsStore = defineStore('turnInformationsStore', {
  state: () => ({
    maxTurnReached: false,
    eventNeedToBeAddress: false,
    defeat: false,
  }),
  getters: {
    getMaxTurnReached(state): boolean {
      return state.maxTurnReached;
    },
    getEventNeedToBeAddress(state): boolean {
      return state.eventNeedToBeAddress;
    },
    getDefeat(state): boolean {
      return state.defeat;
    },
  },
  actions: {
    setMaxTurnReached(maxTurnReached: boolean) {
      this.maxTurnReached = maxTurnReached;
    },
    setEventNeedToBeAddress(eventNeedToBeAddress: boolean) {
      this.eventNeedToBeAddress = eventNeedToBeAddress;
    },
    setDefeat(defeat: boolean) {
      this.defeat = defeat;
    },
  },
});
