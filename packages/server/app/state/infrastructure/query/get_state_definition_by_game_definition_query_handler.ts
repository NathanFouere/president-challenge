import type IGetStateDefinitionByGameDefinitionQueryHandler
  from '#state/application/query/i_get_state_definition_by_game_definition_query_handler';
import StateDefinition from '#state/domain/model/state_definition';
import type GetStateDefinitionByGameDefinitionQuery
  from '#state/application/query/get_state_definition_by_game_definition_query';

export default class GetStateDefinitionByGameDefinitionQueryHandler implements IGetStateDefinitionByGameDefinitionQueryHandler {
  public async handle(query: GetStateDefinitionByGameDefinitionQuery): Promise<StateDefinition> {
    return await StateDefinition
      .query()
      .where('gameDefinitionIdentifier', query.gameDefinitionIdentifier)
      .firstOrFail();
  }
}
