import { inject } from '@adonisjs/core';

import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalSectorDtoFactory } from '#sector/application/dto-factory/minimal_sector_dto_factory';
import { GetSectorsByGameQuery } from '#sector/application/query/get_sectors_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorsByGameQueryHandler from '#sector/application/query/i_get_sectors_by_game_query_handler';

@inject()
export default class GetSectorsOfGameController {
  constructor(
    private readonly getSectorsByGameQueryHandler: IGetSectorsByGameQueryHandler,
    private readonly minimalSectorDtoFactory: MinimalSectorDtoFactory,
  ) {
  }

  public async getSectorsOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const sectors = await this.getSectorsByGameQueryHandler.handleForDisplay(new GetSectorsByGameQuery(
        gameId,
      ));

      const sectorsDto = this.minimalSectorDtoFactory.createFromSectors(sectors);
      return sectorsDto;
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
