import type { EventDto } from '@shared/types/event/event-dto.js';
import { inject } from '@adonisjs/core';
import type Event from '#event/domain/models/event';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChoiceDtoFactory } from '#event/application/dto-factory/choice_dto_factory';

@inject()
export class EventDtoFactory {
  constructor(
    private readonly licensedFileDTOFactory: LicensedFileDTOFactory,
    private readonly choiceDtoFactory: ChoiceDtoFactory,
  ) {
  }

  public createFromEvent(event: Event): EventDto {
    return {
      id: event.id,
      identifier: event.identifier,
      title: event.title,
      text: event.text,
      turn: event.turn,
      isAvailable: event.isAvailable,
      beenRead: event.beenRead,
      licensedFiles: this.licensedFileDTOFactory.createFromLicensedFiles(event.licensedFiles),
      choices: this.choiceDtoFactory.createFromChoices(event.choices),
    };
  }
}
