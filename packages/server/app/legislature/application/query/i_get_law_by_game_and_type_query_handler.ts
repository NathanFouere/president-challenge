import type Law from '#legislature/domain/models/law';
import type GetLawByGameAndTypeQuery from '#legislature/application/query/get_law_by_game_and_type_query';

export abstract class IGetLawByGameAndTypeQueryHandler {
  public abstract handle(query: GetLawByGameAndTypeQuery): Promise<Law>;
  public abstract handleForDisplay(query: GetLawByGameAndTypeQuery): Promise<Law>;
  public abstract handleForVote(query: GetLawByGameAndTypeQuery): Promise<Law>;
}
