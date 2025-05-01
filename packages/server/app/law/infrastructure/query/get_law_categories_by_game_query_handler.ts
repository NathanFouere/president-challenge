import IGetLawCategoriesByGameQueryHandler
  from '#law/application/query/i_get_law_categories_by_game_query_handler';
import LawCategory from '#law/domain/model/law_category';
import type GetLawCategoriesByGameQuery from '#law/application/query/get_law_categories_by_game_query';

export default class GetLawCategoriesByGameQueryHandler extends IGetLawCategoriesByGameQueryHandler {
  async handle(query: GetLawCategoriesByGameQuery): Promise<LawCategory[]> {
    return await LawCategory
      .query()
      .preload('lawGroups', (lawGroupQuery) => {
        lawGroupQuery.preload('lawDefinitions', (definitionQuery) => {
          definitionQuery.preload('laws', (lawQuery) => {
            lawQuery.where('game_id', query.gameId).preload('definition');
          });
        });
      })
      .exec();
  }
}
