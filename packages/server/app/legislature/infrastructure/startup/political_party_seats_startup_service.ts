import { inject } from '@adonisjs/core';
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
import political_party_seats_config from '#game-config/political-party/political-party-seats-config.json' assert { type: 'json' };
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PoliticalPartyRepository } from '#political-party/infrastructure/repositories/political_party_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SenateRepository } from '#legislature/infrastructure/repositories/senate_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentRepository } from '#legislature/infrastructure/repositories/parliament_repository';

@inject()
export class PoliticalPartySeatsStartupService {
  constructor(
    private readonly politicalPartyRepository: PoliticalPartyRepository,
    private readonly politicalPartySeatsParliamentRepository: PoliticalPartySeatsParliamentRepository,
    private readonly politicalPartySeatsSenateRepository: PoliticalPartySeatsSenateRepository,
    private readonly senateRepository: SenateRepository,
    private readonly parliamentRepository: ParliamentRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const seatsInSenates = [];
    const seatsInParliaments = [];
    const senate = await this.senateRepository.getByGameId(gameId);
    const parliament = await this.parliamentRepository.getByGameId(gameId);

    for (const politicalPartySeatsConfig of political_party_seats_config) {
      const politicalParty = await this.politicalPartyRepository.getByAffiliationAndGameId(politicalPartySeatsConfig.affiliation, gameId);
      seatsInSenates.push(
        aPoliticalPartySeatsSenate()
          .withPoliticalPartyId(politicalParty.id)
          .withSenateId(senate.id)
          .withNumberOfSeats(politicalPartySeatsConfig.seatsInSenate)
          .build(),
      );

      seatsInParliaments.push(
        aPoliticalPartySeatsParliament()
          .withPoliticalPartyId(politicalParty.id)
          .withParliamentId(parliament.id)
          .withNumberOfSeats(politicalPartySeatsConfig.seatsInParliament)
          .build(),
      );
    }

    await this.politicalPartySeatsSenateRepository.createMany(seatsInSenates);
    await this.politicalPartySeatsParliamentRepository.createMany(seatsInParliaments);
  }
}
