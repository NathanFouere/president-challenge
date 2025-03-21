import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSectorByGameAndTypeQueryHandler from '#sector/application/query/i_get_sector_by_game_and_type_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISectorRepository from '#sector/domain/repository/i_sector_repository';
import { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';
import type Law from '#law/domain/model/law';

@inject()
export default class ApplySectorPropertyLawEffectService {
  constructor(
    private readonly sectorRepository: ISectorRepository,
    private readonly getSectorByGameAndTypeQueryHandler: IGetSectorByGameAndTypeQueryHandler,
  ) {
  }

  public async apply(law: Law): Promise<void> {
    const sector = await this.getSectorByGameAndTypeQueryHandler.handle(
      new GetSectorByGameAndTypeQuery(law.gameId, law.definition.sectorTypeToChange!),
    );

    sector.ownershipType = law.definition.sectorOwnershipTypeToChange!;

    await this.sectorRepository.save(sector);
  }
}
