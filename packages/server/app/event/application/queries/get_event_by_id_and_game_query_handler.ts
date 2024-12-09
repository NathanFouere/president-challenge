import Event from '#event/domain/models/event';
import type { GetEventByIdAndGameQuery } from '#event/application/queries/get_event_by_id_and_game_query';

export default class GetEventByIdAndGameQueryHandler {
  public async handle(query: GetEventByIdAndGameQuery): Promise<Event> {
    const event = Event
      .query()
      .where('id', query.eventId)
      .where('game_id', query.gameId)
      .preload('licensedFiles')
      .preload('choices')
      .firstOrFail();

    if (null === event) {
      throw new Error('Event not found');
    }

    return event;
  }
}
