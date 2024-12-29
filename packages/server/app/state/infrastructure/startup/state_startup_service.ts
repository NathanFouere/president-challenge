import { inject } from '@adonisjs/core';
import stateStartupConfig from '#game-config/state/state-startup-config.json' assert { type: 'json' };
import { aState } from '#state/application/builder/state_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IStateRepository from '#state/domain/repository/i_state_repository';

@inject()
export class StateStartupService {
  constructor(
    private readonly stateRepository: IStateRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const state = aState()
      .withGameId(gameId)
      .withName(stateStartupConfig.name)
      .withDescription(stateStartupConfig.description)
      .withFlagIdentifier(stateStartupConfig.licensedFileIdentifier)
      .withEconomicalSituation(stateStartupConfig.economicalSituation)
      .build();

    await this.stateRepository.save(state);
  }
}
