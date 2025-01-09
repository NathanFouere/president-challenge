import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentDtoFactory } from '#legislature/application/dto-factories/parliament_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';
import { GetParliamentByGameQuery } from '#legislature/application/query/get_parliament_by_game_query';

@inject()
export default class GetParliamentController {
  constructor(
    private readonly getParliamentQueryHandler: IGetParliamentByGameQueryHandler,
    private readonly parliamentDtoFactory: ParliamentDtoFactory,
  ) {
  }

  public async getParliament({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const parliament = await this.getParliamentQueryHandler.handle(new GetParliamentByGameQuery(
        gameId,
      ));

      return this.parliamentDtoFactory.createFromParliament(parliament);
    }
    catch (e) {
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
  }
}
