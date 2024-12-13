import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetGameOfUserQueryHandler } from '#game/application/queries/get_game_of_user_query_handler';
import { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameRepository from '#game/infrastructure/repositories/game_repository';

@inject()
export default class DeleteGameService {
  constructor(
    private readonly getGameOfPlayerQueryHandler: GetGameOfUserQueryHandler,
    private readonly gameRepository: GameRepository,
  ) {
  }

  public async deleteGame(user: User, gameId: number): Promise<void> {
    const game = await this.getGameOfPlayerQueryHandler.handle(new GetGameOfUserQuery(user, gameId));

    await this.gameRepository.delete(game);
  }
}
