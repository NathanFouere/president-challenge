import type { GetProductOfGameQuery } from '#product/application/query/get_product_of_game_query';
import type Product from '#product/domain/models/product';

export default abstract class IGetProductOfGameQueryHandler {
  public abstract handle(query: GetProductOfGameQuery): Promise<Product>;

  public abstract handleForDisplay(query: GetProductOfGameQuery): Promise<Product>;
}
