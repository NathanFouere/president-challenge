import { injectable } from 'inversify';
import type { Game } from '@shared/typesgame/game';
import type GameModule from '../../server/repository/modules/game.module';
import { useGameStore } from '../store/game/game.store';
import { useCustomToast } from '../composables/useCustomToast';
import { useGlobalLoader } from '../composables/useGlobalLoader';

@injectable()
export class GamePresenter {
  public readonly gameModule: GameModule = useNuxtApp().$api.game;
  public readonly gameStore = useGameStore();
  public readonly toast = useCustomToast();
  private readonly globalLoader = useGlobalLoader();

  public hasMaxGames(): boolean {
    return this.gameStore.userGames.length >= 3;
  }

  public async getUserGames(): Promise<Game[]> {
    this.globalLoader.startLoading();
    try {
      const games = await this.fetchUserGames();
      this.globalLoader.stopLoading();
      return games;
    }
    catch (error) {
      this.toast.showError(error.data?.message || 'Failed to fetch games.');
      throw error;
    }
  }

  public async createGame(): Promise<void> {
    this.gameStore.setExpectedNumberOfGames(this.gameStore.userGames.length + 1);
    try {
      await this.createNewGame();
      this.toast.showSuccess('Game created successfully');
    }
    catch (error) {
      this.toast.showError(error.data?.message || 'Failed to create game.');
      throw error;
    }
  }

  public async deleteGame(id: number): Promise<void> {
    try {
      await this.removeGame(id);
      this.toast.showSuccess('Game deleted successfully');
    }
    catch (error) {
      this.toast.showError(error.data?.message || 'Failed to delete game.');
      throw error;
    }
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

  private async createNewGame(): Promise<void> {
    this.gameStore.setCreatingGame();
    try {
      await this.gameModule.createGame();
      await this.fetchUserGames();
    }
    finally {
      this.gameStore.unsetCreatingGame();
    }
  }

  private async removeGame(id: number): Promise<void> {
    this.gameStore.setExpectedNumberOfGames(this.gameStore.userGames.length - 1);
    this.gameStore.setGamePendingDeletionId(id);
    try {
      await this.gameModule.deleteGame(id);
      if (this.gameStore.getSelectedGame?.id === id) {
        this.gameStore.unsetSelectedGame();
      }
      await this.fetchUserGames();
    }
    finally {
      this.gameStore.unsetGamePendingDeletionId();
    }
  }
}
