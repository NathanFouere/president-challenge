import { inject } from '@adonisjs/core';

import { aPoliticalPartySeatsSenate } from '#legislature/application/builders/political_party_seats_senate_builder';
import {
  aPoliticalPartySeatsParliament,
} from '#legislature/application/builders/political_party_seats_parliament_builder';

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
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartySeatsSenateDefinitionRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_definition_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartySeatsParliamentDefinitionRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_definition_repository';

@inject()
export class PoliticalPartySeatsStartupService implements StartupProcessorStep {
  constructor(
    private readonly politicalPartySeatsParliamentRepository: IPoliticalPartySeatsParliamentRepository,
    private readonly politicalPartySeatsSenateRepository: IPoliticalPartySeatsSenateRepository,
    private readonly getSenateByGameQueryHandler: IGetSenateByGameQueryHandler,
    private readonly getParliamentByGameQueryHandler: IGetParliamentByGameQueryHandler,
    private readonly getPoliticalPartyPerAffiliationInGameQueryHandler: IGetPoliticalPartyPerAffiliationInGameQueryHandler,
    private readonly politicalPartySeatsSenateDefinitionRepository: IPoliticalPartySeatsSenateDefinitionRepository,
    private readonly politicalPartySeatsParliamentDefinitionRepository: IPoliticalPartySeatsParliamentDefinitionRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const seatsInSenates = [];
    const seatsInParliaments = [];
    const senate = await this.getSenateByGameQueryHandler.handle(new GetSenateByGameQuery(gameId));
    const parliament = await this.getParliamentByGameQueryHandler.handle(new GetParliamentByGameQuery(gameId));
    const politicalPartySeatsSenateDefinitions = await this.politicalPartySeatsSenateDefinitionRepository.findAll();
    const politicalPartySeatsParliamentDefinitions = await this.politicalPartySeatsParliamentDefinitionRepository.findAll();

    for (const politicalPartySeatsSenateDefinition of politicalPartySeatsSenateDefinitions) {
      const politicalParty = await this.getPoliticalPartyPerAffiliationInGameQueryHandler.handle(
        new GetPoliticalPartyPerAffiliationInGameQuery(
          gameId,
          politicalPartySeatsSenateDefinition.politicalPartyAffiliation,
        ),
      );
      seatsInSenates.push(
        aPoliticalPartySeatsSenate()
          .withPoliticalPartyId(politicalParty.id)
          .withSenateId(senate.id)
          .withNumberOfSeats(politicalPartySeatsSenateDefinition.defaultNumberOfSeats)
          .withDefinitionId(politicalPartySeatsSenateDefinition.id)
          .build(),
      );
    }

    for (const politicalPartySeatsParliamentDefinition of politicalPartySeatsParliamentDefinitions) {
      const politicalParty = await this.getPoliticalPartyPerAffiliationInGameQueryHandler.handle(
        new GetPoliticalPartyPerAffiliationInGameQuery(
          gameId,
          politicalPartySeatsParliamentDefinition.politicalPartyAffiliation,
        ),
      );
      seatsInParliaments.push(
        aPoliticalPartySeatsParliament()
          .withPoliticalPartyId(politicalParty.id)
          .withParliamentId(parliament.id)
          .withNumberOfSeats(politicalPartySeatsParliamentDefinition.defaultNumberOfSeats)
          .withDefinitionId(politicalPartySeatsParliamentDefinition.id)
          .build(),
      );
    }

    await this.politicalPartySeatsSenateRepository.createMany(seatsInSenates);
    await this.politicalPartySeatsParliamentRepository.createMany(seatsInParliaments);
  }
}
