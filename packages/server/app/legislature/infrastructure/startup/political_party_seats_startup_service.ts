import { inject } from '@adonisjs/core';
import type PoliticalParty from '#political-party/domain/models/political_party';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  PoliticalPartySeatsSenateRepository,
} from '#legislature/infrastructure/repositories/politcal_party_seats_senate_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  PoliticalPartySeatsParliamentRepository,
} from '#legislature/infrastructure/repositories/politcal_party_seats_parliament_repository';
import { aPoliticalPartySeatsSenate } from '#legislature/application/builders/political_party_seats_senate_builder';
import {
  aPoliticalPartySeatsParliament,
} from '#legislature/application/builders/political_party_seats_parliament_builder';

@inject()
export class PoliticalPartySeatsStartupService {
  constructor(
    private readonly politicalPartySeatsParliamentRepository: PoliticalPartySeatsParliamentRepository,
    private readonly politicalPartySeatsSenateRepository: PoliticalPartySeatsSenateRepository,
  ) {
  }

  public async initialize(politicalParties: PoliticalParty[], senateId: number, parliamentId: number): Promise<void> {
    const seatsInSenates = [];
    const seatsInParliaments = [];

    for (const politicalParty of politicalParties) {
      seatsInSenates.push(
        aPoliticalPartySeatsSenate()
          .withPoliticalPartyId(politicalParty.id)
          .withSenateId(senateId)
          .withNumberOfSeats(0)
          .build(),
      );

      seatsInParliaments.push(
        aPoliticalPartySeatsParliament()
          .withPoliticalPartyId(politicalParty.id)
          .withParliamentId(parliamentId)
          .withNumberOfSeats(0)
          .build(),
      );
    }

    await this.politicalPartySeatsSenateRepository.createMany(seatsInSenates);
    await this.politicalPartySeatsParliamentRepository.createMany(seatsInParliaments);
  }
}
