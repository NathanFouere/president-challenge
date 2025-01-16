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
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetLastLawVoteResultsInGameQueryHandler,
} from '#legislature/application/query/i_get_last_law_vote_results_in_game_query_handler';
import GetLastLawVoteResultsInGameQuery from '#legislature/application/query/get_last_law_vote_results_in_game_query';
import { LegislatureType } from '#legislature/domain/models/legislature_type';

@inject()
export default class GetLawController {
  constructor(
    private readonly getLawByGameAndTypeQueryHandler: IGetLawByGameAndTypeQueryHandler,
    private readonly lawDtoFactory: LawDtoFactory,
    private readonly getLastLawVoteResultsInGameQueryHandler: IGetLastLawVoteResultsInGameQueryHandler,
  ) {
  }

  public async getLaw({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawId: number = params.lawId;

      // TODO => regrouper dans promise.all
      const law = await this.getLawByGameAndTypeQueryHandler.handle(new GetLawByGameAndTypeQuery(
        lawId,
        gameId,
      ));

      const lawVoteResultInSenate = await this.getLastLawVoteResultsInGameQueryHandler.handle(new GetLastLawVoteResultsInGameQuery(
        lawId,
        LegislatureType.SENATE,
      ));

      const lawVoteResultInParliament = await this.getLastLawVoteResultsInGameQueryHandler.handle(new GetLastLawVoteResultsInGameQuery(
        lawId,
        LegislatureType.PARLIAMENT,
      ));

      return this.lawDtoFactory.createFromLaw(law, lawVoteResultInSenate, lawVoteResultInParliament);
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
