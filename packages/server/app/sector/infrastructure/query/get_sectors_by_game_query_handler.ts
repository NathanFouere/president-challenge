import Sector from '#sector/domain/model/sector';
import type { GetSectorsByGameQuery } from '#sector/application/query/get_sectors_by_game_query';
import type IGetSectorsByGameQueryHandler from '#sector/application/query/i_get_sectors_by_game_query_handler';

export default class GetSectorsByGameQueryHandler implements IGetSectorsByGameQueryHandler {
  private async getSectorsByGame(
    query: GetSectorsByGameQuery,
    preloadOptions: { licensedFiles?: boolean; economicalSituationPerTurn?: boolean; socialClasses?: boolean; products?: boolean } = {},
  ): Promise<Sector[]> {
    const queryBuilder = Sector.query().where('gameId', query.gameId);

    if (preloadOptions.licensedFiles) {
      queryBuilder.preload('licensedFile');
    }

    if (preloadOptions.economicalSituationPerTurn) {
      queryBuilder.preload('economicalSituationPerTurn');
    }

    if (preloadOptions.socialClasses) {
      // load social classes with their happiness modifiers
      queryBuilder.preload('socialClasses', (eventQuery) => {
        eventQuery.preload('happinessModifiers');
        eventQuery.preload('sector'); // TODO => remove this preload that is not necessary ( should be set "in memory" like socialClass.sector = sector or smth)
      });
    }

    if (preloadOptions.products) {
      queryBuilder.preload('products');
    }

    return queryBuilder.exec();
  }

  public async handle(query: GetSectorsByGameQuery): Promise<Sector[]> {
    return this.getSectorsByGame(query, {
      economicalSituationPerTurn: true,
    });
  }

  public async handleForDisplay(query: GetSectorsByGameQuery): Promise<Sector[]> {
    return this.getSectorsByGame(query, {
      licensedFiles: true,
      economicalSituationPerTurn: true,
    });
  }

  public async handleForSwitchTurn(query: GetSectorsByGameQuery): Promise<Sector[]> {
    return this.getSectorsByGame(query, {
      economicalSituationPerTurn: true,
      socialClasses: true,
      products: true,
    });
  }
}
