import { inject } from '@adonisjs/core';
import type { PoliticalAffiliation } from '@shared/types/dist/types/political-party/political-affiliation.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyRepository } from '#political-party/infrastructure/repositories/political_party_repository';
import politicalPartyStartupConfig from '#game-config/political-party/political-party-startup-config.json' assert { type: 'json' };
import type PoliticalParty from '#political-party/domain/models/political_party';
import { aPoliticalParty } from '#political-party/application/builders/political_party_builder';

@inject()
export class PoliticalPartyStartupService {
  constructor(
    private readonly politicalPartyRepository: PoliticalPartyRepository,
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
        .build();

      politicalParties.push(politicalParty);
    }

    await this.politicalPartyRepository.createMany(politicalParties);
  }
}
