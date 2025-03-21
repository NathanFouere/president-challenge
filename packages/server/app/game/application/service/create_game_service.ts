import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StartupService } from '#common/services/startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameFactory from '#game/application/factory/game_factory';

@inject()
export default class CreateGameService {
  public readonly MAX_GAMES = 3;

  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly startupService: StartupService,
    private readonly gameFactory: GameFactory,
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

    const game = this.gameFactory.createForUser(user.id);

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
