import type { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';
import type Sector from '#sector/domain/model/sector';

export default abstract class IGetSectorByGameAndTypeQueryHandler {
  public abstract handle(query: GetSectorByGameAndTypeQuery): Promise<Sector>;
}
