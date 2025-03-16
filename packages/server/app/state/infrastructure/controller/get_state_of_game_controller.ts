import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { GetStateOfGameQuery } from '#state/application/query/get_state_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StateDtoFactory } from '#state/application/dto-factory/state_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

@inject()
export default class GetStateOfGameController {
  constructor(
    private readonly getStateOfGameQueryHandler: IGetStateOfGameQueryHandler,
    private readonly stateDtoFactory: StateDtoFactory,
  ) {
  }

  public async getStateOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const state = await this.getStateOfGameQueryHandler.handleForDisplay(new GetStateOfGameQuery(
        gameId,
      ));
      return await this.stateDtoFactory.createFromState(state);
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
