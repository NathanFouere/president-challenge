import type { GetProductOfGameQuery } from '#product/application/query/get_product_of_game_query';
import Product from '#product/domain/models/product';

export class GetProductOfGameQueryHandler {
  public async handle(query: GetProductOfGameQuery): Promise<Product[]> {
    return await Product
      .query()
      .where('game_id', query.gameId)
      .preload('licensedFile')
      .firstOrFail()
    ;
  }
}
