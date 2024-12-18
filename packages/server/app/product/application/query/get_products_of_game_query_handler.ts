import type { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';
import Product from '#product/domain/models/product';

export class GetProductsOfGameQueryHandler {
  public async handle(query: GetProductsOfGameQuery): Promise<Product[]> {
    return await Product
      .query()
      .where('game_id', query.gameId)
      .preload('licensedFile')
      .exec()
    ;
  }
}
