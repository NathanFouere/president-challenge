import { injectable } from 'inversify';
import type { Game } from '@shared/typesgame/game';
import { useUserStore } from '../store/user.store';
import type GameModule from '../repository/modules/game.module';

@injectable()
export class GamePresenter {
  public readonly userStore = useUserStore();
  public readonly gameModule: GameModule = useNuxtApp().$api.game;

  public async getUserGames(): Promise<Game[]> {
    let games: Game[] = [];
    try {
      games = await this.gameModule.getUserGames(this.userStore.requireConnectedUser.id);
    }
    catch (error) {
      console.error(error);
    }

    return games;
  };
}
