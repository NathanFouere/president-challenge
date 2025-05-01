import AppProvider from '#common/provider';
import IProductRepository from '#product/domain/repository/i_product_repository';
import IProductPricePerTurnRepository from '#product/domain/repository/i_product_price_per_turn_repository';
import IGetProductsOfGameQueryHandler from '#product/application/query/i_get_products_of_game_query_handler';
import IGetProductOfGameQueryHandler from '#product/application/query/i_get_product_of_game_query_handler';
import IProductDefinitionRepository from '#product/domain/repository/i_product_definition_repository';
import IGetProductDefinitionsByGameDefinitionQueryHandler
  from '#product/application/query/i_get_product_definitions_by_game_definition_query_handler';

export default class ProductProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: ProductRepository } = await import(
      '#product/infrastructure/repository/product_repository'
    );
    const { default: ProductPricePerTurnRepository } = await import(
      '#product/infrastructure/repository/product_price_per_turn_repository'
    );
    const { default: GetProductOfGameQueryHandler } = await import(
      '#product/infrastructure/query/get_product_of_game_query_handler'
    );
    const { default: GetProductsOfGameQueryHandler } = await import(
      '#product/infrastructure/query/get_products_of_game_query_handler'
    );
    const { default: ProductDefinitionRepository } = await import(
      '#product/infrastructure/repository/product_definition_repository'
    );
    const { default: GetProductDefinitionsByGameDefinitionQueryHandler } = await import(
      '#product/infrastructure/query/get_product_definitions_by_game_definition_query_handler'
    );

    this.app.container.bind(IGetProductDefinitionsByGameDefinitionQueryHandler, () => {
      return new GetProductDefinitionsByGameDefinitionQueryHandler();
    });

    this.app.container.bind(IProductDefinitionRepository, () => {
      return new ProductDefinitionRepository();
    });

    this.app.container.bind(IProductRepository, () => {
      return new ProductRepository();
    });
    this.app.container.bind(IProductPricePerTurnRepository, () => {
      return new ProductPricePerTurnRepository();
    });
    this.app.container.bind(IGetProductOfGameQueryHandler, () => {
      return new GetProductOfGameQueryHandler();
    });
    this.app.container.bind(IGetProductsOfGameQueryHandler, () => {
      return new GetProductsOfGameQueryHandler();
    });
  }
}
