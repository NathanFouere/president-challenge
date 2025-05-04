import type GetEventDefinitionsByGameDefinitionQuery
  from '#event/application/queries/get_event_definitions_by_game_definition_query';
import type EventDefinition from '#event/domain/models/event_definition';

export default abstract class IGetEventDefinitionsByGameDefinitionQueryHandler {
  public abstract handle(query: GetEventDefinitionsByGameDefinitionQuery): Promise<EventDefinition[]>;
}
