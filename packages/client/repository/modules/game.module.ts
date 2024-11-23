import type { Game } from '@shared/typesgame/game';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class GameModule extends FetchFactory {
  private readonly RESOURCE = Routes.Game;

  public async getUserGames(userId: number): Promise<Game[]> {
    return this.call<Game[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetGames(userId)}`,
      },
    );
  }
}

export default GameModule;
