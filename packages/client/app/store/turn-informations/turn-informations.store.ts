import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data';
import type { TurnInformationsDto } from '@president-challenge/shared/dist/turn-informations/turn-informations-dto';

export const useTurnInformationsStore = defineStore('turnInformationsStore', {
  state: () => ({
    turnInformations: null as TurnInformationsDto | null,
    turnProcessDatas: null as GameTurnProcessStreamData | null,
    gettingTurnInformations: true,
  }),
  getters: {
    getTurnProcessDatas(state): GameTurnProcessStreamData | null {
      return state.turnProcessDatas;
    },
    isGettingTurnInformations(state): boolean {
      return state.gettingTurnInformations;
    },
    getTurnInformations(state): TurnInformationsDto | null {
      return state.turnInformations;
    },
  },
  actions: {
    setTurnInformations(turnInformations: TurnInformationsDto) {
      this.turnInformations = turnInformations;
    },
    setTurnProcessDatas(turnProcessDatas: GameTurnProcessStreamData) {
      this.turnProcessDatas = turnProcessDatas;
    },
    unsetTurnProcessDatas() {
      this.turnProcessDatas = null;
    },
    setGettingTurnInformations() {
      this.gettingTurnInformations = true;
    },
    unsetGettingTurnInformations() {
      this.gettingTurnInformations = false;
    },
  },
});
