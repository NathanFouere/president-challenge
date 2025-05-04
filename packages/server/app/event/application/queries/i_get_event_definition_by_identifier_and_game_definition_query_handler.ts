import type { GetEventDefinitionByIdentifierAndGameDefinitionQuery } from '#event/application/queries/get_event_definition_by_identifier_and_game_definition_query';
import type EventDefinition from '#event/domain/models/event_definition';

export default abstract class IGetEventDefinitionByIdentifierAndGameDefinitionQueryHandler {
  public abstract handle(query: GetEventDefinitionByIdentifierAndGameDefinitionQuery): Promise<EventDefinition>;
}
