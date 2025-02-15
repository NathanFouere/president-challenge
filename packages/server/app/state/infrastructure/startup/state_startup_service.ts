import { inject } from '@adonisjs/core';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateDefinitionRepository from '#state/domain/repository/i_state_definition_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateRepository from '#state/domain/repository/i_state_repository';
import { aState } from '#state/application/builder/state_builder';

@inject()
export default class StateStartupService implements StartupProcessorStep {
  constructor(
    private readonly stateDefinitionRepository: IStateDefinitionRepository,
    private readonly stateRepository: IStateRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    // TODO => à terme, il faudra un état par type de parti
    const stateDefinitions = await this.stateDefinitionRepository.findAll();
    const states = [];
    for (const stateDefinition of stateDefinitions) {
      states.push(aState()
        .withEconomicalSituation(stateDefinition.defaultEconomicalSituation)
        .withGameId(gameId)
        .withDefinitionId(stateDefinition.id)
        .build(),
      );
    }

    await this.stateRepository.createMany(states);
  }
}
