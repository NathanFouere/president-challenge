import type { GetEventByIdentifierAndGameQuery } from '#event/application/queries/get_event_by_identifier_and_game_query';
import type Event from '#event/domain/models/event';

export default abstract class IGetEventByIdentifierAndGameQueryHandler {
  public abstract handle(query: GetEventByIdentifierAndGameQuery): Promise<Event>;
}
