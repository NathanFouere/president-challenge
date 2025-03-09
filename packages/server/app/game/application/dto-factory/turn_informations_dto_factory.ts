import { inject } from '@adonisjs/core';
import type { TurnInformationsDto } from '@shared/dist/turn-informations/turn-informations-dto.js';
import { ChoiceStatus } from '@shared/dist/event/choice-status.js';
import type Event from '#event/domain/models/event';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventListDtoFactory } from '#event/application/dto-factory/event_list_dto_factory';
import type Choice from '#event/domain/models/choice';
import type Game from '#game/domain/models/game';

@inject()
export class TurnInformationsDtoFactory {
  constructor(
    private readonly eventListDtoFactory: EventListDtoFactory,
  ) {
  }

  public createFromTurnInformations(events: Event[], game: Game): TurnInformationsDto {
    let eventNeedToBeAddress = false;
    for (const event of events) {
      if (event.choices.some((choice: Choice) => choice.status === ChoiceStatus.Available)) {
        eventNeedToBeAddress = true;
        break;
      }
    }

    return {
      eventListDto: this.eventListDtoFactory.createFromEvents(events),
      eventNeedToBeAddress: eventNeedToBeAddress,
      maxTurnReached: game.isInFinishedStatus(),
      defeat: game.isInDefeatStatus(),
    };
  }
}
