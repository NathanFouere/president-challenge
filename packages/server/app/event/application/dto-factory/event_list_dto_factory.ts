import { inject } from '@adonisjs/core';
import type { EventListDto } from '@shared/dist/event/event-list-dto.js';
import { EventType } from '@shared/dist/event/event-type.js';
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
      if (event.definition.type == EventType.Choice) {
        choicesEvents.push(event);
      }
      else if (event.definition.type == EventType.Historical) {
        historicalEvents.push(event);
      }
      else if (event.definition.type == EventType.SuperEvent) {
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
