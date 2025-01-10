import { inject } from '@adonisjs/core';
import { aSenate } from '#legislature/application/builders/senate_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ISenateRepository from '#legislature/domain/repository/i_senate_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

@inject()
export class SenateStartupService implements StartupProcessorStep {
  constructor(
    private readonly senateRepository: ISenateRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const senate = aSenate()
      .withGameId(gameId)
      .build();

    await this.senateRepository.save(senate);
  }
}
