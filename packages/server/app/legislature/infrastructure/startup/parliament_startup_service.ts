import { inject } from '@adonisjs/core';
import { aParliament } from '#legislature/application/builders/parliament_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';

@inject()
export class ParliamentStartupService implements StartupProcessorStep {
  constructor(
    private readonly parliamentRepository: IParliamentRepository,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    const parliament = aParliament()
      .withGameId(gameId)
      .build();

    await this.parliamentRepository.save(parliament);
  }
}
