import type { GetProductOfGameQuery } from '#product/application/query/get_product_of_game_query';
import Product from '#product/domain/models/product';
import type IGetProductOfGameQueryHandler from '#product/application/query/i_get_product_of_game_query_handler';

export default class GetProductOfGameQueryHandler implements IGetProductOfGameQueryHandler {
  private async getProductOfGame(
    query: GetProductOfGameQuery,
    preloadOptions: { licensedFile?: boolean; pricePerTurn?: boolean } = {},
  ): Promise<Product> {
    const queryBuilder = Product
      .query()
      .where('game_id', query.gameId)
      .where('id', query.productId);

    if (preloadOptions.licensedFile) {
      queryBuilder.preload('licensedFile');
    }

    if (preloadOptions.pricePerTurn) {
      queryBuilder.preload('pricePerTurn');
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetProductOfGameQuery): Promise<Product> {
    return await this.getProductOfGame(query, { pricePerTurn: true });
  }

  public async handleForDisplay(query: GetProductOfGameQuery): Promise<Product> {
    return await this.getProductOfGame(query, { licensedFile: true, pricePerTurn: true });
  }
}
