import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventRepository } from '#event/infrastructure/repositories/event_repository';
import type Event from '#event/domain/models/event';

@inject()
export class EventReadService {
  constructor(
    private readonly eventRepository: EventRepository,
  ) {
  }

  public async setEventHasBeenBeenRead(event: Event): Promise<void> {
    event.beenRead = true;
    await this.eventRepository.save(event);
  }
}
