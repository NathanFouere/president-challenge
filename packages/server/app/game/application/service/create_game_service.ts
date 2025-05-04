import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StartupService } from '#common/services/startup_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameFactory from '#game/application/factory/game_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameDefinitionRepository from '#game/domain/repository/i_game_definition_repository';

@inject()
export default class CreateGameService {
  public readonly MAX_GAMES = 3;

  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly startupService: StartupService,
    private readonly gameFactory: GameFactory,
    private readonly gameDefinitionRepository: IGameDefinitionRepository,
  ) {
  }

  public async createGame(user: User, gameDefinitionIdentifier: string): Promise<void> {
    const userHasMaximumGames = await user.hasMaximumGames();
    if (userHasMaximumGames) {
      throw new Error(
        `User already has the maximum allowed number of games (${this.MAX_GAMES})`,
      );
    }

    const gameDefinition = await this.gameDefinitionRepository.get(gameDefinitionIdentifier);

    if (gameDefinition.inDevelopment) {
      throw new Error('Game is still in development');
    }
    const game = this.gameFactory.createForUser(user.id, gameDefinition);
    await this.gameRepository.save(game);
    try {
      await this.startupService.initialize(game.id, gameDefinitionIdentifier);
      await this.gameRepository.save(game);
    }
    catch (error) {
      await this.gameRepository.delete(game);
      throw new Error('Failed to create game', error);
    }
  }
}
