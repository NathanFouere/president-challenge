import console from 'node:console';
import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
import { GetUserGamesQuery } from '#game/application/queries/get_user_games_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetUserGamesQueryHandler from '#game/application/queries/i_get_user_games_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MinimalGameDtoFactory from '#game/application/dto-factory/minimal_game_dto_factory';

@inject()
export default class GetGamesController {
  constructor(
    private readonly getUserGamesQueryHandler: IGetUserGamesQueryHandler,
    private readonly minimalGameDtoFactory: MinimalGameDtoFactory,
  ) {}

  public async getUserGames({ auth, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      const games = await this.getUserGamesQueryHandler.getUserGames(
        new GetUserGamesQuery(user),
      );
      const gameDto = this.minimalGameDtoFactory.createFromGames(games);
      return gameDto;
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
