import { inject } from '@adonisjs/core';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import type Sector from '#sector/domain/model/sector';
import { aSector } from '#sector/application/builder/sector_builder';
import sectorStartupConfig from '#game-config/sector/sector-startup-config.json' assert { type: 'json' };
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISectorRepository from '#sector/domain/repository/i_sector_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

@inject()
export class SectorStartupService implements StartupProcessorStep {
  constructor(
    private readonly sectorRepository: ISectorRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const sectors: Sector[] = [];

    for (const sectorValues of sectorStartupConfig) {
      const sector: Sector = aSector()
        .withName(sectorValues.name)
        .withType(sectorValues.type as SectorTypes)
        .withEconomicalSituation(sectorValues.economicalSituation)
        .withDescription(sectorValues.description)
        .withGameId(gameId)
        .withOwnershipType(sectorValues.ownershipType as SectorOwnershipType)
        .withLicensedFileIdentifier(sectorValues.licensedFileIdentifier)
        .build();

      sectors.push(sector);
    }

    await this.sectorRepository.createMany(sectors);
  }
}
