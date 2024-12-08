import type { MinimalEventDTO } from '@shared/types/dist/types/event/minimal-event-d-t-o';
import type { EventDto } from '@shared/event/event-dto';
import FetchFactory from '../factory';
import Routes from '~~/server/repository/routes.client';

class EventModule extends FetchFactory {
  private readonly RESOURCE = Routes.Events;

  public async getEventsOfTurn(gameId: number, turn: number): Promise<MinimalEventDTO[]> {
    return this.call<MinimalEventDTO[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetEventsOfTurn(gameId, turn)}`,
      },
    );
  };

  public async getEvent(eventId: number, gameId: number): Promise<EventDto> {
    return this.call<EventDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetEvent(eventId, gameId)}`,
      },
    );
  }
}

export default EventModule;
