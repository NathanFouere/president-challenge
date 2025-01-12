import { inject } from '@adonisjs/core';
import { LawType } from '@shared/dist/legislature/law-type.js';
import type Law from '#legislature/domain/models/law';
import type GetLawByGameAndTypeQuery from '#legislature/application/query/get_law_by_game_and_type_query';
import type {
  IGetLawByGameAndTypeQueryHandler,
} from '#legislature/application/query/i_get_law_by_game_and_type_query_handler';
import PropertyLaw from '#legislature/domain/models/property_law';

@inject()
export default class GetLawByGameAndTypeQueryHandler implements IGetLawByGameAndTypeQueryHandler {
  private async getLawByGameAndType(
    query: GetLawByGameAndTypeQuery,
    preloadOptions: {} = {},
  ): Promise<Law> {
    let law: PropertyLaw;
    let queryBuilder;
    switch (query.lawType) {
      case LawType.PROPERTY:
        queryBuilder = PropertyLaw.query().where('id', query.lawId).where('game_id', query.gameId);

        law = await queryBuilder.firstOrFail();
        break;
      default:
        throw new Error('Invalid law type');
    }

    return law;
  }

  public async handle(query: GetLawByGameAndTypeQuery): Promise<Law> {
    return await this.getLawByGameAndType(query);
  }

  public async handleForVote(query: GetLawByGameAndTypeQuery): Promise<Law> {
    return await this.getLawByGameAndType(query, { votesPerPoliticalParty: true });
  }
}
