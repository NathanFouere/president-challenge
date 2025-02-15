import { inject } from '@adonisjs/core';
import type PoliticalParty from '#political-party/domain/models/political_party';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyDefinitionRepository
  from '#political-party/domain/repository/i_political_party_definition_repository';
import { aPoliticalParty } from '#political-party/application/builders/political_party_builder';

@inject()
export class PoliticalPartyStartupService implements StartupProcessorStep {
  constructor(
    private readonly politicalPartyRepository: IPoliticalPartyRepository,
    private readonly politicalPartyDefinitionRepository: IPoliticalPartyDefinitionRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const politicalPartyDefinitions = await this.politicalPartyDefinitionRepository.findAll();
    const politicalParties: PoliticalParty[] = [];

    for (const politicalPartyDefinition of politicalPartyDefinitions) {
      const politicalParty: PoliticalParty = aPoliticalParty()
        .withGameId(gameId)
        .withDefinitionId(politicalPartyDefinition.id)
        .build();

      politicalParties.push(politicalParty);
    }

    await this.politicalPartyRepository.createMany(politicalParties);
  }
}
