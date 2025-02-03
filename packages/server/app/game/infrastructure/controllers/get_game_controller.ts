import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameDtoFactory from '#game/application/dto-factory/game_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GetGameOfUserQueryHandler from '#game/infrastructure/query/get_game_of_user_query_handler';
import { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';

@inject()
export default class GetGameController {
  constructor(
    private readonly gameDtoFactory: GameDtoFactory,
    private readonly getGameQueryHandler: GetGameOfUserQueryHandler,
  ) {
  }

  public async getUserGame({ auth, params, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail();
      const gameId = Number(params.id);
      const game = await this.getGameQueryHandler.handle(new GetGameOfUserQuery(
        user,
        gameId,
      ));
      return response.ok(this.gameDtoFactory.createFromGame(game));
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
