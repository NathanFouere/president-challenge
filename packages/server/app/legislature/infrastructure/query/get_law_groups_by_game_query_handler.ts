import type IGetLawGroupsByGameQueryHandler from '#legislature/application/query/i_get_law_groups_by_game_query_handler';
import type GetLawGroupsByGameQuery from '#legislature/application/query/get_law_groups_by_game_query';
import LawGroup from '#legislature/domain/models/law_group';

export default class GetLawGroupsByGameQueryHandler implements IGetLawGroupsByGameQueryHandler {
  async handle(query: GetLawGroupsByGameQuery): Promise<LawGroup[]> {
    return await LawGroup.query().where('game_id', query.gameId).preload('laws').exec();
  }
}
