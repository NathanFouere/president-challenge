import { inject } from '@adonisjs/core';
import { aParliament } from '#legislature/application/builders/parliament_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetParliamentDefinitionQueryHandler
  from '#legislature/application/query/i_get_parliament_definition_query_handler';
import GetParliamentDefinitionQuery from '#legislature/application/query/get_parliament_definition_query';

@inject()
export class ParliamentStartupService implements StartupProcessorStep {
  constructor(
    private readonly parliamentRepository: IParliamentRepository,
    private readonly getParliamentDefinitionQueryHandler: IGetParliamentDefinitionQueryHandler,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const parliamentDefinition = await this.getParliamentDefinitionQueryHandler.handle(new GetParliamentDefinitionQuery());
    const parliament = aParliament()
      .withGameId(gameId)
      .withDefinitionId(parliamentDefinition.id)
      .build();

    await this.parliamentRepository.save(parliament);
  }
}
