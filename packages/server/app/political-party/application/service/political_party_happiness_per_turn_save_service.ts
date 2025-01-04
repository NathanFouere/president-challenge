import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyHappinessPerTurnRepository
  from '#political-party/domain/repository/i_political_party_happiness_per_turn_repository';
import type PoliticalParty from '#political-party/domain/models/political_party';
import {
  aPoliticalPartyHappinessPerTurn,
} from '#political-party/application/builders/political_party_happiness_per_turn_builder';

@inject()
export class PoliticalPartyHappinessPerTurnSaveService {
  constructor(
    private readonly politicalPartyHappinessPerTurnRepository: IPoliticalPartyHappinessPerTurnRepository,
  ) {
  }

  public async savePoliticalPartiesHappinessForTurn(politicalParties: PoliticalParty[], turn: number): Promise<void> {
    const promises = politicalParties.map(politicalParty => this.savePoliticalPartyHappinessForTurn(politicalParty, turn));
    await Promise.all(promises);
  }

  public async savePoliticalPartyHappinessForTurn(politicalParty: PoliticalParty, turn: number): Promise<void> {
    const socialClassHappinessPerTurn = aPoliticalPartyHappinessPerTurn()
      .withPoliticalPartyId(politicalParty.id)
      .withAmount(politicalParty.happinessLevel)
      .withTurn(turn)
      .build();

    await this.politicalPartyHappinessPerTurnRepository.save(socialClassHappinessPerTurn);
  }
}
