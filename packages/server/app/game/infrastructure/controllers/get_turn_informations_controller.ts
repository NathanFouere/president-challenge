import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { GetDisplayableEventsOfTurnQuery } from '#event/application/queries/get_displayable_events_of_turn_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetDisplayableEventsOfTurnQueryHandler,
} from '#event/application/queries/i_get_displayable_events_of_turn_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { TurnInformationsDtoFactory } from '#game/application/dto-factory/turn_informations_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetGameOfUserQueryHandler from '#game/application/queries/i_get_game_of_user_query_handler';
import { GetGameOfUserQuery } from '#game/application/queries/get_game_of_user_query';
import type User from '#user/domain/models/user';

@inject()
export default class GetTurnInformationsController {
  constructor(
    private readonly getEventsOfTurnQueryHandler: IGetDisplayableEventsOfTurnQueryHandler,
    private readonly turnInformationsDtoFactory: TurnInformationsDtoFactory,
    private readonly getGameOfUserQueryHandler: IGetGameOfUserQueryHandler,
  ) {}

  public async getTurnInformations({ auth, response, params }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      const gameId: number = params.gameId;
      const turn: number = params.turn;
      const game = await this.getGameOfUserQueryHandler.handle(new GetGameOfUserQuery(
        user,
        gameId,
      ));
      const events = await this.getEventsOfTurnQueryHandler.handle(new GetDisplayableEventsOfTurnQuery(gameId, turn));
      return this.turnInformationsDtoFactory.createFromTurnInformations(events, game.hasReachedMaxTurns());
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong : ' + error.message, error });
    }
  }
}
