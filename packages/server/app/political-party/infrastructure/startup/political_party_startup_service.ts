import { inject } from '@adonisjs/core';
import type { PoliticalAffiliation } from '@shared/dist/political-party/political-affiliation.js';
import type { HappinessLevels } from '@shared/dist/common/happiness-levels.js';
import politicalPartyStartupConfig from '#game-config/political-party/political-party-startup-config.json' assert { type: 'json' };
import type PoliticalParty from '#political-party/domain/models/political_party';
import { aPoliticalParty } from '#political-party/application/builders/political_party_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';

@inject()
export class PoliticalPartyStartupService {
  constructor(
    private readonly politicalPartyRepository: IPoliticalPartyRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const politicalParties: PoliticalParty[] = [];

    for (const politicalPartyValues of politicalPartyStartupConfig) {
      const politicalParty: PoliticalParty = aPoliticalParty()
        .withAffiliation(politicalPartyValues.affiliation as PoliticalAffiliation)
        .withColor(politicalPartyValues.color)
        .withDescription(politicalPartyValues.description)
        .withName(politicalPartyValues.name)
        .withGameId(gameId)
        .withLicensedFileIdentifier(politicalPartyValues.licensedFileIdentifier)
        .withHappinessLevel(politicalPartyValues.happinessLevel as HappinessLevels)
        .build();

      politicalParties.push(politicalParty);
    }

    await this.politicalPartyRepository.createMany(politicalParties);
  }
}
