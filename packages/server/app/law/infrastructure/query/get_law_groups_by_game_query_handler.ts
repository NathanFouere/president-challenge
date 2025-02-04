import type IGetLawGroupsByGameQueryHandler from '#law/application/query/i_get_law_groups_by_game_query_handler';
import type GetLawGroupsByGameQuery from '#law/application/query/get_law_groups_by_game_query';
import LawGroup from '#law/domain/model/law_group';

export default class GetLawGroupsByGameQueryHandler implements IGetLawGroupsByGameQueryHandler {
  async handle(query: GetLawGroupsByGameQuery): Promise<LawGroup[]> {
    return await LawGroup
      .query()
      .where('game_id', query.gameId)
      .preload('laws', (lawQuery) => {
        lawQuery.orderBy('order', 'asc');
      })
      .exec();
  }
}
