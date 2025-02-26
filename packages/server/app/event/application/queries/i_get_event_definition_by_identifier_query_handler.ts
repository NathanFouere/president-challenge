import type { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
import type EventDefinition from '#event/domain/models/event_definition';

export default abstract class IGetEventDefinitionByIdentifierQueryHandler {
  public abstract handle(query: GetEventDefinitionByIdentifierQuery): Promise<EventDefinition>;
}
