import type GetLawGroupsByGameQuery from '#law/application/query/get_law_groups_by_game_query';
import type LawGroup from '#law/domain/model/law_group';

export default abstract class IGetLawGroupsByGameQueryHandler {
  public abstract handle(query: GetLawGroupsByGameQuery): Promise<LawGroup[]>;
}
