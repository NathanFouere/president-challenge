import { inject } from '@adonisjs/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyHappinessModifierRepository
  from '#political-party/domain/repository/i_political_party_happiness_modifier_repository';
import type PoliticalParty from '#political-party/domain/models/political_party';

@inject()
export default class PoliticalPartySaveForTurnService {
  constructor(
    private readonly politicalPartyRepository: IPoliticalPartyRepository,
    private readonly partyHappinessModifierRepository: IPoliticalPartyHappinessModifierRepository,
  ) {
  }

  public async savePoliticalPartiesForTurn(politicalParties: PoliticalParty[]): Promise<void> {
    const promises = politicalParties.map(politicalParty => this.savePoliticalPartyForTurn(politicalParty));
    await Promise.all(promises);
  }

  private async savePoliticalPartyForTurn(politicalParty: PoliticalParty): Promise<void> {
    await this.politicalPartyRepository.save(politicalParty);
    await this.partyHappinessModifierRepository.saveMany(politicalParty.happinessModifiers);
  }
}
