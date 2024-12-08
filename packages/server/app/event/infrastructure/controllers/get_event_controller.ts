import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GetEventByIdAndGameQueryHandler from '#event/application/queries/get_event_by_id_and_game_query_handler';
import { GetEventByIdAndGameQuery } from '#event/application/queries/get_event_by_id_and_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventDtoFactory } from '#event/application/dto-factory/event_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { EventReadService } from '#event/application/services/event_read_service';

@inject()
export default class GetEventController {
  constructor(
    private readonly getEventByIdAndGameQueryHandler: GetEventByIdAndGameQueryHandler,
    private readonly eventDtoFactory: EventDtoFactory,
    private readonly eventReadService: EventReadService,
  ) {
  }

  public async getEvent({ auth, response, params }: HttpContext) {
    try {
      auth.getUserOrFail();
      const eventId: number = params.eventId;
      const gameId: number = params.gameId;
      const event = await this.getEventByIdAndGameQueryHandler.handle(new GetEventByIdAndGameQuery(
        eventId,
        gameId,
      ));
      await this.eventReadService.setEventHasBeenBeenRead(event);
      return this.eventDtoFactory.createFromEvent(event);
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong : ' + error.message, error });
    }
  }
}
