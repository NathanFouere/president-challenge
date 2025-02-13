import Sector from '#sector/domain/model/sector';
import type { GetSectorByGameAndIdQuery } from '#sector/application/query/get_sector_by_game_and_id_query';
import type IGetSectorByGameAndIdQueryHandler from '#sector/application/query/i_get_sector_by_game_and_id_query_handler';

export default class GetSectorByGameAndIdQueryHandler implements IGetSectorByGameAndIdQueryHandler {
  private async getSectorByGameAndId(
    query: GetSectorByGameAndIdQuery,
    preloadOptions: {
      licensedFile?: boolean;
      economicalSituationPerTurn?: boolean;
      products?: boolean;
      socialClasses?: boolean;
    } = {},
  ): Promise<Sector> {
    const queryBuilder = Sector
      .query()
      .where('game_id', query.gameId)
      .where('id', query.sectorId);

    if (preloadOptions.licensedFile) {
      queryBuilder.preload('licensedFile');
    }

    if (preloadOptions.economicalSituationPerTurn) {
      queryBuilder.preload('economicalSituationPerTurn', (query) => {
        query.orderBy('turn', 'asc');
      });
    }

    if (preloadOptions.products) {
      queryBuilder.preload('products', (productQuery) => {
        productQuery.preload('licensedFile');
      });
    }

    if (preloadOptions.socialClasses) {
      queryBuilder.preload('socialClasses', (socialClassQuery) => {
        socialClassQuery.preload('definition', (definitionQuery) => {
          definitionQuery.preload('licensedFiles');
        });
      });
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetSectorByGameAndIdQuery): Promise<Sector> {
    return await this.getSectorByGameAndId(query, {});
  }

  public async handleForDisplay(query: GetSectorByGameAndIdQuery): Promise<Sector> {
    return await this.getSectorByGameAndId(query, {
      licensedFile: true,
      economicalSituationPerTurn: true,
      products: true,
      socialClasses: true,
    });
  }
}
