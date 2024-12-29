import type { GetDisplayableEventsOfTurnQuery } from '#event/application/queries/get_displayable_events_of_turn_query';
import Event from '#event/domain/models/event';
import type {
  IGetDisplayableEventsOfTurnQueryHandler,
} from '#event/application/queries/i_get_displayable_events_of_turn_query_handler';

export default class GetDisplayableEventsOfTurnQueryHandler implements IGetDisplayableEventsOfTurnQueryHandler {
  public async handle(query: GetDisplayableEventsOfTurnQuery): Promise<Event[]> {
    return Event.query()
      .where('turn', query.turn)
      .where('game_id', query.gameId)
      .where('is_displayable', true)
      .orderBy('identifier', 'asc')
      .preload('licensedFiles')
      .preload('choices')
      .exec();
  }
}
