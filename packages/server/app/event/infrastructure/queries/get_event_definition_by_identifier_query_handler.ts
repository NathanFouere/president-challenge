import type { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
import type IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
import EventDefinition from '#event/domain/models/event_definition';

export default class GetEventDefinitionByIdentifierQueryHandler implements IGetEventDefinitionByIdentifierQueryHandler {
  public async handle(query: GetEventDefinitionByIdentifierQuery): Promise<EventDefinition> {
    const event = await EventDefinition.query()
      .where('identifier', query.eventIdentifier)
      .first();

    if (null === event) {
      throw new Error('Event not found');
    }

    return event;
  }
}
