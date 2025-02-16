import { injectable } from 'inversify';
import type { MinimalGameDto } from '@shared/game/minimal-game-dto';
import type GameModule from '../../server/repository/modules/game.module';
import { useGameStore } from '~/store/game/game.store';
import { useCustomToast } from '~/composables/useCustomToast';

@injectable()
export class GamePresenter {
  private readonly gameModule: GameModule = useNuxtApp().$api.game;
  public readonly gameStore = useGameStore();
  private readonly toast = useCustomToast();

  public hasMaxGames(): boolean {
    return this.gameStore.userGames.length >= 3;
  }

  public async getUserGames(): Promise<void> {
    this.gameStore.setGettingGames();
    try {
      await this.fetchUserGames();
      this.gameStore.unsetGettingGames();
    }
    catch {
      this.toast.showError('Failed to fetch games.');
    }
  }

  public async createGame(): Promise<void> {
    this.gameStore.setCreatingGame();
    try {
      await this.gameModule.createGame();
      await this.fetchUserGames();
      this.toast.showSuccess('Game created successfully');
    }
    catch {
      this.toast.showError('Failed to create game.');
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
    catch {
      this.toast.showError('Failed to delete game.');
    }
    this.gameStore.unsetGamePendingDeletionId();
  }

  public async selectGame(game: MinimalGameDto): Promise<void> {
    this.gameStore.setSelectingGame(game.id);
    try {
      const gameDto = await this.gameModule.getGame(game.id);
      this.gameStore.setSelectedGame(gameDto);
    }
    catch {
      this.toast.showError('Failed to select game.');
    }
    finally {
      this.gameStore.unsetSelectingGame();
    }
  }

  private async fetchUserGames(): Promise<MinimalGameDto[]> {
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
