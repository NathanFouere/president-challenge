import { inject } from '@adonisjs/core';

import type { MinimalEventDto } from '@shared/types/event/minimal-event-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import type Event from '#event/domain/models/event';

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
      turn: event.turn,
      isAvailable: event.isAvailable,
      beenRead: event.beenRead,
      licensedFiles: this.licensedFileDTOFactory.createFromLicensedFiles(event.licensedFiles),
    };
  }

  public createFromEvents(events: Event[]): MinimalEventDto[] {
    return events.map(event => this.createFromEvent(event));
  }
}
