import { inject } from '@adonisjs/core';
import type { TurnInformationsDto } from '@president-challenge/shared/dist/turn-informations/turn-informations-dto.js';
import { ChoiceStatus } from '@president-challenge/shared/dist/event/choice-status.js';
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

  public async createFromTurnInformations(events: Event[], game: Game): Promise<TurnInformationsDto> {
    return {
      eventListDto: await this.eventListDtoFactory.createFromEvents(events),
      canChangeTurnContext: this.canChangeTurnContext(game, events),
      canChangeTurn: game.isInDefeatStatus() || game.isInFinishedStatus() || this.hasEventNeedToBeAddress(events),
    };
  }

  private hasEventNeedToBeAddress(events: Event[]): boolean {
    for (const event of events) {
      if (event.choices.some((choice: Choice) => choice.status === ChoiceStatus.Available)) {
        return true;
      }
    }
    return false;
  }

  private canChangeTurnContext(game: Game, events: Event[]): string {
    if (game.isInFinishedStatus()) {
      return 'Game finished';
    }
    else if (game.isInDefeatStatus()) {
      return 'You have been defeated';
    }
    else if (this.hasEventNeedToBeAddress(events)) {
      return 'You need to address all events';
    }

    return '';
  }
}
