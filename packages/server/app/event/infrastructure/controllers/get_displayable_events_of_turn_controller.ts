import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { GetDisplayableEventsOfTurnQuery } from '#event/application/queries/get_displayable_events_of_turn_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventListDtoFactory } from '#event/application/dto-factory/event_list_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetDisplayableEventsOfTurnQueryHandler,
} from '#event/application/queries/i_get_displayable_events_of_turn_query_handler';

@inject()
export default class GetDisplayableEventsOfTurnController {
  constructor(
    private readonly getEventsOfTurnQueryHandler: IGetDisplayableEventsOfTurnQueryHandler,
    private readonly eventListDtoFactory: EventListDtoFactory,
  ) {}

  public async getDisplayableEventsOfTurn({ auth, response, params }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const turn: number = params.turn;
      const events = await this.getEventsOfTurnQueryHandler.handle(new GetDisplayableEventsOfTurnQuery(gameId, turn));

      return this.eventListDtoFactory.createFromEvents(events);
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong : ' + error.message, error });
    }
  }
}
