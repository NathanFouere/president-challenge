import { inject } from '@adonisjs/core';

import { ChoiceStatus } from '@shared/dist/event/choice-status.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventRepository } from '#event/infrastructure/repositories/event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChoiceRepository } from '#event/infrastructure/repositories/choice_repository';
import type Choice from '#event/domain/models/choice';
import type Event from '#event/domain/models/event';

@inject()
export class ChooseChoiceService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly choiceRepository: ChoiceRepository,
  ) {}

  public async chooseChoice(choice: Choice): Promise<void> {
    await this.changeChoicesStatus(choice);
    if (choice.triggerEventId) {
      await this.activateEvent(choice.event, choice.triggerEvent);
    }
    choice.event.isAvailable = false;
    await this.eventRepository.save(choice.event);
  }

  private async changeChoicesStatus(choice: Choice): Promise<void> {
    const choiceEvent = choice.event;
    for (const eventChoice of choiceEvent.choices) {
      if (eventChoice.id == choice.id) {
        choice.status = ChoiceStatus.Chosen;
        continue;
      }
      eventChoice.status = ChoiceStatus.Unavailable;
    }
    await this.choiceRepository.save(choice);
    await this.choiceRepository.saveMany(choice.event.choices);
  }

  private async activateEvent(choiceEvent: Event, eventToTrigger: Event): Promise<void> {
    if (!eventToTrigger.isAvailable) {
      eventToTrigger.isAvailable = true;
      eventToTrigger.isDisplayable = true;
    }
    choiceEvent.isAvailable = false;
    await this.eventRepository.save(eventToTrigger);
    await this.eventRepository.save(choiceEvent);
  }
}
