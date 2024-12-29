import { inject } from '@adonisjs/core';
import type Event from '#event/domain/models/event';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';

@inject()
export class EventReadService {
  constructor(
    private readonly eventRepository: IEventRepository,
  ) {
  }

  public async setEventHasBeenBeenRead(event: Event): Promise<void> {
    event.beenRead = true;
    await this.eventRepository.save(event);
  }
}
