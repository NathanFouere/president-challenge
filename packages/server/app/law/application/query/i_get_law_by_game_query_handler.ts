import type GetLawByGameQuery from '#law/application/query/get_law_by_game_and_type_query';
import type Law from '#law/domain/model/law';

export abstract class IGetLawByGameQueryHandler {
  public abstract handle(query: GetLawByGameQuery): Promise<Law>;
  public abstract handleForDisplay(query: GetLawByGameQuery): Promise<Law>;
  public abstract handleForVote(query: GetLawByGameQuery): Promise<Law>;
}
