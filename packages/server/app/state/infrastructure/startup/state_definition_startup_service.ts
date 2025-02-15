import { inject } from '@adonisjs/core';
import stateStartupConfig from '#game-config/state/state-startup-config.json' assert { type: 'json' };
import { aStateDefinition } from '#state/application/builder/state_definition_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateDefinitionRepository from '#state/domain/repository/i_state_definition_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

@inject()
export class StateDefinitionStartupService implements StartupProcessorStep {
  constructor(
    private readonly stateDefinitionRepository: IStateDefinitionRepository,
  ) {
  }

  public async execute(): Promise<void> {
    const state = aStateDefinition()
      .withName(stateStartupConfig.name)
      .withDescription(stateStartupConfig.description)
      .withFlagIdentifier(stateStartupConfig.licensedFileIdentifier)
      .withEconomicalSituation(stateStartupConfig.economicalSituation)
      .build();

    await this.stateDefinitionRepository.save(state);
  }
}
