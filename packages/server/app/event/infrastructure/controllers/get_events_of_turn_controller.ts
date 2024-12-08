import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetEventsOfTurnQueryHandler } from '#event/application/queries/get_events_of_turn_query_handler';
import { GetEventsOfTurnQuery } from '#event/application/queries/get_events_of_turn_query';
import type User from '#user/domain/models/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalEventDtoFactory } from '#event/application/dto-factory/minimal_event_dto_factory';

@inject()
export default class GetEventsOfTurnController {
  constructor(
    private readonly getEventsOfTurnQueryHandler: GetEventsOfTurnQueryHandler,
    private readonly minimalEventDtoFactory: MinimalEventDtoFactory,
  ) {}

  public async getEventsOfTurn({ auth, response, params }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const turn: number = params.turn;
      const events = await this.getEventsOfTurnQueryHandler.handle(new GetEventsOfTurnQuery(gameId, turn));

      return this.minimalEventDtoFactory.createFromEvents(events);
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong : ' + error.message, error });
    }
  }
}
