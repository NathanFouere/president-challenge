import { inject } from '@adonisjs/core';
import Law from '#legislature/domain/models/law';
import type GetLawByGameAndTypeQuery from '#legislature/application/query/get_law_by_game_and_type_query';
import type {
  IGetLawByGameAndTypeQueryHandler,
} from '#legislature/application/query/i_get_law_by_game_and_type_query_handler';

@inject()
export default class GetLawByGameAndTypeQueryHandler implements IGetLawByGameAndTypeQueryHandler {
  private async getLawByGameAndType(
    query: GetLawByGameAndTypeQuery,
    preloadOptions: { percentagesOfVotesForPoliticalParty?: boolean; lawGroup?: boolean } = {},
  ): Promise<Law> {
    const queryBuilder = Law.query()
      .where('game_id', query.gameId)
      .where('id', query.lawId);

    if (preloadOptions.percentagesOfVotesForPoliticalParty) {
      queryBuilder.preload('percentagesOfVotesForPoliticalParty');
    }
    if (preloadOptions.lawGroup) {
      queryBuilder.preload('lawGroup', (lawQuery) => {
        lawQuery.preload('laws');
      });
    }

    return await queryBuilder.firstOrFail();
  }

  public async handle(query: GetLawByGameAndTypeQuery): Promise<Law> {
    return await this.getLawByGameAndType(query);
  }

  public async handleForVote(query: GetLawByGameAndTypeQuery): Promise<Law> {
    return await this.getLawByGameAndType(query, { percentagesOfVotesForPoliticalParty: true, lawGroup: true });
  }
}
