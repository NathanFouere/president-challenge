import type { TurnInformationsDto } from '@president-challenge/shared/dist/turn-informations/turn-informations-dto';
import type { GameDto } from '@president-challenge/shared/dist/game/game-dto';
import type { GameDefinitionDto } from '@president-challenge/shared/dist/game/game-definition-dto';
import type { MinimalGameDto } from '@president-challenge/shared/dist/game/minimal-game-dto';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class GameModule extends FetchFactory {
  private readonly RESOURCE = Routes.Game;

  public async getUserGames(): Promise<MinimalGameDto[]> {
    return this.call<MinimalGameDto[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetGames()}`,
      },
    );
  };

  public async getGameDefinitions(): Promise<GameDefinitionDto[]> {
    return this.call<GameDefinitionDto[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetGameDefinitions()}`,
      },
    );
  };

  public async getGame(gameId: number): Promise<GameDto> {
    return this.call<GameDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetGame(gameId)}`,
      },
    );
  }

  public async createGame(gameDefinitionIdentifier: string): Promise<void> {
    return this.call(
      {
        method: 'POST',
        url: `${this.RESOURCE.CreateGame(gameDefinitionIdentifier)}`,
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

  public async changeTurn(gameId: number): Promise<GameDto> {
    return this.call<GameDto>(
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
