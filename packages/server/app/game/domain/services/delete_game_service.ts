import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
import { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetGameOfUserQueryHandler from '#game/application/queries/i_get_game_of_user_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';

@inject()
export default class DeleteGameService {
  constructor(
    private readonly getGameOfPlayerQueryHandler: IGetGameOfUserQueryHandler,
    private readonly gameRepository: IGameRepository,
  ) {
  }

  public async deleteGame(user: User, gameId: number): Promise<void> {
    const game = await this.getGameOfPlayerQueryHandler.handle(new GetGameOfUserQuery(user, gameId));

    await this.gameRepository.delete(game);
  }
}
