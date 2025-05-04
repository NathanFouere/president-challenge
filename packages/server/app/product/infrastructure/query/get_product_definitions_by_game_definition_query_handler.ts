import type GetProductDefinitionsByGameDefinitionQuery from '#product/application/query/get_product_definitions_by_game_definition_query';
import type IGetProductDefinitionsByGameDefinitionQueryHandler from '#product/application/query/i_get_product_definitions_by_game_definition_query_handler';
import ProductDefinition from '#product/domain/models/product_definition';

export default class GetProductDefinitionsByGameDefinitionQueryHandler
implements IGetProductDefinitionsByGameDefinitionQueryHandler {
  public async handle(
    query: GetProductDefinitionsByGameDefinitionQuery,
  ): Promise<ProductDefinition[]> {
    return await ProductDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .exec();
  }
}
