import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data';

export const useTurnInformationsStore = defineStore('turnInformationsStore', {
  state: () => ({
    maxTurnReached: false,
    eventNeedToBeAddress: false,
    defeat: false,
    turnProcessDatas: null as GameTurnProcessStreamData | null,
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
    getTurnProcessDatas(state): GameTurnProcessStreamData | null {
      return state.turnProcessDatas;
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
    setTurnProcessDatas(turnProcessDatas: GameTurnProcessStreamData) {
      this.turnProcessDatas = turnProcessDatas;
    },
    unsetTurnProcessDatas() {
      this.turnProcessDatas = null;
    },
  },
});
