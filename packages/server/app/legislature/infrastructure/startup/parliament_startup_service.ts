import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ParliamentRepository } from '#legislature/infrastructure/repositories/parliament_repository';
import type { StartupInterface } from '#common/interfaces/startup_interface';
import { aParliament } from '#legislature/application/builders/parliament_builder';

@inject()
export class ParliamentStartupService implements StartupInterface {
  constructor(
    private readonly parliamentRepository: ParliamentRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const parliament = aParliament()
      .withGameId(gameId)
      .build();

    await this.parliamentRepository.save(parliament);
  }
}
