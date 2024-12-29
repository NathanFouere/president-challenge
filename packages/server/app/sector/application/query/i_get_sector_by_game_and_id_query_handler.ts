import type Sector from '#sector/domain/model/sector';
import type { GetSectorByGameAndIdQuery } from '#sector/application/query/get_sector_by_game_and_id_query';

export default abstract class IGetSectorByGameAndIdQueryHandler {
  public abstract handle(query: GetSectorByGameAndIdQuery): Promise<Sector>;
  public abstract handleForDisplay(query: GetSectorByGameAndIdQuery): Promise<Sector>;
}
