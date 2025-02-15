import type { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';
import Product from '#product/domain/models/product';
import type IGetProductsOfGameQueryHandler from '#product/application/query/i_get_products_of_game_query_handler';

export default class GetProductsOfGameQueryHandler implements IGetProductsOfGameQueryHandler {
  private async getProductsOfGame(
    query: GetProductsOfGameQuery,
    preloadOptions: { licensedFile?: boolean; pricePerTurn?: boolean } = {},
  ): Promise<Product[]> {
    const queryBuilder = Product.query().where('game_id', query.gameId);
    queryBuilder.preload('definition', (builder) => {
      if (preloadOptions.licensedFile) {
        builder.preload('licensedFile');
      }
    });

    if (preloadOptions.pricePerTurn) {
      queryBuilder.preload('pricePerTurn');
    }

    return queryBuilder.exec();
  }

  public async handle(query: GetProductsOfGameQuery): Promise<Product[]> {
    return await this.getProductsOfGame(query, { pricePerTurn: true });
  }

  public async handleForDisplay(query: GetProductsOfGameQuery): Promise<Product[]> {
    return await this.getProductsOfGame(query, { licensedFile: true, pricePerTurn: true });
  }

  public async handleForSwitchTurn(query: GetProductsOfGameQuery): Promise<Product[]> {
    return await this.getProductsOfGame(query, { pricePerTurn: true });
  }
}
