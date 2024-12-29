import type { GetDisplayableEventsOfTurnQuery } from '#event/application/queries/get_displayable_events_of_turn_query';
import type Event from '#event/domain/models/event';

export abstract class IGetDisplayableEventsOfTurnQueryHandler {
  public abstract handle(query: GetDisplayableEventsOfTurnQuery): Promise<Event[]>;
}
