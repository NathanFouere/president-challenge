import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameRepository from '#game/infrastructure/repositories/game_repository';
import type Game from '#game/domain/models/game';

@inject()
export default class ChangeTurnService {
  constructor(
    private readonly gameRepository: GameRepository,
  ) {
  }

  public async changeTurn(game: Game): Promise<Game> {
    try {
      game.changeTurn();
      await this.gameRepository.save(game);
    }
    catch (e) {
      console.error(e);
    }
    return game;
  }
}
