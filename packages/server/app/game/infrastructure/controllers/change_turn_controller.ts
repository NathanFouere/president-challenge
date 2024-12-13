import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChangeTurnService from '#game/application/services/change_turn_service';
import type User from '#user/domain/models/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetGameOfUserQueryHandler } from '#game/application/queries/get_game_of_user_query_handler';
import { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';

@inject()
export default class ChangeTurnController {
  constructor(
    private readonly changeTurnService: ChangeTurnService,
    private readonly getGameOfUserQueryHandler: GetGameOfUserQueryHandler,
  ) {
  }

  public async changeTurn({ auth, params, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      const gameId: number = params.gameId;
      const game = await this.getGameOfUserQueryHandler.handle(new GetGameOfUserQuery(
        user,
        gameId,
      ));

      const updatedGame = await this.changeTurnService.changeTurn(game);

      return updatedGame;
    }
    catch (e) {
      console.error(e);
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
    return response.ok({ message: 'Turn changed successfully' });
  }
}
