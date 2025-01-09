import { inject } from '@adonisjs/core';

import { aPoliticalPartySeatsSenate } from '#legislature/application/builders/political_party_seats_senate_builder';
import {
  aPoliticalPartySeatsParliament,
} from '#legislature/application/builders/political_party_seats_parliament_builder';
import political_party_seats_config from '#game-config/political-party/political-party-seats-config.json' assert { type: 'json' };

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartySeatsSenateRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSenateByGameQueryHandler from '#legislature/application/query/i_get_senate_by_game_query_handler';
import { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';
import { GetParliamentByGameQuery } from '#legislature/application/query/get_parliament_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';

@inject()
export class PoliticalPartySeatsStartupService {
  constructor(
    private readonly politicalPartyRepository: IPoliticalPartyRepository,
    private readonly politicalPartySeatsParliamentRepository: IPoliticalPartySeatsParliamentRepository,
    private readonly politicalPartySeatsSenateRepository: IPoliticalPartySeatsSenateRepository,
    private readonly getSenateByGameQueryHandler: IGetSenateByGameQueryHandler,
    private readonly getParliamentByGameQueryHandler: IGetParliamentByGameQueryHandler,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const seatsInSenates = [];
    const seatsInParliaments = [];
    const senate = await this.getSenateByGameQueryHandler.handle(new GetSenateByGameQuery(gameId));
    const parliament = await this.getParliamentByGameQueryHandler.handle(new GetParliamentByGameQuery(gameId));

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
