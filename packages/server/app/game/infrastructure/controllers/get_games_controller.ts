import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
import { GetUserGamesQuery } from '#game/application/queries/get_user_games_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetUserGamesQueryHandler from '#game/application/queries/i_get_user_games_query_handler';

@inject()
export default class GetGamesController {
  constructor(private readonly selectGamesQueryHandler: IGetUserGamesQueryHandler) {}

  public async getUserGames({ auth, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      const games = await this.selectGamesQueryHandler.getUserGames(
        new GetUserGamesQuery(user),
      );
      return games;
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({
        message: 'Something went wrong',
        error,
      });
    }
  }
}
