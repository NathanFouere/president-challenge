import { inject } from '@adonisjs/core';
import type PoliticalParty from '#political-party/domain/models/political_party';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import { aPoliticalParty } from '#political-party/application/builders/political_party_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetPoliticalPartyDefinitionsOfGameDefinitionQueryHandler
  from '#political-party/application/queries/i_get_political_party_definitions_of_game_definition_query_handler';
import GetPoliticalPartyDefinitionsOfGameDefinitionQuery
  from '#political-party/application/queries/get_political_party_definitions_of_game_definition_query';

@inject()
export class PoliticalPartyStartupService implements StartupProcessorStep {
  constructor(
    private readonly politicalPartyRepository: IPoliticalPartyRepository,
    private readonly politicalPartyDefinitionsOfGameDefinitionQueryHandler: IGetPoliticalPartyDefinitionsOfGameDefinitionQueryHandler,
  ) {
  }

  public async execute(gameId: number, gameDefinitionIdentifier: string): Promise<void> {
    const politicalPartyDefinitions = await this.politicalPartyDefinitionsOfGameDefinitionQueryHandler.handle(
      new GetPoliticalPartyDefinitionsOfGameDefinitionQuery(gameDefinitionIdentifier),
    );
    const politicalParties: PoliticalParty[] = [];

    for (const politicalPartyDefinition of politicalPartyDefinitions) {
      const politicalParty: PoliticalParty = aPoliticalParty()
        .withGameId(gameId)
        .withDefinitionId(politicalPartyDefinition.id)
        .withInPower(politicalPartyDefinition.inPowerByDefault)
        .build();

      politicalParties.push(politicalParty);
    }

    await this.politicalPartyRepository.createMany(politicalParties);
  }
}
