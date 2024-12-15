import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetParliamentByGameQueryHandler } from '#legislature/application/query/get_parliament_by_game_query_handler';
import { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentDtoFactory } from '#legislature/application/factory/parliament_dto_factory';

@inject()
export default class GetParliamentController {
  constructor(
    private readonly getParliamentQueryHandler: GetParliamentByGameQueryHandler,
    private readonly parliamentDtoFactory: ParliamentDtoFactory,
  ) {
  }

  public async getParliament({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;

      const parliament = await this.getParliamentQueryHandler.handle(new GetSenateByGameQuery(
        gameId,
      ));

      return this.parliamentDtoFactory.createFromParliament(parliament);
    }
    catch (e) {
      console.error(e);
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
  }
}
