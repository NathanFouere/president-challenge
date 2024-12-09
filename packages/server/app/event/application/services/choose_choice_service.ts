import * as console from 'node:console';
import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventRepository } from '#event/infrastructure/repositories/event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChoiceRepository } from '#event/infrastructure/repositories/choice_repository';
import type Choice from '#event/domain/models/choice';

@inject()
export class ChooseChoiceService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly choiceRepository: ChoiceRepository,
  ) {}

  public async chooseChoice(choice: Choice): Promise<void> {
    console.log('choice', choice);
  }
}
