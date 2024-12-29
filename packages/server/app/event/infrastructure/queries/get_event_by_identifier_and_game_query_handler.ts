import type { GetEventByIdentifierAndGameQuery } from '#event/application/queries/get_event_by_identifier_and_game_query';
import Event from '#event/domain/models/event';
import type IGetEventByIdentifierAndGameQueryHandler
  from '#event/application/queries/i_get_event_by_identifier_and_game_query_handler';

export default class GetEventByIdentifierAndGameQueryHandler implements IGetEventByIdentifierAndGameQueryHandler {
  public async handle(query: GetEventByIdentifierAndGameQuery): Promise<Event> {
    const event = await Event.query()
      .where('identifier', query.eventIdentifier)
      .where('game_id', query.gameId)
      .first();

    if (null === event) {
      throw new Error('Event not found');
    }

    return event;
  }
}
