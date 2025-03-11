import type { MinimalGameDto } from '@president-challenge/shared/dist/game/minimal-game-dto';
import type { GameDto } from '@president-challenge/shared/dist/game/game-dto';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: [] as MinimalGameDto[],
    selectedGame: null as GameDto | null,
    creatingGame: false,
    errorOnCreatingGame: false,
    gettingGames: false,
    errorOnGettingGames: false,
    gamePendingDeletionId: null as number | null,
    changingTurn: false,
    selectingGameId: null as number | null,
  }),
  getters: {
    userGames(state): MinimalGameDto[] {
      return state.games;
    },
    getSelectingGameId(state): number | null {
      return state.selectingGameId;
    },
    isCreatingGame(state): boolean {
      return state.creatingGame;
    },
    isGettingGames(state): boolean {
      return state.gettingGames;
    },
    isChangingTurn(state): boolean {
      return state.changingTurn;
    },
    hasErrorOnCreatingGame(state): boolean {
      return state.errorOnCreatingGame;
    },
    hasErrorOnGettingGames(state): boolean {
      return state.errorOnGettingGames;
    },
    hasSelectedGame(state): boolean {
      return state.selectedGame != null;
    },
    getSelectedGame(state): GameDto | null {
      return state.selectedGame;
    },
    requireSelectedGame(state): GameDto {
      if (!state.selectedGame) {
        throw new Error('No game selected');
      }
      return state.selectedGame;
    },
    getSelectedGameId(state): number {
      if (!state.selectedGame) {
        throw new Error('No game selected');
      }
      return state.selectedGame.id;
    },
    getSelectedGameTurn(state): number {
      if (!state.selectedGame) {
        throw new Error('No game selected');
      }
      return state.selectedGame.turn;
    },
    getGamePendingDeletionId(state): number | null {
      return state.gamePendingDeletionId;
    },
  },
  actions: {
    setGames(games: MinimalGameDto[]) {
      this.games = games;
    },
    setSelectingGame(gameId: number) {
      this.selectingGameId = gameId;
    },
    unsetSelectingGame() {
      this.selectingGameId = null;
    },
    setChangingTurn() {
      this.changingTurn = true;
    },
    unsetChangingTurn() {
      this.changingTurn = false;
    },
    setCreatingGame() {
      this.creatingGame = true;
    },
    unsetCreatingGame() {
      this.creatingGame = false;
    },
    setGettingGames() {
      this.gettingGames = true;
    },
    unsetGettingGames() {
      this.gettingGames = false;
    },
    setErrorOnGettingGames() {
      this.errorOnGettingGames = true;
    },
    unsetErrorOnGettingGames() {
      this.errorOnGettingGames = false;
    },
    setErrorOnCreatingGame() {
      this.errorOnCreatingGame = true;
    },
    unsetErrorOnCreatingGame() {
      this.errorOnCreatingGame = false;
    },
    setSelectedGame(game: GameDto) {
      this.selectedGame = game;
    },
    updateSelectedGame(game: GameDto) {
      this.selectedGame = game;
    },
    unsetSelectedGame() {
      this.selectedGame = null;
    },
    setGamePendingDeletionId(id: number) {
      this.gamePendingDeletionId = id;
    },
    unsetGamePendingDeletionId() {
      this.gamePendingDeletionId = null;
    },
  },
  persist: true,
});
