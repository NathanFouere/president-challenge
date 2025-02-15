import { inject } from '@adonisjs/core';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import politicalPartyStartupConfig from '#game-config/political-party/political-party-startup-config.json' assert { type: 'json' };
import { aPoliticalPartyDefinition } from '#political-party/application/builders/political_party_definition_builder';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyDefinitionRepository
  from '#political-party/domain/repository/i_political_party_definition_repository';

@inject()
export class PoliticalPartyDefinitionStartupService implements StartupProcessorStep {
  constructor(
    private readonly politicalPartyRepository: IPoliticalPartyDefinitionRepository,
  ) {
  }

  public async execute(): Promise<void> {
    const politicalParties = [];

    for (const politicalPartyValues of politicalPartyStartupConfig) {
      const politicalParty = aPoliticalPartyDefinition()
        .withAffiliation(politicalPartyValues.affiliation as PoliticalAffiliation)
        .withColor(politicalPartyValues.color)
        .withDescription(politicalPartyValues.description)
        .withName(politicalPartyValues.name)
        .withLicensedFileIdentifier(politicalPartyValues.licensedFileIdentifier)
        .build();

      politicalParties.push(politicalParty);
    }

    await this.politicalPartyRepository.createMany(politicalParties);
  }
}
