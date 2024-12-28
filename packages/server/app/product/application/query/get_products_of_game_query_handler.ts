import type { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';
import Product from '#product/domain/models/product';

export class GetProductsOfGameQueryHandler {
  private async getProductsOfGame(
    query: GetProductsOfGameQuery,
    preloadOptions: { licensedFile?: boolean; pricePerTurn?: boolean } = {},
  ): Promise<Product[]> {
    const queryBuilder = Product.query().where('game_id', query.gameId);

    if (preloadOptions.licensedFile) {
      queryBuilder.preload('licensedFile');
    }

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
}
