import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDtoFactory from '#law/application/dto-factory/law_dto_factory';
import GetLawByGameAndTypeQuery from '#law/application/query/get_law_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetLawByGameAndTypeQueryHandler,
} from '#law/application/query/i_get_law_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetGameOfUserQueryHandler from '#game/application/queries/i_get_game_of_user_query_handler';
import { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';
import type User from '#user/domain/models/user';

@inject()
export default class GetLawController {
  constructor(
    private readonly getLawByGameAndTypeQueryHandler: IGetLawByGameAndTypeQueryHandler,
    private readonly lawDtoFactory: LawDtoFactory,
    private readonly getGameQueryHandler: IGetGameOfUserQueryHandler,
  ) {
  }

  public async getLaw({ auth, params, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawId: number = params.lawId;

      const law = await this.getLawByGameAndTypeQueryHandler.handleForDisplay(new GetLawByGameAndTypeQuery(
        lawId,
        gameId,
      ));

      const game = await this.getGameQueryHandler.handle(new GetGameOfUserQuery(
        user,
        gameId,
      ));

      return this.lawDtoFactory.createFromLaw(law, game);
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
