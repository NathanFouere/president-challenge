import { inject } from '@adonisjs/core';
import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
import type { SectorOwnershipType } from '@shared/dist/sector/sector-ownership-type.js';
import { aSectorDefinition } from '#sector/application/builder/sector_definition_builder';
import sectorStartupConfig from '#game-config/sector/sector-startup-config.json' assert { type: 'json' };
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import type SectorDefinition from '#sector/domain/model/sector_definition';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISectorDefinitionRepository from '#sector/domain/repository/i_sector_definition_repository';

@inject()
export class SectorDefinitionStartupService implements StartupProcessorStep {
  constructor(
    private readonly sectorRepository: ISectorDefinitionRepository,
  ) {
  }

  public async execute(): Promise<void> {
    const sectors: SectorDefinition[] = [];

    for (const sectorValues of sectorStartupConfig) {
      const sector: SectorDefinition = aSectorDefinition()
        .withName(sectorValues.name)
        .withType(sectorValues.type as SectorTypes)
        .withEconomicalSituation(sectorValues.economicalSituation)
        .withDescription(sectorValues.description)
        .withOwnershipType(sectorValues.ownershipType as SectorOwnershipType)
        .withLicensedFileIdentifier(sectorValues.licensedFileIdentifier)
        .build();

      sectors.push(sector);
    }

    await this.sectorRepository.createMany(sectors);
  }
}
