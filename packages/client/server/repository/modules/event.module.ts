import type { EventDto } from '@shared/event/event-dto';
import type { EventListDto } from '@shared/event/event-list-dto';
import FetchFactory from '../factory';
import Routes from '~~/server/repository/routes.client';

class EventModule extends FetchFactory {
  private readonly RESOURCE = Routes.Events;

  public async getEventsOfTurn(gameId: number, turn: number): Promise<EventListDto> {
    return this.call<EventListDto>(
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

  public async chooseChoice(eventId: number, choiceId: number): Promise<void> {
    return this.call(
      {
        method: 'POST',
        url: `${this.RESOURCE.ChooseChoice(eventId, choiceId)}`,
      },
    );
  }
}

export default EventModule;
