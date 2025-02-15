import type { EventDto } from '@shared/dist/event/event-dto.js';
import { inject } from '@adonisjs/core';
import { ChoiceStatus } from '@shared/dist/event/choice-status.js';
import type Event from '#event/domain/models/event';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ChoiceDtoFactory } from '#event/application/dto-factory/choice_dto_factory';
import type Choice from '#event/domain/models/choice';

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
      identifier: event.definition.identifier,
      title: event.definition.title,
      text: event.definition.text,
      isAvailable: event.isAvailable,
      beenRead: event.beenRead,
      needsAction: !event?.choices.map((choice: Choice) => choice.status).includes(ChoiceStatus.Chosen),
      licensedFiles: this.licensedFileDTOFactory.createFromLicensedFiles(event.definition.licensedFiles),
      choices: this.choiceDtoFactory.createFromChoices(event.choices),
    };
  }
}
