import type GetProductDefinitionsByGameDefinitionQuery
  from '#product/application/query/get_product_definitions_by_game_definition_query';
import type ProductDefinition from '#product/domain/models/product_definition';

export default abstract class IGetProductDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(query: GetProductDefinitionsByGameDefinitionQuery): Promise<ProductDefinition[]>;
}
