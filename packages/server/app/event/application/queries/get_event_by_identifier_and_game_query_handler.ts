import type { GetEventByIdentifierAndGameQuery } from '#event/application/queries/get_event_by_identifier_and_game_query';
import Event from '#event/domain/models/event';

export class GetEventByIdentifierAndGameQueryHandler {
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
