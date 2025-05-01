import type GetSenateDefinitionQuery from '#legislature/application/query/get_senate_definition_query';
import type IGetSenateDefinitionByGameDefinitionQueryHandler from '#legislature/application/query/i_get_senate_definition_by_game_definition_query_handler';
import SenateDefinition from '#legislature/domain/models/senate_definition';

export default class GetSenateDefinitionByGameDefinitionQueryHandler implements IGetSenateDefinitionByGameDefinitionQueryHandler {
  public async handle(query: GetSenateDefinitionQuery): Promise<SenateDefinition> {
    return await SenateDefinition.query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .firstOrFail();
  }
}
