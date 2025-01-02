import { injectable } from 'inversify';
import type { Game } from '@shared/game/game';
import type GameModule from '../../server/repository/modules/game.module';
import { useGameStore } from '~/store/game/game.store';
import { useCustomToast } from '~/composables/useCustomToast';

@injectable()
export class GamePresenter {
  public readonly gameModule: GameModule = useNuxtApp().$api.game;
  public readonly gameStore = useGameStore();
  public readonly toast = useCustomToast();

  public hasMaxGames(): boolean {
    return this.gameStore.userGames.length >= 3;
  }

  public async getUserGames(): Promise<void> {
    this.gameStore.setGettingGames();
    try {
      await this.fetchUserGames();
      this.gameStore.unsetGettingGames();
    }
    catch (error) {
      this.toast.showError(error.data?.message || 'Failed to fetch games.');
      throw error;
    }
  }

  public async createGame(): Promise<void> {
    this.gameStore.setCreatingGame();
    try {
      await this.gameModule.createGame();
      await this.fetchUserGames();
      this.toast.showSuccess('Game created successfully');
    }
    catch (error) {
      this.toast.showError(error.data?.message || 'Failed to create game.');
    }
    this.gameStore.unsetCreatingGame();
  }

  public async deleteGame(id: number): Promise<void> {
    this.gameStore.setGamePendingDeletionId(id);
    try {
      await this.gameModule.deleteGame(id);
      if (this.gameStore.getSelectedGame?.id === id) {
        this.gameStore.unsetSelectedGame();
      }
      await this.fetchUserGames();
    }
    catch (error) {
      this.toast.showError('Failed to delete game.');
    }
    this.gameStore.unsetGamePendingDeletionId();
  }

  public async selectGame(game: Game): Promise<void> {
    this.gameStore.setSelectedGame(game);
  }

  private async fetchUserGames(): Promise<Game[]> {
    this.gameStore.setGettingGames();
    try {
      const games = await this.gameModule.getUserGames();
      this.gameStore.setGames(games);
      return games;
    }
    finally {
      this.gameStore.unsetGettingGames();
    }
  }
}
