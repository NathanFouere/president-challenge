import { inject } from '@adonisjs/core';
import type { EventListDto } from '@shared/types/event/event-list-dto.js';
import type Event from '#event/domain/models/event';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalEventDtoFactory } from '#event/application/dto-factory/minimal_event_dto_factory';

@inject()
export class EventListDtoFactory {
  constructor(
    private readonly minimalEventDtoFactory: MinimalEventDtoFactory,
  ) {
  }

  public createFromEvents(events: Event[]): EventListDto {
    const choicesEvents = [];
    const historicalEvents = [];
    const superEvents = [];

    for (const event of events) {
      if (event.type == 'choice') {
        choicesEvents.push(event);
      }
      else if (event.type == 'historical') {
        historicalEvents.push(event);
      }
      else if (event.type == 'super-event') {
        superEvents.push(event);
      }
    }

    return {
      choiceEvents: this.minimalEventDtoFactory.createFromEvents(choicesEvents),
      historicalEvents: this.minimalEventDtoFactory.createFromEvents(historicalEvents),
      superEvents: this.minimalEventDtoFactory.createFromEvents(superEvents),
    };
  }
}
