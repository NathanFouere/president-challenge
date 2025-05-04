import { inject } from '@adonisjs/core';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateRepository from '#state/domain/repository/i_state_repository';
import { aState } from '#state/application/builder/state_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetStateDefinitionByGameDefinitionQueryHandler
  from '#state/application/query/i_get_state_definition_by_game_definition_query_handler';
import GetStateDefinitionByGameDefinitionQuery
  from '#state/application/query/get_state_definition_by_game_definition_query';

@inject()
export default class StateStartupService implements StartupProcessorStep {
  constructor(
    private readonly getStateDefinitionOfGameDefinitionQueryHandler: IGetStateDefinitionByGameDefinitionQueryHandler,
    private readonly stateRepository: IStateRepository,
  ) {
  }

  public async execute(gameId: number, gameDefinitionIdentifier: string): Promise<void> {
    const stateDefinition = await this.getStateDefinitionOfGameDefinitionQueryHandler.handle(
      new GetStateDefinitionByGameDefinitionQuery(gameDefinitionIdentifier),
    );

    // TODO => mettre dans factory
    const state = aState()
      .withEconomicalSituation(stateDefinition.defaultEconomicalSituation)
      .withGameId(gameId)
      .withDefinitionId(stateDefinition.id)
      .build();

    await this.stateRepository.save(state);
  }
}
