import { inject } from '@adonisjs/core';
import type { EventListDto } from '@president-challenge/shared/dist/event/event-list-dto.js';
import { EventType } from '#event/domain/models/event_type';
import type Event from '#event/domain/models/event';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalEventDtoFactory } from '#event/application/dto-factory/minimal_event_dto_factory';

@inject()
export class EventListDtoFactory {
  constructor(
    private readonly minimalEventDtoFactory: MinimalEventDtoFactory,
  ) {
  }

  public async createFromEvents(events: Event[]): Promise<EventListDto> {
    const choicesEvents = [];
    const commonEvents = [];
    const superEvents = [];

    for (const event of events) {
      if (event.definition.type == EventType.Choice) {
        choicesEvents.push(event);
      }
      else if (event.definition.type == EventType.Historical || event.definition.type == EventType.General) {
        commonEvents.push(event);
      }
      else if (event.definition.type == EventType.SuperEvent) {
        superEvents.push(event);
      }
    }

    const [choiceEventsDto, commonEventsDto, superEventsDto] = await Promise.all([
      this.minimalEventDtoFactory.createFromEvents(choicesEvents),
      this.minimalEventDtoFactory.createFromEvents(commonEvents),
      this.minimalEventDtoFactory.createFromEvents(superEvents),
    ]);

    return {
      choiceEvents: choiceEventsDto,
      commonEvents: commonEventsDto,
      superEvents: superEventsDto,
    };
  }
}
