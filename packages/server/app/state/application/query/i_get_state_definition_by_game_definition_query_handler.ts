import type StateDefinition from '#state/domain/model/state_definition';
import type GetStateDefinitionByGameDefinitionQuery
  from '#state/application/query/get_state_definition_by_game_definition_query';

export default abstract class IGetStateDefinitionByGameDefinitionQueryHandler {
  public abstract handle(query: GetStateDefinitionByGameDefinitionQuery): Promise<StateDefinition>;
}
