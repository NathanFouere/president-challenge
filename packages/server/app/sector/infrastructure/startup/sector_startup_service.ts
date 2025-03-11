import { inject } from '@adonisjs/core';
import type { SectorOwnershipType } from '@president-challenge/shared/dist/sector/sector-ownership-type.js';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISectorRepository from '#sector/domain/repository/i_sector_repository';
import type Sector from '#sector/domain/model/sector';
import { aSector } from '#sector/application/builder/sector_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISectorDefinitionRepository from '#sector/domain/repository/i_sector_definition_repository';

@inject()
export class SectorStartupService implements StartupProcessorStep {
  constructor(
    private readonly sectorRepository: ISectorRepository,
    private readonly sectorDefinitionRepository: ISectorDefinitionRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const sectorDefinitions = await this.sectorDefinitionRepository.findAll();
    const sectors: Sector[] = [];

    for (const sectorDefinition of sectorDefinitions) {
      const sector = aSector()
        .withGameId(gameId)
        .withEconomicalSituation(sectorDefinition.defaultEconomicalSituation)
        .withOwnershipType(sectorDefinition.defaultOwnershipType as SectorOwnershipType)
        .withDefinitionId(sectorDefinition.id)
        .build();

      sectors.push(sector);
    }

    await this.sectorRepository.createMany(sectors);
  }
}
