import type IGetIncompatibleLawsQueryHandler from '#law/application/query/i_get_incompatible_laws_query_handler';
import type GetIncompatibleLawsQuery from '#law/application/query/get_incompatible_laws_query';
import Law from '#law/domain/model/law';

export default class GetIncompatibleLawsQueryHandler implements IGetIncompatibleLawsQueryHandler {
  public async handle(query: GetIncompatibleLawsQuery): Promise<Law[]> {
    return Law
      .query()
      .where('id', '<>', query.law.id)
      .where('gameId', query.gameId)
      .preload('definition', (lawEffectQuery) => {
        lawEffectQuery.preload('socialClassesHappinessEffects');
        lawEffectQuery.preload('politicalPartiesAffiliationHappinessEffects');
      })
      .whereHas('definition', (builder) => {
        builder.where('id', query.law.definition.id);
      })
      .exec();
  }
}
