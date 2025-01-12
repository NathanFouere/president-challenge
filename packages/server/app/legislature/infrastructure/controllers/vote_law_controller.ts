import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import type { LawType } from '@shared/dist/legislature/law-type.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawDtoFactory from '#legislature/application/dto-factories/law_dto_factory';
import GetLawByGameAndTypeQuery from '#legislature/application/query/get_law_by_game_and_type_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetLawByGameAndTypeQueryHandler,
} from '#legislature/application/query/i_get_law_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import VoteLawService from '#legislature/application/service/vote_law_service';

@inject()
export default class VoteLawController {
  constructor(
    private readonly getLawByGameAndTypeQueryHandler: IGetLawByGameAndTypeQueryHandler,
    private readonly lawDtoFactory: LawDtoFactory,
    private readonly voteLawService: VoteLawService,
  ) {
  }

  public async voteLaw({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawId: number = params.lawId;
      const lawType: string = params.lawType as LawType;

      console.log(gameId, lawId, lawType);

      const law = await this.getLawByGameAndTypeQueryHandler.handleForVote(new GetLawByGameAndTypeQuery(
        lawId,
        gameId,
        lawType,
      ));

      await this.voteLawService.voteLaw(law, auth.user.id);
    }

    catch (e) {
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
  }
}
