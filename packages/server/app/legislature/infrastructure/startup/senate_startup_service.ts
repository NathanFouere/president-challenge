import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SenateRepository } from '#legislature/infrastructure/repositories/senate_repository';
import { aSenate } from '#legislature/application/builders/senate_builder';

@inject()
export class SenateStartupService {
  constructor(
    private readonly senateRepository: SenateRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const senate = aSenate()
      .withGameId(gameId)
      .build();

    await this.senateRepository.save(senate);
  }
}
