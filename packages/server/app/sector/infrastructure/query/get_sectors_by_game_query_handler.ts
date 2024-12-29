import Sector from '#sector/domain/model/sector';
import type { GetSectorsByGameQuery } from '#sector/application/query/get_sectors_by_game_query';
import type IGetSectorsByGameQueryHandler from '#sector/application/query/i_get_sectors_by_game_query_handler';

export default class GetSectorsByGameQueryHandler implements IGetSectorsByGameQueryHandler {
  private async getSectorsByGame(
    query: GetSectorsByGameQuery,
    preloadLicensedFile: boolean = false,
  ): Promise<Sector[]> {
    const queryBuilder = Sector.query().where('gameId', query.gameId);

    if (preloadLicensedFile) {
      queryBuilder.preload('licensedFile');
    }

    return queryBuilder.exec();
  }

  public async handle(query: GetSectorsByGameQuery): Promise<Sector[]> {
    return this.getSectorsByGame(query, false);
  }

  public async handleForDisplay(query: GetSectorsByGameQuery): Promise<Sector[]> {
    return this.getSectorsByGame(query, true);
  }
}
