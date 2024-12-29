import type { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';
import Sector from '#sector/domain/model/sector';
import type IGetSectorByGameAndTypeQueryHandler from '#sector/application/query/i_get_sector_by_game_and_type_query_handler';

export default class GetSectorByGameAndTypeQueryHandler implements IGetSectorByGameAndTypeQueryHandler {
  public async handle(query: GetSectorByGameAndTypeQuery): Promise<Sector> {
    return Sector
      .query()
      .where('gameId', query.gameId)
      .where('type', query.type)
      .firstOrFail();
  }
}
