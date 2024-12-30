import type Sector from '#sector/domain/model/sector';
import type { GetSectorsByGameQuery } from '#sector/application/query/get_sectors_by_game_query';

export default abstract class IGetSectorsByGameQueryHandler {
  public abstract handle(query: GetSectorsByGameQuery): Promise<Sector[]>;
  public abstract handleForDisplay(query: GetSectorsByGameQuery): Promise<Sector[]>;
  public abstract handleForSwitchTurn(query: GetSectorsByGameQuery): Promise<Sector[]>;
}
