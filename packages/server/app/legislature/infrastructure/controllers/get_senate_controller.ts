import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetSenateByGameQueryHandler } from '#legislature/application/query/get_senate_by_game_query_handler';
import { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SenateDtoFactory } from '#legislature/application/dto-factories/senate_dto_factory';

@inject()
export default class GetSenateController {
  constructor(
    private readonly getSenateByGameQueryHandler: GetSenateByGameQueryHandler,
    private readonly senateDtoFactory: SenateDtoFactory,
  ) {
  }

  public async getSenate({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;

      const senate = await this.getSenateByGameQueryHandler.handle(new GetSenateByGameQuery(
        gameId,
      ));

      return this.senateDtoFactory.createFromSenate(senate);
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
