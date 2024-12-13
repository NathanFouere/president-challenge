import type { Game } from '@shared/types/dist/types/game/game';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class GameModule extends FetchFactory {
  private readonly RESOURCE = Routes.Game;

  public async getUserGames(): Promise<Game[]> {
    return this.call<Game[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetGames()}`,
      },
    );
  };

  public async createGame(): Promise<void> {
    return this.call(
      {
        method: 'POST',
        url: `${this.RESOURCE.CreateGame()}`,
      },
    );
  };

  public async deleteGame(id: number): Promise<void> {
    return this.call(
      {
        method: 'DELETE',
        url: `${this.RESOURCE.DeleteGame(id)}`,
      },
    );
  }

  public async changeTurn(gameId: number): Promise<Game> {
    return this.call<Game>(
      {
        method: 'POST',
        url: `${this.RESOURCE.ChangeTurn(gameId)}`,
      },
    );
  }
}

export default GameModule;
