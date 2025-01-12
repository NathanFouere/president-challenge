import IGetLawCategoriesByGameQueryHandler
  from '#legislature/application/query/i_get_law_categories_by_game_query_handler';
import LawCategory from '#legislature/domain/models/law_category';
import type GetLawCategoriesByGameQuery from '#legislature/application/query/get_law_categories_by_game_query';

export default class GetLawCategoriesByGameQueryHandler extends IGetLawCategoriesByGameQueryHandler {
  async handle(query: GetLawCategoriesByGameQuery): Promise<LawCategory[]> {
    return await LawCategory
      .query()
      .where('game_id', query.gameId)
      .preload('lawGroups', (eventQuery) => {
        eventQuery.preload('laws');
      })
      .exec();
  }
}
