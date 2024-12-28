import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
import { aGame } from '#game/application/builders/game_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameRepository from '#game/infrastructure/repositories/game_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StartupService } from '#common/services/startup_service';

@inject()
export default class CreateGameService {
  public readonly MAX_GAMES = 3;

  constructor(
    private readonly gameRepository: GameRepository,
    private readonly startupService: StartupService,
  ) {
  }

  public async canCreateGame(user: User): Promise<boolean> {
    await user.load('games');
    const numberOfGames = user.games.length;
    return Number((numberOfGames)) < this.MAX_GAMES;
  }

  public async createGame(user: User): Promise<void> {
    const canCreateGame = await this.canCreateGame(user);
    if (!canCreateGame) {
      throw new Error(
        `User already has the maximum allowed number of games (${this.MAX_GAMES})`,
      );
    }

    const game = aGame()
      .withUserId(user.id)
      .withTurn(0)
      .build();

    try {
      await this.gameRepository.save(game);

      await this.startupService.initialize(game.id);

      await this.gameRepository.save(game);
    }
    catch (error) {
      await this.gameRepository.delete(game);
      throw new Error('Failed to create game', error);
    }
  }
}
