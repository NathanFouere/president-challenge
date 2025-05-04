import type { GetEventDefinitionByIdentifierAndGameDefinitionQuery } from '#event/application/queries/get_event_definition_by_identifier_and_game_definition_query';
import type IGetEventDefinitionByIdentifierAndGameDefinitionQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_and_game_definition_query_handler';
import EventDefinition from '#event/domain/models/event_definition';

export default class GetEventDefinitionByIdentifierAndGameDefinitionQueryHandler implements IGetEventDefinitionByIdentifierAndGameDefinitionQueryHandler {
  public async handle(query: GetEventDefinitionByIdentifierAndGameDefinitionQuery): Promise<EventDefinition> {
    const event = await EventDefinition.query()
      .where('identifier', query.eventIdentifier)
      .first();

    if (null === event) {
      throw new Error('Event not found');
    }

    return event;
  }
}
