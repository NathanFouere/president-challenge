import { inject } from '@adonisjs/core';
import { aSenate } from '#legislature/application/builders/senate_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISenateRepository from '#legislature/domain/repository/i_senate_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSenateDefinitionByGameDefinitionQueryHandler from '#legislature/application/query/i_get_senate_definition_by_game_definition_query_handler';
import GetSenateDefinitionQuery from '#legislature/application/query/get_senate_definition_query';

@inject()
export class SenateStartupService implements StartupProcessorStep {
  constructor(
    private readonly senateRepository: ISenateRepository,
    private readonly getSenateDefinitionQueryHandler: IGetSenateDefinitionByGameDefinitionQueryHandler,
  ) {
  }

  public async execute(gameId: number, gameDefinitionIdentifier: string): Promise<void> {
    const senateDefinition = await this.getSenateDefinitionQueryHandler.handle(new GetSenateDefinitionQuery(gameDefinitionIdentifier));

    const senate = aSenate()
      .withGameId(gameId)
      .withDefinitionId(senateDefinition.id)
      .build();

    await this.senateRepository.save(senate);
  }
}
