import type IGetIncompatibleLawsQueryHandler from '#law/application/query/i_get_incompatible_laws_query_handler';
import Law from '#law/domain/model/law';
import type GetIncompatibleLawsQuery from '#law/application/query/get_incompatible_laws_query';

export default class GetIncompatibleLawsQueryHandler implements IGetIncompatibleLawsQueryHandler {
  public async handle(query: GetIncompatibleLawsQuery): Promise<Law[]> {
    return Law
      .query()
      .where('id', '<>', query.law.id)
      .where('lawGroupId', query.law.lawGroupId)
      .where('gameId', query.gameId)
      .preload('lawEffect', (lawEffectQuery) => {
        lawEffectQuery.preload('socialClassesHappinessEffects');
        lawEffectQuery.preload('politicalPartiesAffiliationHappinessEffects');
      })
      .exec();
  }
}
