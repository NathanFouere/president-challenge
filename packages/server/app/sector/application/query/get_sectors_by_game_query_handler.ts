import Sector from '#sector/domain/model/sector';
import type { GetSectorsByGameQuery } from '#sector/application/query/get_sectors_by_game_query';

export class GetSectorsByGameQueryHandler {
  public async handle(query: GetSectorsByGameQuery): Promise<Sector[]> {
    return Sector
      .query()
      .where('gameId', query.gameId)
      .preload('licensedFile')
      .exec();
  }
}
