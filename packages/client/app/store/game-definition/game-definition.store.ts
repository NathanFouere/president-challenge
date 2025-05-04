import type { GameDefinitionDto } from '@president-challenge/shared/dist/game/game-definition-dto';
import { defineStore } from '#imports';

export const useGameDefinitionStore = defineStore('gameDefinitionStore', {
  state: () => ({
    gameDefinitions: [] as GameDefinitionDto[],
    gettingGameDefinitions: false,
    creatingGameDefinitinIdentifer: null as string | null,
  }),
  getters: {
    getGameDefinitions(state): GameDefinitionDto[] {
      return state.gameDefinitions;
    },
    isGettingGameDefinitions(state): boolean {
      return state.gettingGameDefinitions;
    },
    getCreatingGameDefinitionIdentifier(state): string | null {
      return state.creatingGameDefinitinIdentifer;
    },
  },
  actions: {
    setGameDefinitions(gameDefinitions: GameDefinitionDto[]) {
      this.gameDefinitions = gameDefinitions;
    },
    setGettingGameDefinitions() {
      this.gettingGameDefinitions = true;
    },
    unsetGettingGameDefinitions() {
      this.gettingGameDefinitions = false;
    },
    setCreatingGameDefinitionIdentifier(identifier: string) {
      this.creatingGameDefinitinIdentifer = identifier;
    },
    unsetCreatingGameDefinitionIdentifier() {
      this.creatingGameDefinitinIdentifer = null;
    },
  },
});
