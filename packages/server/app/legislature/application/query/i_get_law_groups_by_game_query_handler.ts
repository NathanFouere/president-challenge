import type GetLawGroupsByGameQuery from '#legislature/application/query/get_law_groups_by_game_query';
import type LawGroup from '#legislature/domain/models/law_group';

export default abstract class IGetLawGroupsByGameQueryHandler {
  public abstract handle(query: GetLawGroupsByGameQuery): Promise<LawGroup[]>;
}
