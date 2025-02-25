import { inject } from '@adonisjs/core';

import { ChoiceStatus } from '@shared/dist/event/choice-status.js';
import type Choice from '#event/domain/models/choice';
import type Event from '#event/domain/models/event';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IChoiceRepository from '#event/domain/repository/i_choice_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChoiceEffectService } from '#event/domain/services/choice_effect_service';

@inject()
export class ChooseChoiceService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly choiceRepository: IChoiceRepository,
    private readonly choiceEffectService: ChoiceEffectService,
  ) {}

  public async chooseChoice(choice: Choice): Promise<void> {
    await this.changeChoicesStatus(choice);
    if (choice.triggerEventId) {
      await this.activateEvent(choice.triggerEvent);
    }
    choice.event.makeUnavailable();
    await this.choiceEffectService.applyChoiceEffect(choice);
    await this.eventRepository.save(choice.event);
  }

  private async changeChoicesStatus(choice: Choice): Promise<void> {
    const choiceEvent = choice.event;
    for (const otherChoiceOfEvent of choiceEvent.choices) {
      if (otherChoiceOfEvent.id == choice.id) {
        choice.status = ChoiceStatus.Chosen;
        continue;
      }
      otherChoiceOfEvent.status = ChoiceStatus.Unavailable;
    }
    await this.choiceRepository.save(choice);
    await this.choiceRepository.saveMany(choice.event.choices);
  }

  private async activateEvent(eventToTrigger: Event): Promise<void> {
    if (!eventToTrigger.isAvailable) {
      eventToTrigger.makeAvailable();
      await this.eventRepository.save(eventToTrigger);
    }
  }
}
