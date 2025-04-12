import * as console from 'node:console';
import { inject } from '@adonisjs/core';

import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GameDefinitionDtoFactory from '#game/application/dto-factory/game_definition_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetGameDefinitionsQueryHandler from '#game/application/queries/i_get_game_definitions_query_handler';
import GetGameDefinitionsQuery from '#game/application/queries/get_game_definitions_query';

@inject()
export default class GetGameDefinitionsController {
  constructor(
    private readonly gameDefinitionDtoFactory: GameDefinitionDtoFactory,
    private readonly getGameDefinitionsQueryHandler: IGetGameDefinitionsQueryHandler,
  ) {
  }

  public async getGameDefinitions({ auth, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameDefinitions = await this.getGameDefinitionsQueryHandler.handleForDisplay(new GetGameDefinitionsQuery());

      const gameDefinitionsDto = await this.gameDefinitionDtoFactory.createFromGameDefinitions(gameDefinitions);
      return gameDefinitionsDto;
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({
        message: 'Something went wrong',
        error,
      });
    }
  }
}
