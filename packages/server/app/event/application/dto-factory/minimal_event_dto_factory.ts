import { inject } from '@adonisjs/core';

import type { MinimalEventDto } from '@shared/types/event/minimal-event-dto.js';

import { ChoiceStatus } from '@shared/types/event/choice-status.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import type Event from '#event/domain/models/event';
import type Choice from '#event/domain/models/choice';

@inject()
export class MinimalEventDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
  ) {
  }

  public createFromEvent(event: Event): MinimalEventDto {
    return {
      id: event.id,
      identifier: event.identifier,
      title: event.title,
      text: event.text,
      isAvailable: event.isAvailable,
      beenRead: event.beenRead,
      needsAction: !event?.choices.map((choice: Choice) => choice.status).includes(ChoiceStatus.Chosen),
      licensedFile: this.licensedFileDTOFactory.createFromLicensedFile(event.licensedFiles[0]),
    };
  }

  public createFromEvents(events: Event[]): MinimalEventDto[] {
    return events.map(event => this.createFromEvent(event));
  }
}
