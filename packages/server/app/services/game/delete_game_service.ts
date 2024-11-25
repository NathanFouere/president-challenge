import { inject } from '@adonisjs/core';
import type User from '#models/user/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetGameOfPlayerQueryHandler } from '#queries/game/get_game_of_user_query_handler';
import { GetGameOfPlayerQuery } from '#queries/game/get_game_of_user_query';

@inject()
export default class DeleteGameService {
  constructor(
    private getGameOfPlayerQueryHandler: GetGameOfPlayerQueryHandler,
  ) {
  }

  public async deleteGame(user: User, gameId: number): Promise<void> {
    const game = await this.getGameOfPlayerQueryHandler.handle(new GetGameOfPlayerQuery(user, gameId));

    await game.delete();
  }
}
