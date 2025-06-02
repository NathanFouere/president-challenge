import { injectable } from 'inversify';
import type { MinimalGameDto } from '@president-challenge/shared/dist/game/minimal-game-dto';
import type GameModule from '../../server/repository/modules/game.module';
import { useGameStore } from '~/store/game/game.store';
import { useCustomToast } from '~/composables/useCustomToast';
import { useClearStore } from '~/composables/useClearStore';
import { useGameDefinitionStore } from '~/store/game-definition/game-definition.store';

@injectable()
export class GamePresenter {
  private readonly gameModule: GameModule = useNuxtApp().$api.game;
  public readonly gameStore = useGameStore();
  public readonly gameDefinitionStore = useGameDefinitionStore();
  private readonly toast = useCustomToast();

  // TODO => ici une règle du back est présente dans le front, elle devrait être récupérer différement
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

  public async createGame(gameDefinitionIdentifier: string): Promise<void> {
    this.gameStore.setCreatingGame();
    this.gameDefinitionStore.setCreatingGameDefinitionIdentifier(gameDefinitionIdentifier);
    try {
      await this.gameModule.createGame(gameDefinitionIdentifier);
      await this.fetchUserGames();
      this.toast.showSuccess('Game created successfully');
    }
    catch {
      this.toast.showError('Failed to create game.');
    }
    this.gameDefinitionStore.unsetCreatingGameDefinitionIdentifier();
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
      this.toast.showSuccess('Game deleted successfully');
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
      // ugly but prevents datas from other games to be displayed
      useClearStore().clear();
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

  public async getGameDefinitions(): Promise<void> {
    this.gameDefinitionStore.setGettingGameDefinitions();

    try {
      const gameDefinitions = await this.gameModule.getGameDefinitions();
      this.gameDefinitionStore.setGameDefinitions(gameDefinitions);
    }
    catch {
      this.toast.showError('Failed to fetch game definitions.');
    }
    this.gameDefinitionStore.unsetGettingGameDefinitions();
  }
}
