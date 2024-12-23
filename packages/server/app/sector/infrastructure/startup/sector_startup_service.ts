import { inject } from '@adonisjs/core';
import type { SectorTypes } from '@shared/types/sector/sector-types.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SectorRepository } from '#sector/infrastructure/repository/sector_repository';
import type Sector from '#sector/domain/model/sector';
import { aSector } from '#sector/application/builder/sector_builder';
import sectorStartupConfig from '#game-config/sector/sector-startup-config.json' assert { type: 'json' };

@inject()
export class SectorStartupService {
  constructor(
    private readonly sectorRepository: SectorRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const sectors: Sector[] = [];

    for (const sectorValues of sectorStartupConfig) {
      const sector: Sector = aSector()
        .withName(sectorValues.name)
        .withType(sectorValues.type as SectorTypes)
        .withDescription(sectorValues.description)
        .withGameId(gameId)
        .withLicensedFileIdentifier(sectorValues.licensedFileIdentifier)
        .build();

      sectors.push(sector);
    }

    await this.sectorRepository.createMany(sectors);
  }
}
