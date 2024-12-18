import { inject } from '@adonisjs/core';

import { GetSectorsByGameQueryHandler } from '#sector/application/query/get_sectors_by_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalSectorDtoFactory } from '#sector/application/dto-factory/minimal_sector_dto_factory';

@inject()
export class GetSectorsOfGameController {
  constructor(
    private readonly getSectorsByGameQueryHandler: GetSectorsByGameQueryHandler,
    private readonly minimalSectorDtoFactory: MinimalSectorDtoFactory,
  ) {
  }

  public async getSectorsOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const sectors = await this.getSectorsByGameQueryHandler.handle(new GetSectorsByGameQueryHandler(
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
