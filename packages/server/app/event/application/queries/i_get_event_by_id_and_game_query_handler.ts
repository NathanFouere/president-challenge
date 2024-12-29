import type Event from '#event/domain/models/event';
import type { GetEventByIdAndGameQuery } from '#event/application/queries/get_event_by_id_and_game_query';

export default abstract class IGetEventByIdAndGameQueryHandler {
  public abstract handle(query: GetEventByIdAndGameQuery): Promise<Event>;
}
