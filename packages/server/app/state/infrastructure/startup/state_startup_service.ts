import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { StateRepository } from '#state/infrastructure/repository/state_repository';
import stateStartupConfig from '#game-config/state/state-startup-config.json' assert { type: 'json' };
import { aState } from '#state/application/builder/state_builder';

@inject()
export class StateStartupService {
  constructor(
    private readonly stateRepository: StateRepository,
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
