import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import type User from '#models/user/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SelectGamesQueryHandler from '#queries/user/select_user_games_query_handler';
import { SelectUserGamesQuery } from '#queries/user/select_user_games_query';

@inject()
export default class SelectGamesController {
  constructor(private selectGamesQueryHandler: SelectGamesQueryHandler) {}

  async getUserGames({ auth, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      const games = await this.selectGamesQueryHandler.getUserGames(
        new SelectUserGamesQuery(user),
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
