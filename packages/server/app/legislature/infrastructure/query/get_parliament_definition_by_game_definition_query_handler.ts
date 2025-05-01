import type GetParliamentDefinitionByGameDefinitionQuery from '#legislature/application/query/get_parliament_definition_by_game_definition_query';
import type IGetParliamentDefinitionByGameDefinitionQueryHandler
  from '#legislature/application/query/i_get_parliament_definition_by_game_definition_query_handler';
import ParliamentDefinition from '#legislature/domain/models/parliament_definition';

export default class GetParliamentDefinitionByGameDefinitionQueryHandler implements IGetParliamentDefinitionByGameDefinitionQueryHandler {
  public async handle(query: GetParliamentDefinitionByGameDefinitionQuery): Promise<ParliamentDefinition> {
    return await ParliamentDefinition.query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .firstOrFail();
  }
}
