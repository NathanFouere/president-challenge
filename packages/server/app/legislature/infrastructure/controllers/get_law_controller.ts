import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDtoFactory from '#legislature/application/dto-factories/law_dto_factory';
import GetLawByGameAndTypeQuery from '#legislature/application/query/get_law_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetLawByGameAndTypeQueryHandler,
} from '#legislature/application/query/i_get_law_by_game_and_type_query_handler';

@inject()
export default class GetLawController {
  constructor(
    private readonly getLawByGameAndTypeQueryHandler: IGetLawByGameAndTypeQueryHandler,
    private readonly lawDtoFactory: LawDtoFactory,
  ) {
  }

  public async getLaw({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawId: number = params.lawId;

      const law = await this.getLawByGameAndTypeQueryHandler.handle(new GetLawByGameAndTypeQuery(
        lawId,
        gameId,
      ));

      return this.lawDtoFactory.createFromLaw(law);
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
