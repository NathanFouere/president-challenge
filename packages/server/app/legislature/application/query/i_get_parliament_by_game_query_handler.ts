import type { Parliament } from '#legislature/domain/models/parliament';
import type { GetParliamentByGameQuery } from '#legislature/application/query/get_parliament_by_game_query';

export default abstract class IGetParliamentByGameQueryHandler {
  public abstract handle(getParliamentByUserAndGameQuery: GetParliamentByGameQuery): Promise<Parliament>;
}
