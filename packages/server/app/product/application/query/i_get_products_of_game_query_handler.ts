import type { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';
import type Product from '#product/domain/models/product';

export default abstract class IGetProductsOfGameQueryHandler {
  public abstract handle(query: GetProductsOfGameQuery): Promise<Product[]>;
  public abstract handleForDisplay(query: GetProductsOfGameQuery): Promise<Product[]>;
  public abstract handleForSwitchTurn(query: GetProductsOfGameQuery): Promise<Product[]>;
}
