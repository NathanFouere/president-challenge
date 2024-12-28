import { inject } from '@adonisjs/core';

import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetSectorByGameAndIdQueryHandler } from '#sector/application/query/get_sector_by_game_and_id_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SectorDtoFactory } from '#sector/application/dto-factory/sector_dto_factory';
import { GetSectorByGameAndIdQuery } from '#sector/application/query/get_sector_by_game_and_id_query';

@inject()
export default class GetSectorOfGameController {
  constructor(
    private readonly getSectorByGameAndIdQueryHandler: GetSectorByGameAndIdQueryHandler,
    private readonly sectorDtoFactory: SectorDtoFactory,
  ) {
  }

  public async getSectorOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const sectorId = request.param('sectorId');
      const sector = await this.getSectorByGameAndIdQueryHandler.handleForDisplay(
        new GetSectorByGameAndIdQuery(gameId, sectorId),
      );

      const sectorDto = this.sectorDtoFactory.createFromSector(sector);
      return sectorDto;
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
