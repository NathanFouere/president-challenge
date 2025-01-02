import type { Game } from '@shared/dist/game/game';
import type { TurnInformationsDto } from '@shared/turn-informations/turn-informations-dto';
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

  public async getTurnInformations(gameId: number, turn: number): Promise<TurnInformationsDto> {
    return this.call<TurnInformationsDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetTurnInformations(gameId, turn)}`,
      },
    );
  }
}

export default GameModule;
