import type { GetEventsOfTurnQuery } from '#event/application/queries/get_events_of_turn_query';
import Event from '#event/domain/models/event';

export class GetEventsOfTurnQueryHandler {
  public async handle(query: GetEventsOfTurnQuery): Promise<Event[]> {
    return Event.query()
      .where('turn', query.turn)
      .where('game_id', query.gameId)
      .preload('licensedFiles')
      .exec();
  }
}
